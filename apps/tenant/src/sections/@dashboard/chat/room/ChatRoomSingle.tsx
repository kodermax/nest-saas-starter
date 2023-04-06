// @mui
import { Avatar, Divider, Collapse, Typography, Stack } from '@mui/material';
// @types
import { IChatParticipant } from '../../../../@types/chat';
// components
import Iconify from '../../../../components/iconify';
//
import ChatRoomCollapseButton from './ChatRoomCollapseButton';

// ----------------------------------------------------------------------

type Props = {
  participant: IChatParticipant;
  isCollapse: boolean;
  onCollapse: VoidFunction;
};

export default function ChatRoomSingle({ participant, isCollapse, onCollapse }: Props) {
  if (!participant) {
    return null;
  }

  return (
    <div>
      <Stack alignItems="center" sx={{ py: 4 }}>
        <Avatar
          alt={participant.name}
          src={participant.avatar}
          sx={{ width: 96, height: 96, mb: 2 }}
        />

        <Typography variant="subtitle1">{participant.name}</Typography>

        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
          {participant.role}
        </Typography>
      </Stack>

      <Divider />

      <ChatRoomCollapseButton isCollapse={isCollapse} onCollapse={onCollapse}>
        information
      </ChatRoomCollapseButton>

      <Collapse in={isCollapse}>
        <Stack
          spacing={2}
          sx={{
            p: (theme) => theme.spacing(2, 2.5, 2.5, 2.5),
          }}
        >
          {[
            { icon: 'eva:pin-fill', value: participant.address },
            { icon: 'eva:phone-fill', value: participant.phone },
            { icon: 'eva:email-fill', value: participant.email },
          ].map((row, index) => (
            <Stack key={row.icon} direction="row">
              <Iconify
                icon={row.icon}
                sx={{
                  mr: 1,
                  mt: 0.5,
                  flexShrink: 0,
                  color: 'text.disabled',
                }}
              />
              <Typography variant="body2" noWrap={index === 2}>
                {row.value}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Collapse>
    </div>
  );
}
