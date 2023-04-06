// @mui
import { Box, ListItemText, ListItemAvatar, ListItemButton } from '@mui/material';
// @types
import { IChatParticipant } from '../../../../@types/chat';
// components
import { CustomAvatar } from '../../../../components/custom-avatar';
import Scrollbar from '../../../../components/scrollbar';
import BadgeStatus from '../../../../components/badge-status';
//
import ChatRoomParticipantInfoDialog from './ChatRoomParticipantInfoDialog';
import ChatRoomCollapseButton from './ChatRoomCollapseButton';

// ----------------------------------------------------------------------

const HEIGHT = 60;

type Props = {
  participants: IChatParticipant[];
  selectUserId: string | null;
  onOpenUserInfo: (id: string | null) => void;
  isCollapse: boolean;
  onCollapse: VoidFunction;
};

export default function ChatRoomGroup({
  participants,
  selectUserId,
  onOpenUserInfo,
  isCollapse,
  onCollapse,
}: Props) {
  return (
    <>
      <ChatRoomCollapseButton isCollapse={isCollapse} onCollapse={onCollapse}>
        In room ({participants.length})
      </ChatRoomCollapseButton>

      <Box
        sx={{
          height: isCollapse ? HEIGHT * 4 : 0,
          transition: (theme) =>
            theme.transitions.create('height', {
              duration: theme.transitions.duration.shorter,
            }),
        }}
      >
        <Scrollbar>
          {participants.map((participant) => (
            <Participant
              key={participant.id}
              participant={participant}
              open={selectUserId === participant.id}
              onOpen={() => onOpenUserInfo(participant.id)}
              onClose={() => onOpenUserInfo(null)}
            />
          ))}
        </Scrollbar>
      </Box>
    </>
  );
}

// ----------------------------------------------------------------------

type ParticipantProps = {
  participant: IChatParticipant;
  open: boolean;
  onClose: VoidFunction;
  onOpen: VoidFunction;
};

function Participant({ participant, open, onClose, onOpen }: ParticipantProps) {
  const { name, avatar, status, role } = participant;

  return (
    <>
      <ListItemButton onClick={onOpen} sx={{ height: HEIGHT, px: 2.5 }}>
        <ListItemAvatar>
          <CustomAvatar
            alt={name}
            src={avatar}
            BadgeProps={{
              badgeContent: <BadgeStatus status={status} />,
            }}
          />
        </ListItemAvatar>

        <ListItemText
          primary={name}
          secondary={role}
          primaryTypographyProps={{ noWrap: true, variant: 'subtitle2' }}
          secondaryTypographyProps={{ noWrap: true }}
        />
      </ListItemButton>

      <ChatRoomParticipantInfoDialog participant={participant} open={open} onClose={onClose} />
    </>
  );
}
