// @mui
import { Stack, Box, Link, Typography, IconButton } from '@mui/material';
// utils
import { fToNow } from '../../../../utils/formatTime';
// @types
import { IChatParticipant } from '../../../../@types/chat';
// components
import Iconify from '../../../../components/iconify';
import BadgeStatus from '../../../../components/badge-status';
import { CustomAvatar, CustomAvatarGroup } from '../../../../components/custom-avatar';

// ----------------------------------------------------------------------

type Props = {
  participants: IChatParticipant[];
};

export default function ChatHeaderDetail({ participants }: Props) {
  const isGroup = participants.length > 1;

  const participant = participants.length ? participants[0] : null;

  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        p: (theme) => theme.spacing(2, 1, 2, 2),
      }}
    >
      {isGroup ? (
        <Stack flexGrow={1}>
          <CustomAvatarGroup max={3}>
            {participants.map((participant) => (
              <CustomAvatar key={participant.id} alt={participant.name} src={participant.avatar} />
            ))}
          </CustomAvatarGroup>

          <Link
            variant="body2"
            sx={{
              mt: 0.5,
              alignItems: 'center',
              display: 'inline-flex',
              color: 'text.secondary',
            }}
          >
            {participants.length} persons
            <Iconify icon="eva:arrow-ios-forward-fill" width={16} />
          </Link>
        </Stack>
      ) : (
        <Stack flexGrow={1} direction="row" alignItems="center" spacing={2}>
          <CustomAvatar
            src={participant?.avatar}
            alt={participant?.name}
            BadgeProps={{
              badgeContent: <BadgeStatus status={participant?.status} />,
            }}
          />

          <div>
            <Typography variant="subtitle2">{participant?.name}</Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {participant?.status === 'offline' ? (
                participant?.lastActivity && fToNow(participant?.lastActivity)
              ) : (
                <Box component="span" sx={{ textTransform: 'capitalize' }}>
                  {participant?.status}
                </Box>
              )}
            </Typography>
          </div>
        </Stack>
      )}

      <IconButton>
        <Iconify icon="eva:phone-fill" />
      </IconButton>

      <IconButton>
        <Iconify icon="eva:video-fill" />
      </IconButton>

      <IconButton>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
    </Stack>
  );
}
