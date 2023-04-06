import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { Card, Container, Stack } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import {
  getContacts,
  getConversation,
  getParticipants,
  getConversations,
  addRecipients,
  sendMessage,
  markConversationAsRead,
  resetActiveConversation,
} from '../../../redux/slices/chat';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import { useSettingsContext } from '../../../components/settings';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// @types
import { IChatParticipant, IChatSendMessage } from '../../../@types/chat';
// sections
import ChatNav from './nav/ChatNav';
import ChatRoom from './room/ChatRoom';
import ChatMessageInput from './message/ChatMessageInput';
import ChatMessageList from './message/ChatMessageList';
import ChatHeaderDetail from './header/ChatHeaderDetail';
import ChatHeaderCompose from './header/ChatHeaderCompose';

// ----------------------------------------------------------------------

const CURRENT_USER_ID = '8864c717-587d-472a-929a-8e5f298024da-0';

export default function Chat() {
  const { themeStretch } = useSettingsContext();

  const dispatch = useDispatch();

  const {
    push,
    pathname,
    query: { conversationKey },
  } = useRouter();

  const { contacts, recipients, participants, activeConversationId, conversations } = useSelector(
    (state) => state.chat
  );

  const conversation = useSelector((state) => {
    const { conversations, activeConversationId } = state.chat;

    const conversation = activeConversationId ? conversations.byId[activeConversationId] : null;

    const initState = {
      id: '',
      messages: [],
      participants: [],
      unreadCount: 0,
      type: '',
    };

    if (conversation) {
      return conversation;
    }

    return initState;
  });

  const detailView = !!conversationKey;

  const displayParticipants = participants.filter((item) => item.id !== CURRENT_USER_ID);

  useEffect(() => {
    dispatch(getConversations());
    dispatch(getContacts());
  }, [dispatch]);

  useEffect(() => {
    const getDetails = async () => {
      dispatch(getParticipants(`${conversationKey}`));
      try {
        await dispatch(getConversation(`${conversationKey}`));
      } catch (error) {
        console.error(error);
        push(PATH_DASHBOARD.chat.new);
      }
    };

    if (conversationKey) {
      getDetails();
    } else if (activeConversationId) {
      dispatch(resetActiveConversation());
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationKey]);

  useEffect(() => {
    if (activeConversationId) {
      dispatch(markConversationAsRead(activeConversationId));
    }
  }, [dispatch, activeConversationId]);

  const handleAddRecipients = (recipients: IChatParticipant[]) => {
    dispatch(addRecipients(recipients));
  };

  const handleSendMessage = async (value: IChatSendMessage) => {
    try {
      dispatch(sendMessage(value));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth={themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Chat"
        links={[
          {
            name: 'Dashboard',
            href: PATH_DASHBOARD.root,
          },
          { name: 'Chat' },
        ]}
      />

      <Card sx={{ height: '72vh', display: 'flex' }}>
        <ChatNav conversations={conversations} activeConversationId={activeConversationId} />

        <Stack flexGrow={1}>
          {detailView ? (
            <ChatHeaderDetail participants={displayParticipants} />
          ) : (
            <ChatHeaderCompose
              recipients={recipients}
              contacts={Object.values(contacts.byId)}
              onAddRecipients={handleAddRecipients}
            />
          )}

          <Stack
            direction="row"
            flexGrow={1}
            sx={{
              overflow: 'hidden',
              borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
            }}
          >
            <Stack flexGrow={1}>
              <ChatMessageList conversation={conversation} />

              <ChatMessageInput
                conversationId={activeConversationId}
                onSend={handleSendMessage}
                disabled={
                  pathname === PATH_DASHBOARD.chat.root || pathname === PATH_DASHBOARD.chat.new
                }
              />
            </Stack>

            {detailView && (
              <ChatRoom conversation={conversation} participants={displayParticipants} />
            )}
          </Stack>
        </Stack>
      </Card>
    </Container>
  );
}
