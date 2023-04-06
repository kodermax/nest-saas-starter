// @mui
import { useTheme } from '@mui/material/styles';
//
import { StyledBadgeStatus } from './styles';
import { BadgeStatusProps } from './types';

// ----------------------------------------------------------------------

export default function BadgeStatus({ size = 'medium', status = 'offline', sx }: BadgeStatusProps) {
  const theme = useTheme();

  return <StyledBadgeStatus ownerState={{ status, size }} sx={sx} theme={theme} />;
}
