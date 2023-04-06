// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import {
  Box,
  Card,
  Radio,
  Paper,
  CardProps,
  Typography,
  RadioGroup,
  CardHeader,
  CardContent,
  FormControlLabel,
} from '@mui/material';
// @types
import { ICheckoutDeliveryOption } from '../../../../../@types/product';
// components
import Iconify from '../../../../../components/iconify';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  deliveryOptions: ICheckoutDeliveryOption[];
  onApplyShipping: (shipping: number) => void;
}

export default function CheckoutDelivery({ deliveryOptions, onApplyShipping, ...other }: Props) {
  const { control } = useFormContext();

  return (
    <Card {...other}>
      <CardHeader title="Delivery options" />

      <CardContent>
        <Controller
          name="delivery"
          control={control}
          render={({ field }) => (
            <RadioGroup
              {...field}
              onChange={(event) => {
                const { value } = event.target;
                field.onChange(Number(value));
                onApplyShipping(Number(value));
              }}
            >
              <Box
                gap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                }}
              >
                {deliveryOptions.map((option) => (
                  <DeliveryOption
                    key={option.value}
                    option={option}
                    isSelected={field.value === option.value}
                  />
                ))}
              </Box>
            </RadioGroup>
          )}
        />
      </CardContent>
    </Card>
  );
}

// ----------------------------------------------------------------------

type DeliveryOptionProps = {
  option: ICheckoutDeliveryOption;
  isSelected: boolean;
};

function DeliveryOption({ option, isSelected }: DeliveryOptionProps) {
  const { value, title, description } = option;

  return (
    <Paper
      variant="outlined"
      key={value}
      sx={{
        display: 'flex',
        alignItems: 'center',
        transition: (theme) => theme.transitions.create('all'),
        ...(isSelected && {
          boxShadow: (theme) => theme.customShadows.z20,
        }),
      }}
    >
      <FormControlLabel
        value={value}
        control={<Radio checkedIcon={<Iconify icon="eva:checkmark-circle-2-fill" />} />}
        label={
          <Box sx={{ ml: 1 }}>
            <Typography variant="subtitle2">{title}</Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {description}
            </Typography>
          </Box>
        }
        sx={{ py: 3, px: 2.5, flexGrow: 1, mr: 0 }}
      />
    </Paper>
  );
}
