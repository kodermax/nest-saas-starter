// @mui
import { styled } from '@mui/material/styles';
import { Typography, CardProps, Stack } from '@mui/material';
// utils
import { bgGradient } from '../../../../utils/cssStyles';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  overflow: 'hidden',
  position: 'relative',
  color: theme.palette.primary.darker,
  borderRadius: Number(theme.shape.borderRadius) * 2,
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
}));

const StyledBg = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: -1,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: theme.palette.common.white,
  '&:before': {
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -2,
    content: '""',
    opacity: 0.2,
    ...bgGradient({
      direction: '135deg',
      startColor: theme.palette.primary.light,
      endColor: theme.palette.primary.main,
    }),
  },
}));

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  description?: string;
  img?: React.ReactNode;
  action?: React.ReactNode;
}

export default function AppWelcome({ title, description, action, img, ...other }: Props) {
  return (
    <StyledRoot {...other}>
      <Stack
        flexGrow={1}
        justifyContent="center"
        alignItems={{ xs: 'center', md: 'flex-start' }}
        sx={{
          pl: 5,
          py: { xs: 5, md: 0 },
          pr: { xs: 5, md: 0 },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Typography paragraph variant="h4" sx={{ whiteSpace: 'pre-line' }}>
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            opacity: 0.8,
            mb: { xs: 3, xl: 5 },
          }}
        >
          {description}
        </Typography>

        {action && action}
      </Stack>

      {img && img}

      <StyledBg />
    </StyledRoot>
  );
}
