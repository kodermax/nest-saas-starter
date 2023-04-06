// @mui
import {
  List,
  Stack,
  Dialog,
  Button,
  TextField,
  DialogProps,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';
// @types
import { IFileShared } from '../../../../@types/file';
// components
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';
//
import FileInvitedItem from '../FileInvitedItem';

// ----------------------------------------------------------------------

interface Props extends DialogProps {
  inviteEmail?: string;
  shared?: IFileShared[] | null;
  onCopyLink?: VoidFunction;
  onChangeInvite?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  //
  open: boolean;
  onClose: VoidFunction;
}

export default function FileShareDialog({
  shared,
  inviteEmail,
  onCopyLink,
  onChangeInvite,
  //
  open,
  onClose,
  ...other
}: Props) {
  const hasShared = shared && !!shared.length;

  return (
    <>
      <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose} {...other}>
        <DialogTitle> Invite </DialogTitle>

        <DialogContent sx={{ overflow: 'unset' }}>
          {onChangeInvite && (
            <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
              <TextField
                fullWidth
                size="small"
                value={inviteEmail}
                placeholder="Email"
                onChange={onChangeInvite}
              />
              <Button disabled={!inviteEmail} variant="contained" sx={{ flexShrink: 0 }}>
                Send Invite
              </Button>
            </Stack>
          )}

          {hasShared && (
            <Scrollbar sx={{ maxHeight: 60 * 6 }}>
              <List disablePadding>
                {shared.map((person) => (
                  <FileInvitedItem key={person.id} person={person} />
                ))}
              </List>
            </Scrollbar>
          )}
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'space-between' }}>
          {onCopyLink && (
            <Button startIcon={<Iconify icon="eva:link-2-fill" />} onClick={onCopyLink}>
              Copy link
            </Button>
          )}

          {onClose && (
            <Button variant="outlined" color="inherit" onClick={onClose}>
              Close
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
