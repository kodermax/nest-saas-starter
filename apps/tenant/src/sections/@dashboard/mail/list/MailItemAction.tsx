// @mui
import { Tooltip, IconButton, Paper, PaperProps } from '@mui/material';
// components
import Iconify from '../../../../components/iconify';

// ----------------------------------------------------------------------

interface Props extends PaperProps {
  onArchive?: VoidFunction;
  onDelete?: VoidFunction;
  onMarkRead?: VoidFunction;
  onHidden?: VoidFunction;
  className?: string;
}

export default function MailItemAction({
  onArchive,
  onDelete,
  onMarkRead,
  onHidden,
  sx,
  ...other
}: Props) {
  const actions = [
    { name: 'Archive', icon: 'eva:archive-fill', action: onArchive },
    { name: 'Delete', icon: 'eva:trash-2-outline', action: onDelete },
    { name: 'Mark Email Read', icon: 'ic:round-mark-email-read', action: onMarkRead },
    { name: 'Hidden Email', icon: 'eva:eye-off-fill', action: onHidden },
  ];

  return (
    <Paper
      variant="outlined"
      sx={{
        top: 12,
        right: 12,
        bottom: 12,
        zIndex: 99,
        opacity: 0,
        display: 'flex',
        position: 'absolute',
        alignItems: 'center',
        boxShadow: (theme) => theme.customShadows.z8,
        transition: (theme) => theme.transitions.create('opacity'),
        ...sx,
      }}
      {...other}
    >
      {actions.map((action) => (
        <Tooltip key={action.name} title={action.name}>
          <IconButton
            size="small"
            onClick={action.action}
            sx={{
              mx: 0.75,
              '&:hover': { color: 'text.primary' },
            }}
          >
            <Iconify icon={action.icon} width={24} />
          </IconButton>
        </Tooltip>
      ))}
    </Paper>
  );
}
