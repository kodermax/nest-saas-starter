import uniq from 'lodash/uniq';
import flatten from 'lodash/flatten';
// @mui
import { Box, Typography, Stack } from '@mui/material';
// utils
import { fDateTime } from '../../../../utils/formatTime';
// @types
import { IChatConversation, IChatAttachment } from '../../../../@types/chat';
// components
import Scrollbar from '../../../../components/scrollbar';
import FileThumbnail from '../../../../components/file-thumbnail';
//
import ChatRoomCollapseButton from './ChatRoomCollapseButton';

// ----------------------------------------------------------------------

type Props = {
  conversation: IChatConversation;
  isCollapse: boolean;
  onCollapse: VoidFunction;
};

export default function ChatRoomAttachments({ conversation, isCollapse, onCollapse }: Props) {
  const totalAttachments = uniq(flatten(conversation.messages.map((item) => item.attachments)));

  return (
    <Stack
      flexGrow={1}
      sx={{
        pb: 2,
        height: 1,
        overflow: 'hidden',
        borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
      }}
    >
      <ChatRoomCollapseButton
        isCollapse={isCollapse && !!totalAttachments.length}
        onCollapse={onCollapse}
        disabled={!totalAttachments.length}
        sx={{
          ...(!isCollapse && {
            borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
          }),
        }}
      >
        Attachments ({totalAttachments.length})
      </ChatRoomCollapseButton>

      <Box
        sx={{
          overflow: 'hidden',
          height: isCollapse ? 1 : 0,
          transition: (theme) =>
            theme.transitions.create('height', {
              duration: theme.transitions.duration.shorter,
            }),
        }}
      >
        <Scrollbar>
          {totalAttachments.map((attachment, index) => (
            <AttachmentItem key={attachment.name + index} attachment={attachment} />
          ))}
        </Scrollbar>
      </Box>
    </Stack>
  );
}

// ----------------------------------------------------------------------

type AttachmentItemProps = {
  attachment: IChatAttachment;
};

function AttachmentItem({ attachment }: AttachmentItemProps) {
  return (
    <Stack direction="row" alignItems="center" sx={{ mt: 2, px: 2.5 }}>
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          width: 40,
          height: 40,
          flexShrink: 0,
          borderRadius: 1,
          overflow: 'hidden',
          position: 'relative',
          backgroundColor: 'background.neutral',
        }}
      >
        <FileThumbnail
          imageView
          file={attachment.preview}
          onDownload={() => console.log('DOWNLOAD')}
          sx={{ width: 28, height: 28 }}
        />
      </Stack>

      <Stack flexGrow={1} sx={{ ml: 1.5, minWidth: 0 }}>
        <Typography variant="body2" noWrap>
          {attachment.name}
        </Typography>

        <Typography noWrap variant="caption" sx={{ color: 'text.secondary', display: 'block' }}>
          {fDateTime(attachment.dateCreated)}
        </Typography>
      </Stack>
    </Stack>
  );
}
