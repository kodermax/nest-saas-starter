import { useState } from 'react';
// @mui
import {
  Box,
  Chip,
  List,
  Stack,
  Drawer,
  Button,
  Divider,
  Checkbox,
  TextField,
  Typography,
  IconButton,
  StackProps,
  DrawerProps,
  Autocomplete,
} from '@mui/material';
// utils
import { fData } from '../../../../utils/formatNumber';
import { fDateTime } from '../../../../utils/formatTime';
// @types
import { IFile } from '../../../../@types/file';
// components
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';
import FileThumbnail, { fileFormat } from '../../../../components/file-thumbnail';
//
import FileShareDialog from './FileShareDialog';
import FileInvitedItem from '../FileInvitedItem';

// ----------------------------------------------------------------------

interface Props extends DrawerProps {
  item: IFile;
  favorited?: boolean;
  //
  onFavorite?: VoidFunction;
  onCopyLink: VoidFunction;
  //
  onClose: VoidFunction;
  onDelete: VoidFunction;
}

export default function FileDetailsDrawer({
  item,
  open,
  favorited,
  //
  onFavorite,
  onCopyLink,
  onClose,
  onDelete,
  ...other
}: Props) {
  const { name, size, url, type, shared, dateModified } = item;

  const hasShared = shared && !!shared.length;

  const [openShare, setOpenShare] = useState(false);

  const [toggleTags, setToggleTags] = useState(true);

  const [inviteEmail, setInviteEmail] = useState('');

  const [tags, setTags] = useState(item.tags.slice(0, 3));

  const [toggleProperties, setToggleProperties] = useState(true);

  const handleToggleTags = () => {
    setToggleTags(!toggleTags);
  };

  const handleToggleProperties = () => {
    setToggleProperties(!toggleProperties);
  };

  const handleOpenShare = () => {
    setOpenShare(true);
  };

  const handleCloseShare = () => {
    setOpenShare(false);
  };

  const handleChangeInvite = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInviteEmail(event.target.value);
  };

  return (
    <>
      <Drawer
        open={open}
        onClose={onClose}
        anchor="right"
        BackdropProps={{
          invisible: true,
        }}
        PaperProps={{
          sx: { width: 320 },
        }}
        {...other}
      >
        <Scrollbar sx={{ height: 1 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2.5 }}>
            <Typography variant="h6"> Info </Typography>

            <Checkbox
              color="warning"
              icon={<Iconify icon="eva:star-outline" />}
              checkedIcon={<Iconify icon="eva:star-fill" />}
              checked={favorited}
              onChange={onFavorite}
              sx={{ p: 0.75 }}
            />
          </Stack>

          <Stack
            spacing={2.5}
            justifyContent="center"
            sx={{ p: 2.5, bgcolor: 'background.neutral' }}
          >
            <FileThumbnail
              imageView
              file={type === 'folder' ? type : url}
              sx={{ width: 64, height: 64 }}
              imgSx={{ borderRadius: 1 }}
            />

            <Typography variant="h6" sx={{ wordBreak: 'break-all' }}>
              {name}
            </Typography>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Stack spacing={1}>
              <Panel label="Tags" toggle={toggleTags} onToggle={handleToggleTags} />

              {toggleTags && (
                <>
                  <Autocomplete
                    multiple
                    freeSolo
                    limitTags={2}
                    options={item.tags.map((option) => option)}
                    value={tags}
                    onChange={(event, newValue) => {
                      setTags([
                        ...tags,
                        ...newValue.filter((option) => tags.indexOf(option) === -1),
                      ]);
                    }}
                    renderTags={(value: readonly string[], getTagProps) =>
                      value.map((option: string, index: number) => (
                        <Chip
                          {...getTagProps({ index })}
                          size="small"
                          variant="soft"
                          label={option}
                          key={option}
                        />
                      ))
                    }
                    renderInput={(params) => <TextField {...params} placeholder="#Add a tags" />}
                  />
                </>
              )}
            </Stack>

            <Stack spacing={1.5}>
              <Panel
                label="Properties"
                toggle={toggleProperties}
                onToggle={handleToggleProperties}
              />

              {toggleProperties && (
                <>
                  <Stack spacing={1.5}>
                    <Row label="Size" value={fData(size)} />

                    <Row label="Modified" value={fDateTime(dateModified)} />

                    <Row label="Type" value={fileFormat(type)} />
                  </Stack>
                </>
              )}
            </Stack>
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2.5 }}>
            <Typography variant="subtitle2"> File Share With </Typography>

            <IconButton
              size="small"
              color="success"
              onClick={handleOpenShare}
              sx={{
                p: 0,
                width: 24,
                height: 24,
                color: 'common.white',
                bgcolor: 'success.main',
                '&:hover': {
                  bgcolor: 'success.main',
                },
              }}
            >
              <Iconify icon="eva:plus-fill" />
            </IconButton>
          </Stack>

          {hasShared && (
            <List disablePadding sx={{ pl: 2.5, pr: 1 }}>
              {shared.map((person) => (
                <FileInvitedItem key={person.id} person={person} />
              ))}
            </List>
          )}
        </Scrollbar>

        <Box sx={{ p: 2.5 }}>
          <Button
            fullWidth
            variant="soft"
            color="error"
            size="large"
            startIcon={<Iconify icon="eva:trash-2-outline" />}
            onClick={onDelete}
          >
            Delete
          </Button>
        </Box>
      </Drawer>

      <FileShareDialog
        open={openShare}
        shared={shared}
        inviteEmail={inviteEmail}
        onChangeInvite={handleChangeInvite}
        onCopyLink={onCopyLink}
        onClose={() => {
          handleCloseShare();
          setInviteEmail('');
        }}
      />
    </>
  );
}

// ----------------------------------------------------------------------

interface PanelProps extends StackProps {
  label: string;
  toggle: boolean;
  onToggle: VoidFunction;
}

function Panel({ label, toggle, onToggle, ...other }: PanelProps) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between" {...other}>
      <Typography variant="subtitle2"> {label} </Typography>

      <IconButton size="small" onClick={onToggle}>
        <Iconify icon={toggle ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />
      </IconButton>
    </Stack>
  );
}

// ----------------------------------------------------------------------

type RowProps = {
  label: string;
  value: string;
};

function Row({ label, value = '' }: RowProps) {
  return (
    <Stack direction="row" sx={{ typography: 'caption', textTransform: 'capitalize' }}>
      <Box component="span" sx={{ width: 80, color: 'text.secondary', mr: 2 }}>
        {label}
      </Box>

      {value}
    </Stack>
  );
}
