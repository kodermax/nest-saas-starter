import { useState, useEffect } from 'react';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Drawer, IconButton, IconButtonProps } from '@mui/material';
// hooks
import useResponsive from '../../../../hooks/useResponsive';
// @types
import { IChatConversation, IChatParticipant } from '../../../../@types/chat';
// components
import Iconify from '../../../../components/iconify';
//
import ChatRoomAttachments from './ChatRoomAttachments';
import ChatRoomSingle from './ChatRoomSingle';
import ChatRoomGroup from './ChatRoomGroup';

// ----------------------------------------------------------------------

const StyledToggleButton = styled((props) => (
  <IconButton disableRipple {...props} />
))<IconButtonProps>(({ theme }) => ({
  right: 0,
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  top: theme.spacing(1),
  boxShadow: theme.customShadows.z8,
  backgroundColor: theme.palette.background.paper,
  border: `solid 1px ${theme.palette.divider}`,
  borderRight: 0,
  borderRadius: `12px 0 0 12px`,
  transition: theme.transitions.create('all'),
  '&:hover': {
    backgroundColor: theme.palette.background.neutral,
  },
}));

// ----------------------------------------------------------------------

const NAV_WIDTH = 240;

type Props = {
  conversation: IChatConversation;
  participants: IChatParticipant[];
};

export default function ChatRoom({ conversation, participants }: Props) {
  const theme = useTheme();

  const isDesktop = useResponsive('up', 'lg');

  const [openNav, setOpenNav] = useState(true);

  const [openInfo, setOpenInfo] = useState(true);

  const [openAttachments, setOpenAttachments] = useState(true);

  const [openParticipants, setOpenParticipants] = useState(true);

  const [selectUser, setSelectUser] = useState<string | null>(null);

  const onOpenNav = () => {
    setOpenNav(true);
  };

  const onCloseNav = () => {
    setOpenNav(false);
  };

  const isGroup = participants.length > 1;

  useEffect(() => {
    if (!isDesktop) {
      onCloseNav();
    } else {
      onOpenNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDesktop]);

  const renderContent = (
    <>
      {isGroup ? (
        <ChatRoomGroup
          selectUserId={selectUser}
          participants={participants}
          isCollapse={openParticipants}
          onCollapse={() => setOpenParticipants(!openParticipants)}
          onOpenUserInfo={(participantId) => setSelectUser(participantId)}
        />
      ) : (
        <ChatRoomSingle
          participant={participants[0]}
          isCollapse={openInfo}
          onCollapse={() => setOpenInfo(!openInfo)}
        />
      )}

      <ChatRoomAttachments
        conversation={conversation}
        isCollapse={openAttachments}
        onCollapse={() => setOpenAttachments(!openAttachments)}
      />
    </>
  );

  return (
    <Box sx={{ position: 'relative' }}>
      <StyledToggleButton
        onClick={() => setOpenNav(!openNav)}
        sx={{
          ...(openNav &&
            isDesktop && {
              right: NAV_WIDTH,
            }),
        }}
      >
        <Iconify
          width={16}
          icon={openNav ? 'eva:arrow-ios-forward-fill' : 'eva:arrow-ios-back-fill'}
        />
      </StyledToggleButton>

      {isDesktop ? (
        <Drawer
          open={openNav}
          anchor="right"
          variant="persistent"
          PaperProps={{
            sx: {
              width: 1,
              position: 'static',
            },
          }}
          sx={{
            height: 1,
            width: NAV_WIDTH,
            transition: theme.transitions.create('width'),
            ...(!openNav && {
              width: 0,
            }),
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          anchor="right"
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{ keepMounted: true }}
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
