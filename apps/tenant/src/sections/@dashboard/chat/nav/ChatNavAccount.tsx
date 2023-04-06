import { useState } from 'react';
// @mui
import {
  List,
  Stack,
  Select,
  Divider,
  Tooltip,
  MenuItem,
  Typography,
  IconButton,
} from '@mui/material';
// auth
import { useAuthContext } from '../../../../auth/useAuthContext';
// components
import Iconify from '../../../../components/iconify';
import { CustomAvatar } from '../../../../components/custom-avatar';
import MenuPopover from '../../../../components/menu-popover';
import BadgeStatus, { BadgeStatusValue } from '../../../../components/badge-status';

// ----------------------------------------------------------------------

const STATUS = ['online', 'invisible', 'away'] as const;

export default function ChatNavAccount() {
  const { user } = useAuthContext();

  const [status, setStatus] = useState<BadgeStatusValue>('online');

  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };

  return (
    <>
      <CustomAvatar
        src={user?.photoURL}
        alt={user?.displayName}
        name={user?.displayName}
        BadgeProps={{
          badgeContent: <BadgeStatus status={status} />,
        }}
        onClick={handleOpenPopover}
        sx={{ cursor: 'pointer', width: 48, height: 48 }}
      />

      <MenuPopover open={openPopover} onClose={handleClosePopover} arrow="top-left" sx={{ p: 0 }}>
        <Stack direction="row" alignItems="center" spacing={2} sx={{ py: 2, pr: 1, pl: 2.5 }}>
          <div>
            <Typography noWrap variant="subtitle2">
              {user?.displayName}
            </Typography>

            <Typography noWrap variant="body2" sx={{ color: 'text.secondary' }}>
              {user?.email}
            </Typography>
          </div>

          <Tooltip title="Log out">
            <IconButton color="error">
              <Iconify icon="ic:round-power-settings-new" />
            </IconButton>
          </Tooltip>
        </Stack>

        <Divider />

        <List sx={{ px: 1 }}>
          <MenuItem>
            <BadgeStatus size="large" status={status} sx={{ m: 0.5, flexShrink: 0 }} />

            <Select
              native
              fullWidth
              value={status}
              onChange={(event) => setStatus(event.target.value)}
              sx={{
                '& .MuiInputBase-input': {
                  p: 0,
                  pl: 2,
                  typography: 'body2',
                  textTransform: 'capitalize',
                },
                '& .MuiNativeSelect-icon': {
                  right: -16,
                  top: 'unset',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  display: 'none',
                },
              }}
            >
              {STATUS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </MenuItem>

          <MenuItem>
            <Iconify icon="ic:round-account-box" />
            Profile
          </MenuItem>

          <MenuItem>
            <Iconify icon="eva:settings-2-fill" />
            Settings
          </MenuItem>
        </List>
      </MenuPopover>
    </>
  );
}
