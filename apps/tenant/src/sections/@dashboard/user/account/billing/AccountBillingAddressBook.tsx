// @mui
import { Box, Card, Button, Typography, Stack, Divider } from '@mui/material';
// @types
import { IUserAccountBillingAddress } from '../../../../../@types/user';
// components
import Iconify from '../../../../../components/iconify';

// ----------------------------------------------------------------------

type Props = {
  addressBook: IUserAccountBillingAddress[];
};

export default function AccountBillingAddressBook({ addressBook }: Props) {
  return (
    <Card sx={{ p: 3 }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
        <Typography variant="overline" sx={{ color: 'text.secondary' }}>
          Billing Info
        </Typography>

        <Button size="small" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Billing Address
        </Button>
      </Stack>

      <Stack spacing={3} divider={<Divider sx={{ borderStyle: 'dashed' }} />}>
        {addressBook.map((address) => (
          <Stack key={address.id} spacing={1}>
            <Typography variant="subtitle1">{address.name}</Typography>

            <Typography variant="body2">
              <Box component="span" sx={{ color: 'text.secondary', mr: 0.5 }}>
                Address:
              </Box>
              {`${address.street}, ${address.city}, ${address.state}, ${address.country} ${address.zipCode}`}
            </Typography>

            <Typography variant="body2">
              <Box component="span" sx={{ color: 'text.secondary', mr: 0.5 }}>
                Phone:
              </Box>
              {address.phone}
            </Typography>

            <Stack direction="row" spacing={1}>
              <Button color="error" size="small" startIcon={<Iconify icon="eva:trash-2-outline" />}>
                Delete
              </Button>

              <Button size="small" startIcon={<Iconify icon="eva:edit-fill" />}>
                Edit
              </Button>
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}
