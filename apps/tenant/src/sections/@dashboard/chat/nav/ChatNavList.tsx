// next
import { useRouter } from 'next/router';
// @mui
import { List, SxProps } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useResponsive from '../../../../hooks/useResponsive';
// @types
import { IChatConversationsState } from '../../../../@types/chat';
// components
import { SkeletonConversationItem } from '../../../../components/skeleton';
//
import ChatNavItem from './ChatNavItem';

// ----------------------------------------------------------------------

const CURRENT_USER_ID = '8864c717-587d-472a-929a-8e5f298024da-0';

type Props = {
  conversations: IChatConversationsState;
  openNav: boolean;
  onCloseNav: VoidFunction;
  selected: (conversationId: string) => boolean;
  sx?: SxProps;
};

export default function ChatNavList({
  conversations,
  openNav,
  onCloseNav,
  selected,
  sx,
  ...other
}: Props) {
  const { push } = useRouter();

  const isDesktop = useResponsive('up', 'md');

  const handleSelectConversation = (conversationId: string) => {
    let conversationKey = '';

    const conversation = conversations.byId[conversationId];

    if (conversation.type === 'GROUP') {
      conversationKey = conversation.id;
    } else {
      const otherParticipant = conversation.participants.find(
        (participant) => participant.id !== CURRENT_USER_ID
      );

      if (otherParticipant?.username) {
        conversationKey = otherParticipant?.username;
      }
    }

    push(PATH_DASHBOARD.chat.view(conversationKey));
  };

  const loading = !conversations.allIds.length;

  return (
    <List disablePadding sx={sx} {...other}>
      {(loading ? [...Array(12)] : conversations.allIds).map((conversationId, index) =>
        conversationId ? (
          <ChatNavItem
            key={conversationId}
            openNav={openNav}
            conversation={conversations.byId[conversationId]}
            isSelected={selected(conversationId)}
            onSelect={() => {
              if (!isDesktop) {
                onCloseNav();
              }
              handleSelectConversation(conversationId);
            }}
          />
        ) : (
          <SkeletonConversationItem key={index} />
        )
      )}
    </List>
  );
}
