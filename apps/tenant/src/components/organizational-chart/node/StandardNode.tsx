import { useState } from 'react';
// @mui
import { Theme } from '@mui/material/styles';
import { SxProps, Typography, IconButton, MenuItem, Card, Avatar } from '@mui/material';
//
import Iconify from '../../iconify';
import MenuPopover from '../../menu-popover';
//
import { ItemProps } from '../types';

// ----------------------------------------------------------------------

type Props = {
  node: ItemProps;
  onEdit?: VoidFunction;
  onDelete?: VoidFunction;
  sx?: SxProps<Theme>;
};

export default function StandardNode({ node, onEdit, onDelete, sx }: Props) {
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <Card
        sx={{
          p: 2,
          minWidth: 200,
          borderRadius: 1.5,
          textAlign: 'left',
          position: 'relative',
          display: 'inline-flex',
          flexDirection: 'column',
          textTransform: 'capitalize',
          ...sx,
        }}
      >
        <IconButton
          color={openPopover ? 'inherit' : 'default'}
          onClick={handleOpenPopover}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          <Iconify icon="eva:more-horizontal-fill" />
        </IconButton>

        <Avatar
          alt={node.name}
          src={node.avatar || ''}
          sx={{ mr: 2, mb: 1, width: 48, height: 48 }}
        />

        <Typography variant="subtitle2" noWrap>
          {node.name}
        </Typography>

        <Typography variant="caption" component="div" noWrap sx={{ color: 'text.secondary' }}>
          {node.role}
        </Typography>
      </Card>

      <MenuPopover
        open={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
        transformOrigin={{ vertical: 'center', horizontal: 'left' }}
        arrow="left-center"
        sx={{ width: 160 }}
      >
        {onDelete && (
          <MenuItem
            onClick={() => {
              handleClosePopover();
              onDelete();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="eva:trash-2-outline" />
            Delete
          </MenuItem>
        )}

        {onEdit && (
          <MenuItem
            onClick={() => {
              handleClosePopover();
              onEdit();
            }}
          >
            <Iconify icon="eva:edit-fill" />
            Edit
          </MenuItem>
        )}
      </MenuPopover>
    </>
  );
}
