import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function DatePicker(theme: Theme) {
  return {
    MuiDatePicker: {
      defaultProps: {
        inputFormat: 'dd/MM/yyyy',
      },
    },
  };
}
