// @mui
import { Box, Card, Typography, CardProps, LinearProgress, Stack } from '@mui/material';
// utils
import { fData } from '../../../../utils/formatNumber';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title: string;
  value: number;
  total: number;
  icon: string;
}

export default function FileGeneralWidget({ title, value, total, icon, sx, ...other }: Props) {
  return (
    <Card sx={{ p: 3, ...sx }} {...other}>
      <Box component="img" src={icon} sx={{ width: 48, height: 48 }} />

      <Typography variant="h6" sx={{ mt: 3 }}>
        {title}
      </Typography>

      <LinearProgress
        value={24}
        variant="determinate"
        color="inherit"
        sx={{
          my: 2,
          height: 6,
          '&::before': {
            bgcolor: 'background.neutral',
            opacity: 1,
          },
        }}
      />

      <Stack direction="row" spacing={0.5} justifyContent="flex-end">
        <Box component="span" sx={{ typography: 'body2', color: 'text.disabled' }}>
          {fData(value)}
        </Box>

        <Box component="span" sx={{ typography: 'subtitle2' }}>
          {fData(total)}
        </Box>
      </Stack>
    </Card>
  );
}
