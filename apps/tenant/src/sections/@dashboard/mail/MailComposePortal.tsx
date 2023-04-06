import { useState } from 'react';
// @mui
import {
  Paper,
  Stack,
  Portal,
  Button,
  Divider,
  Backdrop,
  InputBase,
  IconButton,
  Typography,
} from '@mui/material';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Iconify from '../../../components/iconify';
import Editor from '../../../components/editor';

// ----------------------------------------------------------------------

const ZINDEX = 1998;

const POSITION = 24;

type Props = {
  onCloseCompose: VoidFunction;
};

export default function MailComposePortal({ onCloseCompose }: Props) {
  const isDesktop = useResponsive('up', 'sm');

  const [message, setMessage] = useState('');

  const [fullScreen, setFullScreen] = useState(false);

  const handleChangeMessage = (value: string) => {
    setMessage(value);
  };

  return (
    <Portal>
      {(fullScreen || !isDesktop) && <Backdrop open sx={{ zIndex: ZINDEX }} />}

      <Paper
        sx={{
          right: 0,
          bottom: 0,
          borderRadius: 2,
          zIndex: ZINDEX + 1,
          m: `${POSITION}px`,
          position: 'fixed',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: (theme) => theme.customShadows.dropdown,
          ...(fullScreen && {
            m: 0,
            right: POSITION / 2,
            bottom: POSITION / 2,
            width: `calc(100% - ${POSITION}px)`,
            height: `calc(100% - ${POSITION}px)`,
          }),
        }}
      >
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            py: 2,
            pl: 2.5,
            pr: 1,
          }}
        >
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            New Message
          </Typography>

          <IconButton onClick={() => setFullScreen(!fullScreen)}>
            <Iconify icon={fullScreen ? 'eva:collapse-fill' : 'eva:expand-fill'} />
          </IconButton>

          <IconButton onClick={onCloseCompose}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <InputBase placeholder="To" sx={{ px: 2, height: 40 }} />

        <Divider />

        <InputBase placeholder="Subject" sx={{ px: 2, height: 40 }} />

        <Divider />

        <Editor
          simple
          id="compose-mail"
          value={message}
          onChange={handleChangeMessage}
          placeholder="Type a message"
          sx={{ flexGrow: 1, borderColor: 'transparent' }}
        />

        <Divider />

        <Stack direction="row" alignItems="center" sx={{ py: 2, px: 3 }}>
          <Button variant="contained" sx={{ mr: 2 }}>
            Send
          </Button>

          <IconButton>
            <Iconify icon="ic:round-add-photo-alternate" />
          </IconButton>

          <IconButton>
            <Iconify icon="eva:attach-2-fill" />
          </IconButton>
        </Stack>
      </Paper>
    </Portal>
  );
}
