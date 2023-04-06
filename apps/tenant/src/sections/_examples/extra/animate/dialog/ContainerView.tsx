// @mui
import {
  Paper,
  Button,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
} from '@mui/material';
// components
import { DialogAnimate } from '../../../../../components/animate';
//
import getVariant from '../getVariant';

// ----------------------------------------------------------------------

type ContainerViewProps = {
  isOpen: boolean;
  onOpen: VoidFunction;
  onClose: VoidFunction;
  selectVariant: string;
};

export default function ContainerView({
  isOpen,
  onOpen,
  onClose,
  selectVariant,
  ...other
}: ContainerViewProps) {
  return (
    <Paper
      sx={{
        height: 480,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.neutral',
      }}
      {...other}
    >
      <Button variant="contained" onClick={onOpen}>
        Click Me!
      </Button>
      <DialogAnimate open={isOpen} onClose={onClose} variants={getVariant(selectVariant)}>
        <DialogTitle id="alert-dialog-title">Use Google's location service?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Disagree</Button>
          <Button variant="contained" onClick={onClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </DialogAnimate>
    </Paper>
  );
}
