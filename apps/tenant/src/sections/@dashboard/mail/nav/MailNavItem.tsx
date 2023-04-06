// next
import { useRouter } from 'next/router';
// @mui
import { Typography, ListItemText, ListItemButton } from '@mui/material';
// @config
import { ICON } from '../../../../config';
// hooks
import useActiveLink from '../../../../hooks/useActiveLink';
// @types
import { IMailLabel } from '../../../../@types/mail';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// components
import Iconify, { IconifyProps } from '../../../../components/iconify';

// ----------------------------------------------------------------------

const LABEL_ICONS = {
  all: 'eva:email-fill',
  inbox: 'eva:inbox-fill',
  trash: 'eva:trash-2-outline',
  drafts: 'eva:file-fill',
  spam: 'ic:round-report',
  sent: 'ic:round-send',
  starred: 'eva:star-fill',
  important: 'ic:round-label-important',
  id_social: 'ic:round-label',
  id_promotions: 'ic:round-label',
  id_forums: 'ic:round-label',
};

// ----------------------------------------------------------------------

type Props = {
  label: IMailLabel;
};

export default function MailNavItem({ label, ...other }: Props) {
  const { push } = useRouter();

  const { active } = useActiveLink(linkTo(label));

  const handleClick = () => {
    push(linkTo(label));
  };

  const isUnread = label.unreadCount !== 0;

  const labelIcon = (LABEL_ICONS as Record<string, IconifyProps>)[label.id];

  return (
    <ListItemButton
      onClick={handleClick}
      sx={{
        px: 3,
        height: 48,
        typography: 'body2',
        color: 'text.secondary',
        textTransform: 'capitalize',
        ...(active && {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightMedium',
        }),
      }}
      {...other}
    >
      <Iconify
        icon={labelIcon}
        sx={{
          mr: 2,
          width: ICON.NAV_ITEM,
          height: ICON.NAV_ITEM,
          color: label.color,
        }}
      />

      <ListItemText disableTypography primary={label.name} />

      {isUnread && <Typography variant="caption">{label.unreadCount}</Typography>}
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

const linkTo = (label: IMailLabel) => {
  const baseUrl = PATH_DASHBOARD.mail.root;

  if (label.type === 'system') {
    return `${baseUrl}/${label.id}`;
  }

  if (label.type === 'custom') {
    return `${baseUrl}/label/${label.name}`;
  }

  return baseUrl;
};
