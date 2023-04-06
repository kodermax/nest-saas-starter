import { forwardRef, useState } from 'react';
// @mui
import {
  List,
  Slide,
  Button,
  Dialog,
  AppBar,
  Toolbar,
  Divider,
  IconButton,
  Typography,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
// components
import Iconify from '../../../../components/iconify';

// ----------------------------------------------------------------------

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialogs() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" color="error" onClick={handleClickOpen}>
        Full Screen Dialogs
      </Button>

      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar position="relative">
          <Toolbar>
            <IconButton color="inherit" edge="start" onClick={handleClose}>
              <Iconify icon="eva:close-fill" />
            </IconButton>
            <Typography variant="h6" sx={{ flex: 1, ml: 2 }}>
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItemButton>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItemButton>

          <Divider />

          <ListItemButton>
            <ListItemText primary="Default notification ringtone" secondary="Tethys" />
          </ListItemButton>
        </List>
      </Dialog>
    </>
  );
}
