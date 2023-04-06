import { m } from 'framer-motion';
// @mui
import { styled, useTheme, alpha } from '@mui/material/styles';
import { Box, Grid, Container, Typography, BoxProps, Button } from '@mui/material';
// utils
import { filterStyles, textGradient, bgGradient } from '../../utils/cssStyles';
// routes
import { PATH_FIGMA_PREVIEW } from '../../routes/paths';
// components
import Iconify from '../../components/iconify';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  '&:before': {
    height: 2,
    bottom: -1,
    zIndex: 11,
    content: '""',
    width: '100%',
    position: 'absolute',
    backgroundColor: theme.palette.grey[900],
  },
}));

const StyledWrap = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: alpha(theme.palette.grey[500], 0.08),
}));

const StyledDescription = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 8,
  width: '100%',
  height: '100%',
  textAlign: 'center',
  position: 'absolute',
  paddingTop: theme.spacing(10),
  ...bgGradient({
    startColor: `${theme.palette.background.default} 25%`,
    endColor: alpha(theme.palette.background.default, 0),
  }),
  [theme.breakpoints.up('md')]: {
    background: 'unset',
    position: 'unset',
    textAlign: 'left',
    padding: theme.spacing(25, 0),
  },
}));

const StyledContent = styled(m.img)(({ theme }) => ({
  minHeight: 560,
  [theme.breakpoints.up('md')]: {
    top: 1,
    zIndex: 8,
    minHeight: 'auto',
    position: 'absolute',
    boxShadow: `-40px 80px 80px ${
      theme.palette.mode === 'light'
        ? alpha(theme.palette.grey[500], 0.4)
        : theme.palette.common.black
    }`,
  },
}));

// ----------------------------------------------------------------------

export default function HomeForDesigner() {
  return (
    <StyledRoot>
      <StyledWrap>
        <Container component={MotionViewport} sx={{ position: 'relative' }}>
          <Grid container>
            <Grid item md={6}>
              <Description />
            </Grid>

            <Grid item md={6}>
              <StyledContent src="/assets/images/home/for_designer.jpg" variants={varFade().in} />
            </Grid>
          </Grid>
        </Container>

        <TriangleShape />

        <TriangleShape anchor="bottom" />
      </StyledWrap>
    </StyledRoot>
  );
}

// ----------------------------------------------------------------------

function Description() {
  const theme = useTheme();

  return (
    <StyledDescription>
      <m.div variants={varFade().inUp}>
        <Typography component="div" variant="overline" sx={{ color: 'text.disabled' }}>
          Professional Kit
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography
          variant="h2"
          sx={{
            mt: 3,
            mb: 5,
            ...textGradient(
              `300deg, ${theme.palette.primary.main} 0%, ${theme.palette.warning.main} 100%`
            ),
          }}
        >
          For Designer
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Button
          color="inherit"
          size="large"
          variant="outlined"
          endIcon={<Iconify icon="ic:round-arrow-right-alt" />}
          target="_blank"
          rel="noopener"
          href={PATH_FIGMA_PREVIEW}
          sx={{
            bgcolor: 'text.primary',
            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
            '&:hover': {
              bgcolor: 'text.primary',
            },
          }}
        >
          Go to Figma Workspace
        </Button>
      </m.div>
    </StyledDescription>
  );
}

// ----------------------------------------------------------------------

interface TriangleShapeProps extends BoxProps {
  anchor?: 'top' | 'bottom';
}

function TriangleShape({ anchor = 'top', ...other }: TriangleShapeProps) {
  const theme = useTheme();

  const isLight = theme.palette.mode === 'light';

  return (
    <Box
      sx={{
        top: 0,
        left: 0,
        width: 1,
        position: 'absolute',
        color: 'background.default',
        zIndex: { xs: 0, md: 9 },
        height: { xs: 40, md: 64 },
        ...filterStyles(
          `drop-shadow(320px 20px 80px ${
            isLight ? alpha(theme.palette.grey[700], 0.4) : theme.palette.common.black
          })`
        ),
        ...(anchor === 'bottom' && {
          zIndex: 9,
          bottom: 0,
          top: 'unset',
          color: 'grey.900',
          transform: 'scale(-1)',
          ...filterStyles('none'),
        }),
      }}
      {...other}
    >
      <svg width="100%" height="100%" viewBox="0 0 1440 64" preserveAspectRatio="none">
        <path d="M1440 0H0L1440 64V0Z" fill="currentColor" />
      </svg>
    </Box>
  );
}
