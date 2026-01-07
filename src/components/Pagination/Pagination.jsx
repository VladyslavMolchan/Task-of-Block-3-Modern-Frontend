import React from "react";
import { Pagination as MuiPagination, Box, useTheme } from "@mui/material";

const Pagination = ({ page, totalPages, onChange }) => {
  const theme = useTheme();

  return (
    <Box mt={3} display="flex" justifyContent="center">
      <MuiPagination
        count={totalPages}
        page={page}
        onChange={(e, value) => onChange(value)}
        showFirstButton
        showLastButton
        sx={{
          "& .MuiPaginationItem-root": {
            borderRadius: "50%",
            minWidth: 40,
            height: 40,
            fontWeight: 500,
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            backgroundColor: theme.palette.success.main,
            color: "#fff",
            "&:hover": {
              backgroundColor: theme.palette.success.dark,
            },
          },
        }}
      />
    </Box>
  );
};

export default Pagination;
