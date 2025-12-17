import { Table, TableBody, TableCell, TableHead, TableRow, Typography, IconButton, Box, TableContainer } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "../../../components/CircularProgress";

const HeadCell = ({ children }) => (
  <TableCell
    sx={{
      fontWeight: 600,
      bgcolor: "grey.100",
      borderBottom: "2px solid",
      borderColor: "divider",
    }}
  >
    {children}
  </TableCell>
);

const BooksTable = ({ books, loading, onDeleteClick, onRowClick }) => (
  <TableContainer sx={{ position: "relative", borderRadius: 2 }}>
    <Table stickyHeader>
      <TableHead>
        <TableRow>
          <HeadCell>Назва</HeadCell>
          <HeadCell>Автор</HeadCell>
          <HeadCell>Рік</HeadCell>
          <HeadCell />
        </TableRow>
      </TableHead>

      <TableBody>
        {books.length ? (
          books.map((b) => (
            <TableRow
              key={b.id}
              hover
              sx={{ cursor: "pointer", "&:hover .delete-btn": { opacity: 1 } }}
              onClick={() => onRowClick(b.id)}
            >
              <TableCell>
                <Typography fontWeight={500}>{b.title}</Typography>
              </TableCell>

              <TableCell>
                <Typography>{b.authorName}</Typography>
                {b.authorId && (
                  <Typography variant="caption" color="text.secondary">
                    ID: {b.authorId}
                  </Typography>
                )}
              </TableCell>

              <TableCell>{b.yearPublished}</TableCell>

              <TableCell align="right">
                <IconButton
                  className="delete-btn"
                  onClick={(e) => { e.stopPropagation(); onDeleteClick(b.id); }}
                  sx={{ opacity: 0, transition: "0.2s" }}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={4} align="center">
              <Typography color="text.secondary">Немає книг для відображення</Typography>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>

    {loading && (
      <Box
        position="absolute"
        inset={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgcolor="rgba(255,255,255,0.6)"
      >
        <CircularProgress />
      </Box>
    )}
  </TableContainer>
);

export default BooksTable;
