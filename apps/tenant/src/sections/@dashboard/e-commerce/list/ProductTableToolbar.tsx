import { sentenceCase } from 'change-case';
// @mui
import {
  Stack,
  Button,
  Select,
  MenuItem,
  Checkbox,
  TextField,
  InputLabel,
  FormControl,
  OutlinedInput,
  InputAdornment,
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
// components
import Iconify from '../../../../components/iconify';

// ----------------------------------------------------------------------

type Props = {
  isFiltered: boolean;
  filterName: string;
  filterStatus: string[];
  statusOptions: {
    value: string;
    label: string;
  }[];
  onResetFilter: VoidFunction;
  onFilterStatus: (event: SelectChangeEvent<string[]>) => void;
  onFilterName: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ProductTableToolbar({
  isFiltered,
  filterName,
  filterStatus,
  onFilterName,
  statusOptions,
  onResetFilter,
  onFilterStatus,
}: Props) {
  return (
    <Stack
      spacing={2}
      alignItems="center"
      direction={{
        xs: 'column',
        md: 'row',
      }}
      sx={{ px: 2.5, py: 3 }}
    >
      <FormControl
        sx={{
          width: { xs: 1, md: 240 },
        }}
      >
        <InputLabel sx={{ '&.Mui-focused': { color: 'text.primary' } }}>Status</InputLabel>
        <Select
          multiple
          value={filterStatus}
          onChange={onFilterStatus}
          input={<OutlinedInput label="Status" />}
          renderValue={(selected) => selected.map((value) => sentenceCase(value)).join(', ')}
        >
          {statusOptions.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              sx={{
                p: 0,
                mx: 1,
                my: 0.5,
                borderRadius: 0.75,
                typography: 'body2',
                textTransform: 'capitalize',
                '&:first-of-type': { mt: 0 },
                '&:last-of-type': { mb: 0 },
              }}
            >
              <Checkbox disableRipple size="small" checked={filterStatus.includes(option.value)} />
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField
        fullWidth
        value={filterName}
        onChange={onFilterName}
        placeholder="Search..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          ),
        }}
      />

      {isFiltered && (
        <Button
          color="error"
          sx={{ flexShrink: 0 }}
          onClick={onResetFilter}
          startIcon={<Iconify icon="eva:trash-2-outline" />}
        >
          Clear
        </Button>
      )}
    </Stack>
  );
}
