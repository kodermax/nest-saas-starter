// @mui
import { DialogProps } from '@mui/material';

// ----------------------------------------------------------------------

export interface ConfirmDialogProps extends Omit<DialogProps, 'title'> {
  title: React.ReactNode;
  content?: React.ReactNode;
  action: React.ReactNode;
  open: boolean;
  onClose: VoidFunction;
}
