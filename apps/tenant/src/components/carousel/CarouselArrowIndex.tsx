// @mui
import { useTheme, styled, Theme } from '@mui/material/styles';
import { Typography, Box, IconButton, SxProps } from '@mui/material';
// utils
import { bgBlur } from '../../utils/cssStyles';
//
import { IconifyProps } from '../iconify';
//
import { LeftIcon, RightIcon } from './Icon';

// ----------------------------------------------------------------------

const StyledRoot = styled(Box)(({ theme }) => ({
  ...bgBlur({
    opacity: 0.48,
    color: theme.palette.grey[900],
  }),
  zIndex: 9,
  display: 'inline-flex',
  alignItems: 'center',
  position: 'absolute',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  padding: theme.spacing(0.25),
  color: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  width: 28,
  height: 28,
  padding: 0,
  opacity: 0.48,
  '&:hover': { opacity: 1 },
}));

// ----------------------------------------------------------------------

type Props = {
  index: number;
  total: number;
  icon?: IconifyProps; // Right icon
  onNext?: VoidFunction;
  onPrevious?: VoidFunction;
  sx?: SxProps<Theme>;
};

export default function CarouselArrowIndex({
  index,
  total,
  onNext,
  onPrevious,
  icon,
  sx,
  ...other
}: Props) {
  const theme = useTheme();

  const isRTL = theme.direction === 'rtl';

  return (
    <StyledRoot sx={sx} {...other}>
      <StyledIconButton color="inherit" onClick={onPrevious}>
        <LeftIcon icon={icon} isRTL={isRTL} />
      </StyledIconButton>

      <Typography variant="subtitle2" component="span" sx={{ mx: 0.25 }}>
        {index + 1}/{total}
      </Typography>

      <StyledIconButton color="inherit" onClick={onNext}>
        <RightIcon icon={icon} isRTL={isRTL} />
      </StyledIconButton>
    </StyledRoot>
  );
}
