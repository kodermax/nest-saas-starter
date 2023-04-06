// @mui
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
// components
import Markdown from '../../../../components/markdown';
import Scrollbar from '../../../../components/scrollbar';
// @types
import { IMailAttachment } from '../../../../@types/mail';
//
import MailDetailsReplyInput from './MailDetailsReplyInput';
import MailDetailsAttachments from './MailDetailsAttachments';

// ----------------------------------------------------------------------

const StyledMarkdown = styled('div')(({ theme }) => ({
  '& > p': {
    ...theme.typography.body1,
    marginBottom: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

type Props = {
  subject: string;
  message: string;
  attachments: IMailAttachment[];
};

export default function MailDetails({ subject, message, attachments }: Props) {
  return (
    <>
      <Scrollbar>
        <Box
          sx={{
            p: { xs: 3, md: 5 },
          }}
        >
          <Typography variant="h3" gutterBottom>
            {subject}
          </Typography>

          <StyledMarkdown>
            <Markdown children={message} />
          </StyledMarkdown>
        </Box>
      </Scrollbar>

      {!!attachments.length && <MailDetailsAttachments attachments={attachments} />}

      <MailDetailsReplyInput />
    </>
  );
}
