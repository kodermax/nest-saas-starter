import { useState } from 'react';
// @mui
import {
  Box,
  Stack,
  Button,
  Avatar,
  Divider,
  ListItem,
  TextField,
  Typography,
} from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';

// ----------------------------------------------------------------------

type Props = {
  name: string;
  avatarUrl: string;
  message: string;
  tagUser?: string;
  postedAt: Date;
  hasReply?: boolean;
};

export default function BlogPostCommentItem({
  name,
  avatarUrl,
  message,
  tagUser,
  postedAt,
  hasReply,
}: Props) {
  const [openReply, setOpenReply] = useState(false);

  return (
    <>
      <ListItem
        disableGutters
        sx={{
          alignItems: 'flex-start',
          py: 3,
          ...(hasReply && {
            ml: 8,
          }),
        }}
      >
        <Avatar alt={name} src={avatarUrl} sx={{ mr: 2, width: 48, height: 48 }} />

        <Stack>
          <Typography variant="subtitle1"> {name} </Typography>

          <Typography variant="caption" sx={{ color: 'text.disabled' }}>
            {fDate(postedAt)}
          </Typography>

          <Typography variant="body2" sx={{ mt: 1 }}>
            {tagUser && (
              <Box component="strong" sx={{ mr: 0.5 }}>
                @{tagUser}
              </Box>
            )}
            {message}
          </Typography>
        </Stack>

        {!hasReply && (
          <Button
            size="small"
            onClick={() => setOpenReply(!openReply)}
            sx={{ right: 0, position: 'absolute' }}
          >
            Reply
          </Button>
        )}
      </ListItem>

      {openReply && (
        <Box
          sx={{
            mb: 3,
            ml: 'auto',
            width: (theme) => `calc(100% - ${theme.spacing(7)})`,
          }}
        >
          <TextField fullWidth size="small" placeholder="Write comment" />
        </Box>
      )}

      <Divider
        sx={{
          ...(hasReply && {
            ml: 7,
          }),
        }}
      />
    </>
  );
}
