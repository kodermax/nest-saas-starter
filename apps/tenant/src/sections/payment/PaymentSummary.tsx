// @mui
import { Switch, Divider, Typography, Stack, Box, BoxProps } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Label from '../../components/label';
import Iconify from '../../components/iconify';

// ----------------------------------------------------------------------

export default function PaymentSummary({ sx, ...other }: BoxProps) {
  return (
    <Box
      sx={{
        p: 5,
        borderRadius: 2,
        bgcolor: 'background.neutral',
        ...sx,
      }}
      {...other}
    >
      <Typography variant="h6" sx={{ mb: 5 }}>
        Summary
      </Typography>

      <Stack spacing={2.5}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Subscription
          </Typography>

          <Label color="error">PREMIUM</Label>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Billed Monthly
          </Typography>
          <Switch defaultChecked />
        </Stack>

        <Stack spacing={1} direction="row" justifyContent="flex-end">
          <Typography variant="h5">$</Typography>

          <Typography variant="h2">9.99</Typography>

          <Typography component="span" sx={{ mb: 1, alignSelf: 'center', color: 'text.secondary' }}>
            /mo
          </Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">Total Billed</Typography>

          <Typography variant="h6">$9.99*</Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />
      </Stack>

      <Typography component="div" variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
        * Plus applicable taxes
      </Typography>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" sx={{ mt: 5, mb: 3 }}>
        Upgrade My Plan
      </LoadingButton>

      <Stack alignItems="center" spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Iconify icon="eva:shield-fill" sx={{ color: 'primary.main' }} />
          <Typography variant="subtitle2">Secure credit card payment</Typography>
        </Stack>

        <Typography variant="caption" sx={{ color: 'text.secondary', textAlign: 'center' }}>
          This is a secure 128-bit SSL encrypted payment
        </Typography>
      </Stack>
    </Box>
  );
}
