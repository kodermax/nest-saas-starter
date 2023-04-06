import { useState } from 'react';
// @mui
import {
  Box,
  Stack,
  Paper,
  Radio,
  Button,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
// components
import Iconify from '../../components/iconify';
//
import PaymentNewCardDialog from './PaymentNewCardDialog';

// ----------------------------------------------------------------------

const PAYMENT_OPTIONS = [
  {
    value: 'paypal',
    title: 'Paypal',
    icons: ['/assets/icons/payments/ic_paypal.svg'],
  },
  {
    value: 'credit_card',
    title: 'Credit / Debit Card',
    icons: ['/assets/icons/payments/ic_mastercard.svg', '/assets/icons/payments/ic_visa.svg'],
  },
];
const CARD_OPTIONS = [
  {
    value: 'visa1',
    label: '**** **** **** 1212 - Jimmy Holland',
  },
  {
    value: 'visa2',
    label: '**** **** **** 2424 - Shawn Stokes',
  },
  {
    value: 'mastercard',
    label: '**** **** **** 4545 - Cole Armstrong',
  },
];

// ----------------------------------------------------------------------

export default function PaymentMethods() {
  const [method, setMethod] = useState('paypal');

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeMethod = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMethod((event.target as HTMLInputElement).value);
  };

  return (
    <>
      <Stack spacing={5}>
        <Typography variant="h6">Payment Method</Typography>

        <RadioGroup value={method} onChange={handleChangeMethod}>
          <Stack spacing={3}>
            {PAYMENT_OPTIONS.map((option) => (
              <PaymentOption
                key={option.title}
                option={option}
                isSelected={method === option.value}
                hasChild={option.value === 'credit_card'}
                isCreditMethod={option.value === 'credit_card' && method === 'credit_card'}
                onOpen={handleOpen}
              />
            ))}
          </Stack>
        </RadioGroup>
      </Stack>

      <PaymentNewCardDialog open={open} onClose={handleClose} />
    </>
  );
}

// ----------------------------------------------------------------------

type PaymentOptionProps = {
  option: {
    value: string;
    title: string;
    icons: string[];
  };
  hasChild: boolean;
  isSelected: boolean;
  isCreditMethod: boolean;
  onOpen: VoidFunction;
};

function PaymentOption({
  option,
  hasChild,
  isSelected,
  isCreditMethod,
  onOpen,
}: PaymentOptionProps) {
  const { value, title, icons } = option;

  return (
    <Paper
      variant="outlined"
      sx={{
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        transition: (theme) => theme.transitions.create('all'),
        ...(hasChild && {
          flexWrap: 'wrap',
        }),
        ...(isSelected && {
          boxShadow: (theme) => theme.customShadows.z20,
        }),
      }}
    >
      <FormControlLabel
        value={value}
        control={<Radio checkedIcon={<Iconify icon="eva:checkmark-circle-2-fill" />} />}
        label={title}
        sx={{ py: 2, pl: 2.5, flexGrow: 1, mr: 0 }}
      />

      <Stack
        spacing={1}
        direction="row"
        alignItems="center"
        sx={{ position: 'absolute', right: 20, top: 24 }}
      >
        {icons.map((icon) => (
          <Box component="img" key={icon} src={icon} />
        ))}
      </Stack>

      {isCreditMethod && (
        <Stack
          alignItems="flex-start"
          sx={{
            px: 3,
            width: 1,
          }}
        >
          <TextField
            select
            fullWidth
            label="Card"
            SelectProps={{
              native: true,
            }}
          >
            {CARD_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>

          <Button
            size="small"
            startIcon={<Iconify icon="eva:plus-fill" />}
            onClick={onOpen}
            sx={{ my: 3 }}
          >
            Add new card
          </Button>
        </Stack>
      )}
    </Paper>
  );
}
