import { useRef, useState, useEffect } from 'react';
// @mui
import { Stack, MenuItem, IconButton, Button, Box } from '@mui/material';
// components
import Iconify from '../../../../components/iconify';
import MenuPopover from '../../../../components/menu-popover';
import ConfirmDialog from '../../../../components/confirm-dialog';
//
import KanbanInputName from '../KanbanInputName';

// ----------------------------------------------------------------------

type Props = {
  columnName: string;
  onDelete: VoidFunction;
  onUpdate: (name: string) => void;
};

export default function KanbanColumnToolBar({ columnName, onDelete, onUpdate }: Props) {
  const renameRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState(columnName);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const { current } = renameRef;

    if (openPopover) {
      if (current) {
        current.focus();
      }
    }
  }, [openPopover]);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  const handleClickRename = () => {
    handleClosePopover();
  };

  const handleChangeColumnName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleUpdateColumn = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && renameRef.current) {
      renameRef.current.blur();
      onUpdate(value);
    }
  };

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
        sx={{ pt: 3 }}
      >
        <KanbanInputName
          inputRef={renameRef}
          placeholder="Section name"
          value={value}
          onChange={handleChangeColumnName}
          onKeyUp={handleUpdateColumn}
        />

        <IconButton
          size="small"
          color={openPopover ? 'inherit' : 'default'}
          onClick={handleOpenPopover}
        >
          <Iconify icon="eva:more-horizontal-fill" />
        </IconButton>
      </Stack>

      <MenuPopover open={openPopover} onClose={handleClosePopover} sx={{ mt: 0, ml: 1.25 }}>
        <MenuItem
          onClick={() => {
            handleOpenConfirm();
            handleClosePopover();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="eva:trash-2-outline" />
          Delete section
        </MenuItem>

        <MenuItem onClick={handleClickRename}>
          <Iconify icon="eva:edit-fill" />
          Rename section
        </MenuItem>
      </MenuPopover>

      <ConfirmDialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        title="Delete"
        content={
          <>
            Are you sure want to delete column?
            <Box sx={{ typography: 'caption', color: 'error.main', mt: 2 }}>
              <strong> NOTE: </strong> All tasks related to this category will also be deleted.
            </Box>
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              onDelete();
              handleCloseConfirm();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}
