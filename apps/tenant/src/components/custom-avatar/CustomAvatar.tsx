import { forwardRef } from 'react';
import { useTheme } from '@mui/material/styles';
import { Badge, Avatar } from '@mui/material';
//
import { CustomAvatarProps } from './types';

// ----------------------------------------------------------------------

const CustomAvatar = forwardRef<HTMLDivElement, CustomAvatarProps>(
  ({ color, name = '', BadgeProps, children, sx, ...other }, ref) => {
    const theme = useTheme();

    const { color: colorByName, name: charAtName } = getColorByName(name);

    const colr = color || colorByName;

    const renderContent =
      colr === 'default' ? (
        <Avatar ref={ref} sx={sx} {...other}>
          {name && charAtName}
          {children}
        </Avatar>
      ) : (
        <Avatar
          ref={ref}
          sx={{
            color: theme.palette[colr]?.contrastText,
            backgroundColor: theme.palette[colr]?.main,
            fontWeight: theme.typography.fontWeightMedium,
            ...sx,
          }}
          {...other}
        >
          {name && charAtName}
          {children}
        </Avatar>
      );

    return BadgeProps ? (
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        {...BadgeProps}
      >
        {renderContent}
      </Badge>
    ) : (
      renderContent
    );
  }
);

export default CustomAvatar;

// ----------------------------------------------------------------------

function getColorByName(name: string) {
  const character = (name: string) => name && name.charAt(0).toUpperCase();

  const color = (name: string) => {
    if (['A', 'N', 'H', 'L', 'Q'].includes(character(name))) return 'primary';
    if (['F', 'G', 'T', 'I', 'J'].includes(character(name))) return 'info';
    if (['K', 'D', 'Y', 'B', 'O'].includes(character(name))) return 'success';
    if (['P', 'E', 'R', 'S', 'U'].includes(character(name))) return 'warning';
    if (['V', 'W', 'X', 'M', 'Z'].includes(character(name))) return 'error';
    return 'default';
  };

  return {
    name: character(name),
    color: color(name),
  } as const;
}
