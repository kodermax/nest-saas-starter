// next
import { useRouter } from 'next/router';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Tooltip, Typography, Checkbox, Stack, TypographyProps } from '@mui/material';
// hooks
import useResponsive from '../../../../hooks/useResponsive';
// utils
import { fDate } from '../../../../utils/formatTime';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// @types
import { IMail, IMailLabel } from '../../../../@types/mail';
// components
import Label from '../../../../components/label';
import { CustomAvatar } from '../../../../components/custom-avatar';
import Iconify from '../../../../components/iconify';
//
import MailItemAction from './MailItemAction';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  padding: theme.spacing(0, 2),
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.neutral,
  borderBottom: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    alignItems: 'center',
  },
  '&:hover': {
    zIndex: 9,
    position: 'relative',
    boxShadow: theme.customShadows.z24,
    '& #mailActions': { opacity: 1 },
  },
}));

const StyledContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  cursor: 'pointer',
  padding: theme.spacing(2, 0),
  transition: theme.transitions.create('padding'),
  [theme.breakpoints.up('md')]: {
    flexGrow: 1,
    minWidth: 0,
    alignItems: 'center',
  },
}));

const StyledName = styled((props: TypographyProps) => (
  <Typography component="span" noWrap {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  marginRight: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    width: 160,
    flexShrink: 0,
  },
}));

const StyledTextContent = styled((props: TypographyProps) => (
  <Typography component="span" noWrap {...props} />
))(({ theme }) => ({
  ...theme.typography.body2,
  marginRight: theme.spacing(2),
  flexGrow: 1,
}));

const StyledCreateDate = styled('div')(({ theme }) => ({
  ...theme.typography.caption,
  [theme.breakpoints.up('md')]: {
    width: 96,
    flexShrink: 0,
    textAlign: 'right',
  },
}));

const StyledAttachmentIcon = styled(Iconify)(({ theme }) => ({
  top: 16,
  right: 16,
  zIndex: 9,
  position: 'absolute',
  [theme.breakpoints.up('md')]: {
    flexShrink: 0,
    position: 'unset',
    marginLeft: theme.spacing(2),
  },
}));

// ----------------------------------------------------------------------

type Props = {
  mail: IMail;
  dense: boolean;
  selected: boolean;
  onDeselect: VoidFunction;
  onSelect: VoidFunction;
  getLabel: (labelId: string) => IMailLabel;
};

export default function MailItem({
  mail,
  dense,
  selected,
  onSelect,
  onDeselect,
  getLabel,
  ...other
}: Props) {
  const { push, query: params } = useRouter();

  const isDesktop = useResponsive('up', 'md');

  const isAttached = !!mail.attachments.length;

  const isUnread = !mail.isUnread;

  const handleChangeCheckbox = (checked: boolean) => (checked ? onSelect() : onDeselect());

  const handleClick = () => {
    push(linkTo(params, mail.id));
  };

  return (
    <StyledRoot
      sx={{
        ...(selected && {
          bgcolor: 'action.selected',
        }),
        ...(isUnread && {
          color: 'text.primary',
          bgcolor: 'background.paper',
        }),
      }}
      {...other}
    >
      {isDesktop && (
        <Stack direction="row" alignItems="center" sx={{ mr: 2 }}>
          <Checkbox
            checked={selected}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleChangeCheckbox(event.target.checked)
            }
          />

          <Tooltip title="Starred">
            <Checkbox
              color="warning"
              defaultChecked={mail.isStarred}
              icon={<Iconify icon="eva:star-outline" />}
              checkedIcon={<Iconify icon="eva:star-fill" />}
            />
          </Tooltip>

          <Tooltip title="Important">
            <Checkbox
              color="warning"
              defaultChecked={mail.isImportant}
              checkedIcon={<Iconify icon="ic:round-label-important" />}
              icon={<Iconify icon="ic:round-label-important" />}
            />
          </Tooltip>
        </Stack>
      )}

      <StyledContainer
        onClick={handleClick}
        sx={{
          ...(dense && {
            py: 1,
          }),
        }}
      >
        <CustomAvatar
          alt={mail.from.name}
          src={mail.from.avatar || ''}
          name={mail.from.name}
          sx={{ width: 32, height: 32, mr: 2 }}
        />

        <Stack
          flexGrow={1}
          alignItems={{ md: 'center' }}
          flexDirection={{ xs: 'column', md: 'row' }}
          sx={{ minWidth: 0 }}
        >
          <StyledName
            sx={{
              ...(isUnread && {
                fontWeight: 'fontWeightBold',
              }),
            }}
          >
            {mail.from.name}
          </StyledName>

          <StyledTextContent>
            <Box
              component="span"
              sx={{
                ...(isUnread && {
                  fontWeight: 'fontWeightBold',
                }),
              }}
            >
              {mail.subject}
            </Box>

            {` - `}

            <Box
              component="span"
              sx={{
                ...(isUnread && {
                  color: 'text.secondary',
                }),
              }}
            >
              {mail.message}
            </Box>
          </StyledTextContent>

          {isDesktop && (
            <Stack direction="row" spacing={1}>
              {mail.labelIds.map((labelId) => {
                const label = getLabel(labelId);

                if (!label) {
                  return null;
                }

                return (
                  <Label
                    key={label.id}
                    sx={{
                      bgcolor: label.color,
                      color: (theme) => theme.palette.getContrastText(label.color || ''),
                    }}
                  >
                    {label.name}
                  </Label>
                );
              })}
            </Stack>
          )}

          {isAttached && <StyledAttachmentIcon icon="eva:attach-2-fill" />}

          <StyledCreateDate
            sx={{
              ...(isUnread && {
                fontWeight: 'fontWeightBold',
              }),
            }}
          >
            {fDate(mail.createdAt)}
          </StyledCreateDate>
        </Stack>
      </StyledContainer>

      <MailItemAction
        id="mailActions"
        onArchive={() => console.log('ARCHIVE', mail.id)}
        onDelete={() => console.log('DELETE', mail.id)}
        onMarkRead={() => console.log('MARKREAD', mail.id)}
        onHidden={() => console.log('HIDDEN', mail.id)}
      />
    </StyledRoot>
  );
}

// ----------------------------------------------------------------------

const linkTo = (
  params: {
    [key: string]: string | string[] | undefined;
  },
  mailId: string
) => {
  const { systemLabel, customLabel } = params;

  const baseUrl = PATH_DASHBOARD.mail.root;

  if (systemLabel) {
    return `${baseUrl}/${systemLabel}/${mailId}`;
  }

  if (customLabel) {
    return `${baseUrl}/label/${customLabel}/${mailId}`;
  }

  return baseUrl;
};
