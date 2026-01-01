import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Paper, Box, Typography, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import CircularProgress from "../../../components/CircularProgress";
import Notification from "../../../components/Notification";

import { fetchBookById, updateBook, createBook } from "../../../misc/requests/books";
import Button from "../../../components/Button";
import CardTitle from "../../../components/CardTitle";
import CardContent from "../../../components/CardContent";
import CardActions from "../../../components/CardActions";

import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import BookForm from "../components/BookFormDetails";
import ReviewsBlock from "../components/ReviewsBlock"; 

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const isNew = id === "new";
  const emptyBook = { title: "", authorId: "", yearPublished: "" };

  const [book, setBook] = useState(emptyBook);
  const [editBook, setEditBook] = useState(emptyBook);
  const [mode, setMode] = useState(isNew ? "edit" : "view");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState({ open: false, message: "", type: "success" });

  const loadBook = useCallback(async () => {
    if (isNew) return;
    try {
      setLoading(true);
      const data = await fetchBookById(id);
      const mappedBook = {
        title: data.title ?? "",
        authorId: data.author?.id ?? "",
        yearPublished: data.yearPublished ?? "",
      };
      setBook(mappedBook);
      setEditBook(mappedBook);
    } catch {
      setNotification({ open: true, message: "Помилка при завантаженні книги", type: "error" });
    } finally {
      setLoading(false);
    }
  }, [id, isNew]);

  useEffect(() => {
    loadBook();
  }, [loadBook]);

  const navigateBack = () => {
    const params = searchParams.toString();
    navigate(`/books${params ? `?${params}` : ""}`);
  };

  return (
    <Paper sx={{ maxWidth: 700, mx: "auto", mt: 4, mb: 4, p: 3, position: "relative" }}>
      {loading && (
        <Box
          position="absolute"
          inset={0}
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgcolor="rgba(255,255,255,0.6)"
          zIndex={10}
        >
          <CircularProgress />
        </Box>
      )}

      <CardTitle sx={{ mb: 2 }}>
        <Typography variant="h5" fontWeight={600}>
          {isNew ? "Нова книга" : "Перегляд книги"}
        </Typography>

        {!isNew && (
          <IconButton onClick={() => setMode("edit")}>
            <EditIcon />
          </IconButton>
        )}
      </CardTitle>

      <CardContent>
        <BookForm book={editBook} errors={errors} mode="view" />
      </CardContent>

      <CardActions>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={navigateBack}
        >
          Назад
        </Button>
      </CardActions>

      {!isNew && <ReviewsBlock bookId={Number(id)} />}

      <Notification
        open={notification.open}
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification((p) => ({ ...p, open: false }))}
      />
    </Paper>
  );
};

export default BookDetails;
