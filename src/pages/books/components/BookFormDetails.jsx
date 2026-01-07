import React from "react";
import { Stack, TextField } from "@mui/material";

const BookForm = ({ book, errors, mode, onChange }) => (
  <Stack spacing={2} sx={{ marginTop: 2, marginBottom: 2 }}>
    <TextField
      label="Назва"
      name="title"
      value={book.title}
      onChange={onChange}
      InputProps={{ readOnly: mode === "view" }}
      error={!!errors.title}
      helperText={errors.title}
      fullWidth
    />

    <TextField
      label="ID автора"
      name="authorId"
      type="number"
      value={book.authorId}
      onChange={onChange}
      InputProps={{ readOnly: mode === "view" }}
      error={!!errors.authorId}
      helperText={errors.authorId}
      fullWidth
    />

    <TextField
      label="Рік публікації"
      name="yearPublished"
      type="number"
      value={book.yearPublished}
      onChange={onChange}
      InputProps={{ readOnly: mode === "view" }}
      error={!!errors.yearPublished}
      helperText={errors.yearPublished}
      fullWidth
    />
  </Stack>
);

export default BookForm;
