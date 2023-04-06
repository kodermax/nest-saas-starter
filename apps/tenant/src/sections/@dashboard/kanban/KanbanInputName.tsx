// @mui
import { InputBase, InputBaseProps } from '@mui/material';

// ----------------------------------------------------------------------

export default function KanbanInputName({ sx, ...other }: InputBaseProps) {
  return (
    <InputBase
      sx={{
        flexGrow: 1,
        '& .MuiInputBase-input': {
          py: 1,
          borderRadius: 1,
          typography: 'h6',
          border: `solid 1px transparent`,
          transition: (theme) => theme.transitions.create(['padding-left', 'border-color']),
          '&:hover, &:focus': {
            pl: 1,
            border: (theme) => `solid 1px ${theme.palette.text.primary}`,
          },
        },
        ...sx,
      }}
      {...other}
    />
  );
}
