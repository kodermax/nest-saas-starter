// @mui
import { Stack, Link, Button, Typography } from '@mui/material';
// utils
import { fDate } from '../../../../../utils/formatTime';
import { fCurrency } from '../../../../../utils/formatNumber';
// @types
import { IUserAccountBillingInvoice } from '../../../../../@types/user';
// components
import Iconify from '../../../../../components/iconify';

// ----------------------------------------------------------------------

type Props = {
  invoices: IUserAccountBillingInvoice[];
};

export default function AccountBillingInvoiceHistory({ invoices }: Props) {
  return (
    <Stack spacing={3} alignItems="flex-end">
      <Typography variant="overline" sx={{ width: 1, color: 'text.secondary' }}>
        Invoice History
      </Typography>

      <Stack spacing={2} sx={{ width: 1 }}>
        {invoices.map((invoice) => (
          <Stack key={invoice.id} direction="row" justifyContent="space-between" sx={{ width: 1 }}>
            <Typography variant="body2" sx={{ minWidth: 120 }}>
              {fDate(invoice.createdAt)}
            </Typography>

            <Typography variant="body2">{fCurrency(invoice.price)}</Typography>

            <Link>PDF</Link>
          </Stack>
        ))}
      </Stack>

      <Button size="small" color="inherit" endIcon={<Iconify icon="eva:arrow-ios-forward-fill" />}>
        All invoices
      </Button>
    </Stack>
  );
}
