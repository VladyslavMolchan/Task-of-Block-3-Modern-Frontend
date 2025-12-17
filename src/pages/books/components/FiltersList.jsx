import { Stack, TextField } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import Button from "../../../components/Button";

const Filters = ({ filters, onChange, onClear }) => (
  <Stack direction="row" spacing={2} mb={2}>
    <TextField
      label="Назва"
      name="title"
      value={filters.title}
      onChange={onChange}
      size="small"
    />
    <TextField
      label="ID автора"
      name="authorId"
      value={filters.authorId}
      onChange={onChange}
      size="small"
    />
    <TextField
      label="Рік"
      name="yearPublished"
      value={filters.yearPublished}
      onChange={onChange}
      size="small"
    />
    <Button
      variant="outlined"
      startIcon={<ClearIcon />}
      onClick={onClear}
    >
      Скинути
    </Button>
  </Stack>
);

export default Filters;
