import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import theme from 'misc/providers/ThemeProvider/themes/default';

const Notification = ({ open, message, type = "info", onClose }) => {
  const colorMap = {
    success: theme.button.color.success,
    error: theme.button.color.error,
    info: theme.button.color.info,
    warning: theme.button.color.warning,
  };

  const currentColor = colorMap[type] || theme.button.color.info;

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert
        onClose={onClose}
        variant="filled"
        sx={{
          backgroundColor: currentColor.background,
          '&:hover': { backgroundColor: currentColor.backgroundHovered },
          color: currentColor.text,
          pointerEvents: 'auto',
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
