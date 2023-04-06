// @mui
import { Typography, Dialog, DialogContent, Stack, IconButton } from '@mui/material';
// @types
import { IChatParticipant } from '../../../../@types/chat';
// components
import { CustomAvatar } from '../../../../components/custom-avatar';
import Iconify from '../../../../components/iconify';

// ----------------------------------------------------------------------

type Props = {
  participant: IChatParticipant;
  open: boolean;
  onClose: VoidFunction;
};

export default function ChatRoomParticipantInfoDialog({ participant, open, onClose }: Props) {
  const { name, avatar, role, address } = participant;

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
        <Iconify icon="eva:close-fill" />
      </IconButton>

      <DialogContent sx={{ p: 5 }}>
        <Stack direction="row" spacing={3}>
          <CustomAvatar alt={name} src={avatar} name={name} sx={{ width: 96, height: 96 }} />

          <Stack spacing={1}>
            <Typography variant="caption" sx={{ color: 'primary.main' }}>
              {role}
            </Typography>

            <Typography variant="h6">{name}</Typography>

            <Stack direction="row" sx={{ typography: 'caption', color: 'text.secondary' }}>
              <Iconify icon="eva:pin-fill" width={16} sx={{ flexShrink: 0, mr: 0.5 }} />
              {address}
            </Stack>

            <Stack direction="row" sx={{ pt: 1 }}>
              <IconButton color="info">
                <Iconify icon="eva:message-square-fill" />
              </IconButton>

              <IconButton color="warning">
                <Iconify icon="eva:email-fill" />
              </IconButton>

              <IconButton color="success">
                <Iconify icon="eva:phone-fill" />
              </IconButton>

              <IconButton color="error">
                <Iconify icon="eva:video-fill" />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}
