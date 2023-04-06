import { Tooltip, Typography, IconButton, Stack } from '@mui/material';
// components
import Iconify from '../../../../../components/iconify';

// ----------------------------------------------------------------------

export default function SortingSelectingToolbar() {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 3 }}>
      <Typography variant="h6">Sorting & Selecting</Typography>

      <Tooltip title="Filter list">
        <IconButton>
          <Iconify icon="ic:round-filter-list" />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}
