// @mui
import { Box, Stack } from '@mui/material';
// @types
import { IMailAttachment } from '../../../../@types/mail';
// components
import Scrollbar from '../../../../components/scrollbar';
import FileThumbnail from '../../../../components/file-thumbnail';

// ----------------------------------------------------------------------

type Props = {
  attachments: IMailAttachment[];
};

export default function MailDetailsAttachments({ attachments }: Props) {
  return (
    <Box
      sx={{
        p: 2,
        bgcolor: 'background.neutral',
        borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
      }}
    >
      <Scrollbar>
        <Stack direction="row" spacing={1}>
          {attachments.map((file) => (
            <FileItem key={file.name} file={file} />
          ))}
        </Stack>
      </Scrollbar>
    </Box>
  );
}

// ----------------------------------------------------------------------

type FileItemProps = {
  file: IMailAttachment;
};

function FileItem({ file }: FileItemProps) {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        width: 56,
        height: 56,
        borderRadius: 1,
        overflow: 'hidden',
        position: 'relative',
        bgcolor: 'background.paper',
      }}
    >
      <FileThumbnail tooltip file={file.preview} onDownload={() => console.log('DOWNLOAD')} />
    </Stack>
  );
}
