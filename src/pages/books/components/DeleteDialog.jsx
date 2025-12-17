import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@mui/material";
import Button from "../../../components/Button";

const DeleteDialog = ({ open, onClose, onConfirm, error }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle fontWeight={600}>
        Підтвердження видалення
      </DialogTitle>

      <DialogContent sx={{ pt: 1 }}>
        <Typography>
          Ви впевнені, що хочете видалити цю книгу?
        </Typography>

        {error && (
          <Typography color="error" variant="caption">
            {error}
          </Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ gap: 1 }}>
        <Button variant="outlined" onClick={onClose}>
          Скасувати
        </Button>
        <Button variant="contained" colorVariant="error" onClick={onConfirm}>
          Видалити
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
