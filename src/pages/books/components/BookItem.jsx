import React from "react";
import { Typography, IconButton, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

import Card from "../../../components/Card";
import CardContent from "../../../components/CardContent";

function BookItem({ book, onClick, onDelete, isLocked = false }) {
  if (!book) return null;

  const { title = "—", yearPublished = "—", author, authorName } = book;

  return (
    <Card
      variant="paper"
      onClick={isLocked ? undefined : onClick}
      sx={{
        cursor: isLocked ? "default" : "pointer",
        position: "relative",
        transition: "0.2s",
        "&:hover": {
          boxShadow: 4,
        },
        "&:hover .delete-btn": {
          opacity: 1,
        },
      }}
    >
      <CardContent>
        <Typography fontWeight={600}>{title}</Typography>

        <Typography variant="body2" color="text.secondary">
          Автор: {author?.name || authorName || "—"}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Рік: {yearPublished}
        </Typography>
      </CardContent>

      {!isLocked && (
        <Box position="absolute" top={8} right={8}>
          <IconButton
            className="delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
            }}
            sx={{ opacity: 0, transition: "0.2s" }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
    </Card>
  );
}

export default BookItem;
