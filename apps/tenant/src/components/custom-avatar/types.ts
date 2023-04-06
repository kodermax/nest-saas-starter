// @mui
import { BadgeProps, AvatarProps, AvatarGroupProps } from '@mui/material';

// ----------------------------------------------------------------------

export interface CustomAvatarProps extends AvatarProps {
  color?: 'default' | 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
  name?: string;
  BadgeProps?: BadgeProps;
}

export interface CustomAvatarGroupProps extends AvatarGroupProps {
  size?: 'tiny' | 'small' | 'medium' | 'large';
  compact?: boolean;
}
