import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Rating,
  Stack,
  Divider,
  Alert,
  Paper,
} from "@mui/material";
import Button from "../../../components/Button";
import {
  fetchReviewsByBook,
  createReview,
} from "../../../misc/requests/reviews";

const ReviewsBlock = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadReviews = async () => {
    try {
      const data = await fetchReviewsByBook(bookId);
      setReviews(data || []);
    } catch {
      setError("Не вдалося завантажити відгуки");
    }
  };

  useEffect(() => {
    if (bookId) loadReviews();
  }, [bookId]);

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    if (!text.trim()) {
      setError("Текст відгуку обовʼязковий");
      return;
    }

    if (!rating) {
      setError("Оберіть рейтинг (1–5)");
      return;
    }

    try {
      setLoading(true);

      await createReview({
        bookId,
        text: text.trim(),
        rating,
      });

      setText("");
      setRating(null);
      await loadReviews();
      setSuccess("Відгук успішно додано");
    } catch {
      setError("Помилка при створенні відгуку");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper sx={{ mt: 4, p: 3 }}>
      <Typography variant="h6" fontWeight={600} mb={2}>
        Відгуки
      </Typography>

      {/* form */}
      <Stack spacing={2} mb={3}>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}

        <TextField
          label="Ваш відгук"
          multiline
          minRows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
        />

        <Stack direction="row" alignItems="center" spacing={2}>
          <Rating
            value={rating}
            onChange={(_, v) => setRating(v)}
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
          >
            Додати
          </Button>
        </Stack>
      </Stack>

      <Divider sx={{ mb: 2 }} />

      {/* list */}
      <Stack spacing={2}>
        {reviews.length ? (
          reviews.map((r) => (
            <Box
              key={r.id}
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: "grey.50",
                border: "1px solid",
                borderColor: "divider",
              }}
            >
              <Rating value={r.rating} readOnly size="small" />

              <Typography mt={1}>
                {r.text}
              </Typography>

              <Typography
                variant="caption"
                color="text.secondary"
              >
                {new Date(r.createdAt).toLocaleString()}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography color="text.secondary">
            Поки що немає відгуків
          </Typography>
        )}
      </Stack>
    </Paper>
  );
};

export default ReviewsBlock;
