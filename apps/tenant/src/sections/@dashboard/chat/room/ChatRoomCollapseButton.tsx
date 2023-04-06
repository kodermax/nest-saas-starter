// @mui
import { Button, ButtonProps } from '@mui/material';
// components
import Iconify from '../../../../components/iconify';

// ----------------------------------------------------------------------

interface Props extends ButtonProps {
  isCollapse: boolean;
  onCollapse: VoidFunction;
}

export default function ChatRoomCollapseButton({
  isCollapse,
  onCollapse,
  children,
  sx,
  ...other
}: Props) {
  return (
    <Button
      fullWidth
      color="inherit"
      onClick={onCollapse}
      endIcon={
        <Iconify
          width={16}
          icon={isCollapse ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
        />
      }
      sx={{
        height: 40,
        flexShrink: 0,
        borderRadius: 0,
        typography: 'overline',
        color: 'text.disabled',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(1, 1.5, 1, 2.5),
        ...sx,
      }}
      {...other}
    >
      {children}
    </Button>
  );
}
