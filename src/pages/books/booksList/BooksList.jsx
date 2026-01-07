import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Paper, Typography, Stack, Collapse } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FilterListIcon from "@mui/icons-material/FilterList";
import { fetchBooks, searchBooks, deleteBook } from "../../../misc/requests/books";
import Pagination from "../../../components/Pagination";
import Button from "../../../components/Button";
import Notification from "../../../components/Notification";
import DeleteDialog from "../components/DeleteDialog";
import useChangePage from "../../../misc/hooks/useChangePage";
import Filters from "../components/FiltersList";
import BooksTable from "../components/BooksTableList";

const BooksList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const changePage = useChangePage();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(!!(
    searchParams.get("title") || searchParams.get("authorId") || searchParams.get("yearPublished")
  ));
  const [notification, setNotification] = useState({ open: false, message: "", type: "info" });
  const [deleteDialog, setDeleteDialog] = useState({ open: false, bookId: null, error: "" });

  const page = Number(searchParams.get("page")) || 1;
  const size = 10;

  const filters = useMemo(() => ({
    title: searchParams.get("title") || "",
    authorId: searchParams.get("authorId") || "",
    yearPublished: searchParams.get("yearPublished") || "",
  }), [searchParams]);

  const [totalPages, setTotalPages] = useState(1);

  const loadBooks = useCallback(async () => {
    setLoading(true);
    try {
      const data = filters.title || filters.authorId || filters.yearPublished
        ? await searchBooks({
            title: filters.title.trim() || undefined,
            authorId: !isNaN(filters.authorId) ? Number(filters.authorId) : undefined,
            yearPublished: !isNaN(filters.yearPublished) ? Number(filters.yearPublished) : undefined,
          }, page, size)
        : await fetchBooks(page, size);

      const list = data.list || data.content || [];
      setBooks(list.map(b => ({
        id: b.id,
        title: b.title ?? "—",
        authorName: b.author?.name ?? "—",
        authorId: b.author?.id ?? null,
        yearPublished: b.yearPublished ?? "—",
      })));
      setTotalPages(data.totalPages || 1);
    } catch {
      setNotification({ open: true, type: "error", message: "Помилка при завантаженні книг" });
    } finally {
      setLoading(false);
    }
  }, [filters, page]);

  useEffect(() => {
    loadBooks();
  }, [loadBooks]);

  const handleDelete = async (id) => {
    try {
      await deleteBook(id);
      setNotification({ open: true, type: "success", message: "Книга успішно видалена" });
      changePage({ locationSearch: { ...filters, page: page > 1 && books.length === 1 ? page - 1 : page } });
    } catch {
      setNotification({ open: true, type: "error", message: "Не вдалося видалити книгу" });
    } finally {
      setDeleteDialog({ open: false, bookId: null, error: "" });
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    changePage({ locationSearch: { ...filters, [name]: value, page: 1 } });
  };

  const handleClear = () => {
    changePage({ locationSearch: { title: "", authorId: "", yearPublished: "", page: 1 } });
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>Список книг</Typography>
      <Stack direction="row" justifyContent="space-between" spacing={2} mb={2}>
        <Button
          variant={showFilters ? "contained" : "outlined"}
          startIcon={<FilterListIcon />}
          onClick={() => setShowFilters(!showFilters)}
        >
          Фільтр
        </Button>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate(`/books/new?${searchParams.toString()}`)}
        >
          Додати книгу
        </Button>
      </Stack>

      <Collapse in={showFilters} sx={{ mb: 2 }}>
        <Filters filters={filters} onChange={handleFilterChange} onClear={handleClear} />
      </Collapse>

      <BooksTable books={books} loading={loading} onDeleteClick={(id) => setDeleteDialog({ open: true, bookId: id })} onRowClick={(id) => navigate(`/books/${id}?${searchParams.toString()}`)} sx={{ mb: 2 }} />

      <Pagination
        page={page}
        totalPages={totalPages}
        onChange={(p) => changePage({ locationSearch: { ...filters, page: p } })}
        sx={{ mb: 2 }}
      />

      <Notification open={notification.open} message={notification.message} type={notification.type} onClose={() => setNotification((prev) => ({ ...prev, open: false }))} />
      <DeleteDialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, bookId: null })} onConfirm={() => handleDelete(deleteDialog.bookId)} error={deleteDialog.error} />
    </Paper>
  );
};

export default BooksList;
