import { useState } from 'react';
// form
import { useFormContext } from 'react-hook-form';
// @mui
import { Stack, Divider, Typography, Button } from '@mui/material';
// hooks
import useResponsive from '../../../../hooks/useResponsive';
// _mock
import { _invoiceAddressFrom, _invoiceAddressTo } from '../../../../_mock/arrays';
// components
import Iconify from '../../../../components/iconify';
//
import InvoiceAddressListDialog from './InvoiceAddressListDialog';

// ----------------------------------------------------------------------

export default function InvoiceNewEditAddress() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const upMd = useResponsive('up', 'md');

  const values = watch();

  const { invoiceFrom, invoiceTo } = values;

  const [openFrom, setOpenFrom] = useState(false);

  const [openTo, setOpenTo] = useState(false);

  const handleOpenFrom = () => {
    setOpenFrom(true);
  };

  const handleCloseFrom = () => {
    setOpenFrom(false);
  };

  const handleOpenTo = () => {
    setOpenTo(true);
  };

  const handleCloseTo = () => {
    setOpenTo(false);
  };

  return (
    <Stack
      spacing={{ xs: 2, md: 5 }}
      direction={{ xs: 'column', md: 'row' }}
      divider={
        <Divider
          flexItem
          orientation={upMd ? 'vertical' : 'horizontal'}
          sx={{ borderStyle: 'dashed' }}
        />
      }
      sx={{ p: 3 }}
    >
      <Stack sx={{ width: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="h6" sx={{ color: 'text.disabled' }}>
            From:
          </Typography>

          <Button
            size="small"
            startIcon={<Iconify icon="eva:edit-fill" />}
            onClick={handleOpenFrom}
          >
            Change
          </Button>

          <InvoiceAddressListDialog
            open={openFrom}
            onClose={handleCloseFrom}
            selected={(selectedId: string) => invoiceFrom?.id === selectedId}
            onSelect={(address) => setValue('invoiceFrom', address)}
            addressOptions={_invoiceAddressFrom}
          />
        </Stack>

        <AddressInfo
          name={invoiceFrom.name}
          address={invoiceFrom.address}
          phone={invoiceFrom.phone}
        />
      </Stack>

      <Stack sx={{ width: 1 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
          <Typography variant="h6" sx={{ color: 'text.disabled' }}>
            To:
          </Typography>

          <Button
            size="small"
            startIcon={<Iconify icon={invoiceTo ? 'eva:edit-fill' : 'eva:plus-fill'} />}
            onClick={handleOpenTo}
          >
            {invoiceTo ? 'Change' : 'Add'}
          </Button>

          <InvoiceAddressListDialog
            open={openTo}
            onClose={handleCloseTo}
            selected={(selectedId: string) => invoiceTo?.id === selectedId}
            onSelect={(address) => setValue('invoiceTo', address)}
            addressOptions={_invoiceAddressTo}
          />
        </Stack>

        {invoiceTo ? (
          <AddressInfo name={invoiceTo.name} address={invoiceTo.address} phone={invoiceTo.phone} />
        ) : (
          <Typography typography="caption" sx={{ color: 'error.main' }}>
            {(errors.invoiceTo as any)?.message}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
}

// ----------------------------------------------------------------------

type AddressInfoProps = {
  name: string;
  address: string;
  phone: string;
};

function AddressInfo({ name, address, phone }: AddressInfoProps) {
  return (
    <>
      <Typography variant="subtitle2">{name}</Typography>
      <Typography variant="body2" sx={{ mt: 1, mb: 0.5 }}>
        {address}
      </Typography>
      <Typography variant="body2">Phone: {phone}</Typography>
    </>
  );
}
