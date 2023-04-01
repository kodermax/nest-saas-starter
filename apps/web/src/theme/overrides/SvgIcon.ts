import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function SvgIcon(theme: Theme) {
  return {
    MuiSvgIcon: {
      styleOverrides: {
        fontSizeLarge: {
          width: 32,
          height: 32,
          fontSize: 'inherit',
        },
      },
    },
  };
}
