import { useState } from 'react';
// @mui
import { Paper, Button, ClickAwayListener, TextField } from '@mui/material';
// redux
import { useDispatch } from '../../../../redux/store';
import { createColumn } from '../../../../redux/slices/kanban';
// components
import Iconify from '../../../../components/iconify';

// ----------------------------------------------------------------------

export default function KanbanColumnAdd() {
  const dispatch = useDispatch();

  const [name, setName] = useState('');

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleCreateColumn = async () => {
    try {
      if (name) {
        dispatch(createColumn({ name }));
        setName('');
      }
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleCreateColumn();
    }
  };

  return (
    <Paper sx={{ minWidth: 280, width: 280 }}>
      {open ? (
        <ClickAwayListener onClickAway={handleCreateColumn}>
          <TextField
            autoFocus
            fullWidth
            placeholder="New section"
            value={name}
            onChange={handleChangeName}
            onKeyUp={handleKeyUp}
            InputProps={{
              sx: { typography: 'h6' },
            }}
          />
        </ClickAwayListener>
      ) : (
        <Button
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={handleOpen}
        >
          Add section
        </Button>
      )}
    </Paper>
  );
}
