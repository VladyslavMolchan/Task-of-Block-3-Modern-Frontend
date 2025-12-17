import React from "react";
import {
  Button,
  Typography,
  Container,
  Box,
  Paper,
  useTheme,
} from "@mui/material";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useNavigate } from "react-router-dom";
import PageContainer from "./components/PageContainer";

const DefaultPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <PageContainer>
      <Container maxWidth="sm">
        <Paper
          elevation={3}
          sx={{
            mt: 8,
            p: 4,
            textAlign: "center",
            borderRadius: 3,
          }}
        >
          <Box mb={2}>
            <MenuBookIcon
              sx={{
                fontSize: 64,
                color: theme.palette.success.main,
              }}
            />
          </Box>

          <Typography variant="h4" fontWeight={700} gutterBottom>
            Ласкаво просимо до бібліотеки
          </Typography>

          <Typography color="text.secondary" mb={3}>
            Тут ви можете переглядати книги, додавати нові та редагувати існуючі.
          </Typography>

          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/books")}
            sx={{
              px: 4,
              borderRadius: 2,
              backgroundColor: theme.palette.success.main,
              "&:hover": {
                backgroundColor: theme.palette.success.dark,
              },
            }}
          >
            Перейти до списку книг
          </Button>

          
        </Paper>
      </Container>
    </PageContainer>
  );
};

export default DefaultPage;
