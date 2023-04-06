import { forwardRef } from 'react';
import { AvatarGroup } from '@mui/material';
//
import { CustomAvatarGroupProps } from './types';

// ----------------------------------------------------------------------

const SIZES = {
  tiny: 24,
  small: 32,
  medium: 40,
  large: 56,
};

const CustomAvatarGroup = forwardRef<HTMLDivElement, CustomAvatarGroupProps>(
  ({ size = 'small', compact, max, children, sx, ...other }, ref) => {
    const isTiny = size === 'tiny';

    const isSmall = size === 'small';

    const isMedium = size === 'medium';

    const isLarge = size === 'large';

    const compactStyle = {
      width: 40,
      height: 40,
      position: 'relative',
      '& .MuiAvatarGroup-avatar': {
        m: 0,
        width: 28,
        height: 28,
        position: 'absolute',
        '&:first-of-type': {
          left: 0,
          bottom: 0,
          zIndex: 9,
        },
        '&:last-of-type': {
          top: 0,
          right: 0,
        },
      },
    } as const;

    return (
      <AvatarGroup
        ref={ref}
        max={compact ? 3 : max}
        spacing={((isTiny || isSmall) && 'medium') || 'small'}
        sx={{
          '& .MuiAvatar-root': {
            ...(isLarge && {
              width: SIZES.large,
              height: SIZES.large,
              '&:first-of-type': { fontSize: 16 },
            }),
            ...(isMedium && {
              width: SIZES.medium,
              height: SIZES.medium,
            }),
            ...(isSmall && {
              width: SIZES.small,
              height: SIZES.small,
            }),
            ...(isTiny && {
              width: SIZES.tiny,
              height: SIZES.tiny,
            }),
          },
          ...(compact && { ...compactStyle }),
          ...sx,
        }}
        {...other}
      >
        {children}
      </AvatarGroup>
    );
  }
);

export default CustomAvatarGroup;
