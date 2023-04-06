import { useState } from 'react';
// @mui
import { Grid, Card, Button, Typography, Stack, Box } from '@mui/material';
// @types
import { ICheckoutBillingAddress, IProductCheckoutState } from '../../../../../@types/product';
// _mock
import { _addressBooks } from '../../../../../_mock/arrays';
// components
import Label from '../../../../../components/label';
import Iconify from '../../../../../components/iconify';
//
import CheckoutSummary from '../CheckoutSummary';
import CheckoutBillingNewAddressForm from './CheckoutBillingNewAddressForm';

// ----------------------------------------------------------------------

type Props = {
  checkout: IProductCheckoutState;
  onBackStep: VoidFunction;
  onCreateBilling: (address: ICheckoutBillingAddress) => void;
};

export default function CheckoutBillingAddress({ checkout, onBackStep, onCreateBilling }: Props) {
  const { total, discount, subtotal } = checkout;

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {_addressBooks.map((address, index) => (
            <AddressItem
              key={index}
              address={address}
              onCreateBilling={() => onCreateBilling(address)}
            />
          ))}

          <Stack direction="row" justifyContent="space-between">
            <Button
              size="small"
              color="inherit"
              onClick={onBackStep}
              startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
            >
              Back
            </Button>

            <Button
              size="small"
              variant="soft"
              onClick={handleOpen}
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Add new address
            </Button>
          </Stack>
        </Grid>

        <Grid item xs={12} md={4}>
          <CheckoutSummary subtotal={subtotal} total={total} discount={discount} />
        </Grid>
      </Grid>

      <CheckoutBillingNewAddressForm
        open={open}
        onClose={handleClose}
        onCreateBilling={onCreateBilling}
      />
    </>
  );
}

// ----------------------------------------------------------------------

type AddressItemProps = {
  address: ICheckoutBillingAddress;
  onCreateBilling: VoidFunction;
};

function AddressItem({ address, onCreateBilling }: AddressItemProps) {
  const { receiver, fullAddress, addressType, phone, isDefault } = address;

  return (
    <Card
      sx={{
        p: 3,
        mb: 3,
      }}
    >
      <Stack
        spacing={2}
        alignItems={{
          md: 'flex-end',
        }}
        direction={{
          xs: 'column',
          md: 'row',
        }}
      >
        <Stack flexGrow={1} spacing={1}>
          <Stack direction="row" alignItems="center">
            <Typography variant="subtitle1">
              {receiver}
              <Box component="span" sx={{ ml: 0.5, typography: 'body2', color: 'text.secondary' }}>
                ({addressType})
              </Box>
            </Typography>

            {isDefault && (
              <Label color="info" sx={{ ml: 1 }}>
                Default
              </Label>
            )}
          </Stack>

          <Typography variant="body2">{fullAddress}</Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {phone}
          </Typography>
        </Stack>

        <Stack flexDirection="row" flexWrap="wrap" flexShrink={0}>
          {!isDefault && (
            <Button variant="outlined" size="small" color="inherit" sx={{ mr: 1 }}>
              Delete
            </Button>
          )}

          <Button variant="outlined" size="small" onClick={onCreateBilling}>
            Deliver to this Address
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
