import { useState } from 'react';
// @mui
import {
  Stack,
  Dialog,
  Button,
  TextField,
  Typography,
  ListItemButton,
  InputAdornment,
} from '@mui/material';
// @types
import { IInvoiceAddress } from '../../../../@types/invoice';
// components
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';
import SearchNotFound from '../../../../components/search-not-found';

// ----------------------------------------------------------------------

type Props = {
  open: boolean;
  selected: (selectedId: string) => boolean;
  onClose: VoidFunction;
  onSelect: (address: IInvoiceAddress | null) => void;
  addressOptions: IInvoiceAddress[];
};

export default function InvoiceAddressListDialog({
  open,
  selected,
  onClose,
  onSelect,
  addressOptions,
}: Props) {
  const [searchAddress, setSearchAddress] = useState('');

  const dataFiltered = applyFilter(addressOptions, searchAddress);

  const isNotFound = !dataFiltered.length && !!searchAddress;

  const handleSearchAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchAddress(event.target.value);
  };

  const handleSelectAddress = (address: IInvoiceAddress | null) => {
    onSelect(address);
    setSearchAddress('');
    onClose();
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ pt: 2.5, px: 3 }}
      >
        <Typography variant="h6"> Select address </Typography>

        <Button
          size="small"
          startIcon={<Iconify icon="eva:plus-fill" />}
          sx={{ alignSelf: 'flex-end' }}
        >
          Add New
        </Button>
      </Stack>

      <Stack sx={{ p: 2.5 }}>
        <TextField
          value={searchAddress}
          onChange={handleSearchAddress}
          placeholder="Search..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      {isNotFound ? (
        <SearchNotFound query={searchAddress} sx={{ px: 3, pt: 5, pb: 10 }} />
      ) : (
        <Scrollbar sx={{ p: 1.5, pt: 0, maxHeight: 80 * 8 }}>
          {dataFiltered.map((address) => (
            <ListItemButton
              key={address.id}
              selected={selected(address.id)}
              onClick={() => handleSelectAddress(address)}
              sx={{
                p: 1.5,
                borderRadius: 1,
                flexDirection: 'column',
                alignItems: 'flex-start',
                '&.Mui-selected': {
                  bgcolor: 'action.selected',
                  '&:hover': {
                    bgcolor: 'action.selected',
                  },
                },
              }}
            >
              <Typography variant="subtitle2">{address.name}</Typography>

              <Typography
                variant="caption"
                component="div"
                sx={{
                  my: 0.5,
                  color: 'info.main',
                  fontWeight: 'fontWeightMedium',
                }}
              >
                {address.company}
              </Typography>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {address.address}
              </Typography>
            </ListItemButton>
          ))}
        </Scrollbar>
      )}
    </Dialog>
  );
}

// ----------------------------------------------------------------------

function applyFilter(array: IInvoiceAddress[], query: string) {
  if (query) {
    return array.filter(
      (address) =>
        address.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        address.company.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        address.address.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }

  return array;
}
