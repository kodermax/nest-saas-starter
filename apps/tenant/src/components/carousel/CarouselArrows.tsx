// @mui
import { useTheme, styled, alpha } from '@mui/material/styles';
import { Stack, StackProps, IconButtonProps, IconButton } from '@mui/material';
//
import { IconifyProps } from '../iconify';
//
import { LeftIcon, RightIcon } from './Icon';

// ----------------------------------------------------------------------

interface StyledIconButtonProps extends IconButtonProps {
  filled?: boolean;
  shape?: 'circular' | 'rounded';
  hasChildren?: boolean;
}

const StyledIconButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== 'filled' && prop !== 'hasChildren' && prop !== 'shape',
})<StyledIconButtonProps>(({ filled, shape, hasChildren, theme }) => ({
  color: 'inherit',
  transition: theme.transitions.create('all', {
    duration: theme.transitions.duration.shorter,
  }),
  ...(shape === 'rounded' && {
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
  }),
  ...(!filled && {
    opacity: 0.48,
    '&:hover': {
      opacity: 1,
    },
  }),
  ...(filled && {
    color: alpha(theme.palette.common.white, 0.8),
    backgroundColor: alpha(theme.palette.grey[900], 0.48),
    '&:hover': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.grey[900],
    },
  }),
  ...(hasChildren && {
    zIndex: 9,
    top: '50%',
    position: 'absolute',
    marginTop: theme.spacing(-2.5),
  }),
}));

// ----------------------------------------------------------------------

interface Props extends StackProps {
  shape?: 'circular' | 'rounded';
  filled?: boolean;
  children?: React.ReactNode;
  icon?: IconifyProps; // Right icon
  onNext?: VoidFunction;
  onPrevious?: VoidFunction;
  leftButtonProps?: IconButtonProps;
  rightButtonProps?: IconButtonProps;
}

export default function CarouselArrows({
  shape = 'circular',
  filled = false,
  icon,
  onNext,
  onPrevious,
  children,
  leftButtonProps,
  rightButtonProps,
  sx,
  ...other
}: Props) {
  const theme = useTheme();

  const isRTL = theme.direction === 'rtl';

  const hasChildren = !!children;

  if (hasChildren) {
    return (
      <Stack sx={sx} {...other}>
        <StyledIconButton
          filled={filled}
          shape={shape}
          hasChildren={!!children}
          onClick={onPrevious}
          {...leftButtonProps}
          sx={{
            left: 16,
            ...leftButtonProps?.sx,
          }}
        >
          <LeftIcon icon={icon} isRTL={isRTL} />
        </StyledIconButton>

        {children}

        <StyledIconButton
          filled={filled}
          shape={shape}
          hasChildren={!!children}
          onClick={onNext}
          {...rightButtonProps}
          sx={{
            right: 16,
            ...rightButtonProps?.sx,
          }}
        >
          <RightIcon icon={icon} isRTL={isRTL} />
        </StyledIconButton>
      </Stack>
    );
  }

  return (
    <Stack direction="row" alignItems="center" display="inline-flex" sx={sx} {...other}>
      <StyledIconButton filled={filled} shape={shape} onClick={onPrevious} {...leftButtonProps}>
        <LeftIcon icon={icon} isRTL={isRTL} />
      </StyledIconButton>

      <StyledIconButton filled={filled} shape={shape} onClick={onNext} {...rightButtonProps}>
        <RightIcon icon={icon} isRTL={isRTL} />
      </StyledIconButton>
    </Stack>
  );
}
