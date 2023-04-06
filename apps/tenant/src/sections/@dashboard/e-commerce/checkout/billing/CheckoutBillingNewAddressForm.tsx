import * as Yup from 'yup';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  Box,
  Stack,
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// @types
import { ICheckoutBillingAddress } from '../../../../../@types/product';
// assets
import { countries } from '../../../../../assets/data';
import FormProvider, {
  RHFCheckbox,
  RHFSelect,
  RHFTextField,
  RHFRadioGroup,
} from '../../../../../components/hook-form';

// ----------------------------------------------------------------------

interface FormValuesProps extends ICheckoutBillingAddress {
  address: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
}

type Props = {
  open: boolean;
  onClose: VoidFunction;
  onCreateBilling: (address: ICheckoutBillingAddress) => void;
};

export default function CheckoutBillingNewAddressForm({ open, onClose, onCreateBilling }: Props) {
  const NewAddressSchema = Yup.object().shape({
    receiver: Yup.string().required('Fullname is required'),
    phone: Yup.string().required('Phone is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
  });

  const defaultValues = {
    addressType: 'Home',
    receiver: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: countries[0].label,
    zipcode: '',
    isDefault: true,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(NewAddressSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      onCreateBilling({
        receiver: data.receiver,
        phone: data.phone,
        fullAddress: `${data.address}, ${data.city}, ${data.state}, ${data.country}, ${data.zipcode}`,
        addressType: data.addressType,
        isDefault: data.isDefault,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Add new address</DialogTitle>

        <DialogContent dividers>
          <Stack spacing={3}>
            <RHFRadioGroup
              name="addressType"
              options={[
                { label: 'Home', value: 'Home' },
                { label: 'Office', value: 'Office' },
              ]}
            />

            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <RHFTextField name="receiver" label="Full Name" />

              <RHFTextField name="phone" label="Phone Number" />
            </Box>

            <RHFTextField name="address" label="Address" />

            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(3, 1fr)',
              }}
            >
              <RHFTextField name="city" label="Town / City" />

              <RHFTextField name="state" label="State" />

              <RHFTextField name="zipcode" label="Zip / Postal Code" />
            </Box>

            <RHFSelect name="country" label="Country">
              {countries.map((option) => (
                <option key={option.code} value={option.label}>
                  {option.label}
                </option>
              ))}
            </RHFSelect>

            <RHFCheckbox name="isDefault" label="Use this address as default." sx={{ mt: 3 }} />
          </Stack>
        </DialogContent>

        <DialogActions>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Deliver to this Address
          </LoadingButton>

          <Button color="inherit" variant="outlined" onClick={onClose}>
            Cancel
          </Button>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}
