import { formatDistanceToNowStrict } from 'date-fns';
// @mui
import {
  Badge,
  Stack,
  Typography,
  ListItemText,
  ListItemButton,
  ListItemAvatar,
} from '@mui/material';
// @types
import { IChatConversation } from '../../../../@types/chat';
// components
import { CustomAvatar, CustomAvatarGroup } from '../../../../components/custom-avatar';
import BadgeStatus from '../../../../components/badge-status';

// ----------------------------------------------------------------------

const CURRENT_USER_ID = '8864c717-587d-472a-929a-8e5f298024da-0';

type Props = {
  conversation: IChatConversation;
  openNav: boolean;
  isSelected: boolean;
  onSelect: VoidFunction;
};

export default function ChatNavItem({ conversation, openNav, isSelected, onSelect }: Props) {
  const details = getDetails(conversation, CURRENT_USER_ID);

  const lastActivity = conversation.messages[conversation.messages.length - 1].createdAt;

  const isGroup = details.otherParticipants.length > 1;

  const isUnread = conversation.unreadCount > 0;

  const hasOnlineInGroup =
    isGroup && details.otherParticipants.map((item) => item.status).includes('online');

  return (
    <ListItemButton
      disableGutters
      onClick={onSelect}
      sx={{
        py: 1.5,
        px: 2.5,
        ...(isSelected && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        {isGroup ? (
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={hasOnlineInGroup && <BadgeStatus status="online" />}
          >
            <CustomAvatarGroup compact sx={{ width: 48, height: 48 }}>
              {details.otherParticipants.slice(0, 2).map((participant) => (
                <CustomAvatar
                  key={participant.id}
                  alt={participant.name}
                  src={participant.avatar}
                />
              ))}
            </CustomAvatarGroup>
          </Badge>
        ) : (
          <CustomAvatar
            key={details.otherParticipants[0].id}
            alt={details.otherParticipants[0].name}
            src={details.otherParticipants[0].avatar}
            BadgeProps={{
              badgeContent: <BadgeStatus status={details.otherParticipants[0].status} />,
            }}
            sx={{ width: 48, height: 48 }}
          />
        )}
      </ListItemAvatar>

      {openNav && (
        <>
          <ListItemText
            primary={details.displayNames}
            primaryTypographyProps={{ noWrap: true, variant: 'subtitle2' }}
            secondary={details.displayText}
            secondaryTypographyProps={{
              noWrap: true,
              variant: isUnread ? 'subtitle2' : 'body2',
              color: isUnread ? 'text.primary' : 'text.secondary',
            }}
          />

          <Stack alignItems="flex-end" sx={{ ml: 2, height: 44 }}>
            <Typography
              noWrap
              variant="body2"
              component="span"
              sx={{
                mb: 1.5,
                fontSize: 12,
                color: 'text.disabled',
              }}
            >
              {formatDistanceToNowStrict(new Date(lastActivity), {
                addSuffix: false,
              })}
            </Typography>

            {isUnread && <BadgeStatus status="unread" size="small" />}
          </Stack>
        </>
      )}
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

const getDetails = (conversation: IChatConversation, currentUserId: string) => {
  const otherParticipants = conversation.participants.filter(
    (participant) => participant.id !== currentUserId
  );

  const displayNames = otherParticipants.map((participant) => participant.name).join(', ');

  let displayText = '';

  const lastMessage = conversation.messages[conversation.messages.length - 1];
  if (lastMessage) {
    const sender = lastMessage.senderId === currentUserId ? 'You: ' : '';

    const message = lastMessage.contentType === 'image' ? 'Sent a photo' : lastMessage.body;

    displayText = `${sender}${message}`;
  }
  return { otherParticipants, displayNames, displayText };
};
