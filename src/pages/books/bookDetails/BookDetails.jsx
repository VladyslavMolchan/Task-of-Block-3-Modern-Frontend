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

  const validateField = (field, value) => {
    switch (field) {
      case "title":
        if (!value?.trim()) return "Назва обов'язкова";
        if (value.length > 50) return "Максимум 50 символів";
        return "";
      case "authorId":
        if (value === "") return "ID автора обов'язковий";
        if (isNaN(value) || Number(value) <= 0) return "ID має бути додатним числом";
        return "";
      case "yearPublished":
        if (value === "") return "Рік обов'язковий";
        if (isNaN(value) || Number(value) <= 0) return "Рік має бути додатним числом";
        return "";
      default:
        return "";
    }
  };

  const validate = () => {
    const newErrors = {};
    let valid = true;
    Object.keys(editBook).forEach((field) => {
      const error = validateField(field, editBook[field]);
      if (error) {
        newErrors[field] = error;
        valid = false;
      }
    });
    setErrors(newErrors);
    return valid;
  };

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "title" && value.length <= 50) {
      setEditBook((p) => ({ ...p, [name]: value }));
      return;
    }

    if (name === "authorId" || name === "yearPublished") {
      if (value === "" || Number(value) >= 0) setEditBook((p) => ({ ...p, [name]: value }));
    }
  };

  const navigateBack = () => {
    const params = searchParams.toString();
    navigate(`/books${params ? `?${params}` : ""}`);
  };

  const handleSave = async () => {
    if (!validate()) return;
    try {
      setLoading(true);
      if (isNew) {
        await createBook(editBook);
        setNotification({ open: true, message: "Книга успішно створена", type: "success" });
        navigateBack();
      } else {
        await updateBook(id, editBook);
        setBook(editBook);
        setMode("view");
        setNotification({ open: true, message: "Книга успішно оновлена", type: "success" });
      }
    } catch (err) {
      setNotification({ open: true, message: err.message || "Помилка при збереженні", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEditBook(book);
    setErrors({});
    if (isNew) navigateBack();
    else setMode("view");
  };

  return (
    <Paper sx={{ maxWidth: 600, mx: "auto", mt: 4, mb: 4, p: 3, position: "relative" }}>
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
          {isNew ? "Нова книга" : mode === "view" ? "Перегляд книги" : "Редагування книги"}
        </Typography>

        {!isNew && mode === "view" && (
          <IconButton onClick={() => setMode("edit")}>
            <EditIcon />
          </IconButton>
        )}
      </CardTitle>

      <CardContent sx={{ mb: 2 }}>
        <BookForm
          book={editBook}
          errors={errors}
          mode={mode}
          onChange={handleChange}
        />
      </CardContent>

      <CardActions sx={{ gap: 1.5, mb: 2 }}>
        {mode === "edit" ? (
          <>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              isLoading={loading}
            >
              {isNew ? "Створити" : "Зберегти"}
            </Button>
            <Button
              colorVariant="error"
              startIcon={<CancelIcon />}
              onClick={handleCancel}
            >
              Скасувати
            </Button>
          </>
        ) : (
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={navigateBack}
          >
            Назад
          </Button>
        )}
      </CardActions>

      <Notification
        open={notification.open}
        message={notification.message}
        type={notification.type}
        onClose={() => setNotification((prev) => ({ ...prev, open: false }))}
      />
    </Paper>
  );
};

export default BookDetails;
