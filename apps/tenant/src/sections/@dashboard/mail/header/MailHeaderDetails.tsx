// next
import { useRouter } from 'next/router';
// @mui
import { Box, Link, Tooltip, Typography, IconButton, Stack, StackProps } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// hooks
import useResponsive from '../../../../hooks/useResponsive';
// utils
import { fDateTime } from '../../../../utils/formatTime';
// @types
import { IMailSender } from '../../../../@types/mail';
// components
import { CustomAvatar } from '../../../../components/custom-avatar';
import Iconify from '../../../../components/iconify';

// ----------------------------------------------------------------------

interface Props extends StackProps {
  mailFrom: IMailSender;
  mailTo: IMailSender[];
  createdAt: Date | string | number;
}

export default function MailHeaderDetails({ mailFrom, mailTo, createdAt, sx, ...other }: Props) {
  const {
    push,
    query: { systemLabel, customLabel },
  } = useRouter();

  const isDesktop = useResponsive('up', 'sm');

  const baseUrl = PATH_DASHBOARD.mail.root;

  const handleBack = () => {
    if (systemLabel) {
      return push(`${baseUrl}/${systemLabel}`);
    }
    if (customLabel) {
      return push(`${baseUrl}/label/${customLabel}`);
    }
    return push(`${baseUrl}/inbox`);
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      flexShrink={0}
      sx={{
        px: 2,
        height: 80,
        borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        ...sx,
      }}
      {...other}
    >
      <Stack direction="row" alignItems="center" flexGrow={1}>
        <Tooltip title="Back">
          <IconButton onClick={handleBack}>
            <Iconify icon="eva:arrow-ios-back-fill" />
          </IconButton>
        </Tooltip>

        <CustomAvatar alt={mailFrom.name} src={mailFrom.avatar || ''} name={mailFrom.name} />

        <Box sx={{ ml: 2 }}>
          <Typography display="inline" variant="subtitle2">
            {mailFrom.name}
          </Typography>

          <Link variant="caption" sx={{ color: 'text.secondary', ml: 0.5 }}>
            {`<${mailFrom.email}>`}
          </Link>

          <Typography variant="caption" component="div" noWrap sx={{ mt: 0.5 }}>
            {`To: `}
            {mailTo.map((person) => (
              <Link color="inherit" key={person.email}>
                {person.email}
              </Link>
            ))}
          </Typography>
        </Box>
      </Stack>

      <Stack direction="row" alignItems="center">
        {isDesktop && (
          <>
            <Typography variant="caption" component="div" sx={{ color: 'text.secondary' }}>
              {fDateTime(createdAt)}
            </Typography>

            <Tooltip title="Reply">
              <IconButton>
                <Iconify icon="ic:round-reply" />
              </IconButton>
            </Tooltip>
          </>
        )}

        <Tooltip title="More options">
          <IconButton>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Stack>
  );
}
