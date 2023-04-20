// @mui
import { BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

export type BadgeStatusValue =
  | 'away'
  | 'busy'
  | 'unread'
  | 'online'
  | 'offline'
  | 'invisible'
  | string;

export type BadgeSizeValue = 'small' | 'medium' | 'large';

export interface BadgeStatusProps extends BoxProps {
  size?: BadgeSizeValue;
  status?: BadgeStatusValue;
}
