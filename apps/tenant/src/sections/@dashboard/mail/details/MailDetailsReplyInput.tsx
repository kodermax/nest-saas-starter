import { useRef, useState } from 'react';
// @mui
import { Button, IconButton, InputBase, Stack } from '@mui/material';
// components
import Iconify from '../../../../components/iconify';

// ----------------------------------------------------------------------

export default function MailDetailsReplyInput() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState('');

  const handleChangeMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleClickAttach = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <InputBase
        fullWidth
        multiline
        minRows={2}
        maxRows={8}
        value={message}
        placeholder="Type a message"
        onChange={handleChangeMessage}
        sx={{
          p: 2,
          borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      />

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={{
          p: (theme) => theme.spacing(0, 3, 3, 0),
        }}
      >
        <IconButton size="small" onClick={handleClickAttach}>
          <Iconify icon="ic:round-add-photo-alternate" />
        </IconButton>

        <IconButton size="small" onClick={handleClickAttach}>
          <Iconify icon="eva:attach-2-fill" />
        </IconButton>

        <Button variant="contained" sx={{ ml: 2 }}>
          Send
        </Button>
      </Stack>

      <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
    </>
  );
}
