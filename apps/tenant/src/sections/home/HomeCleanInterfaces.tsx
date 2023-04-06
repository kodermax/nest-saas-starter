import { m } from 'framer-motion';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Container, Typography, Stack } from '@mui/material';
// components
import Image from '../../components/image';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

// ----------------------------------------------------------------------

export default function HomeCleanInterfaces() {
  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <Description />
        <Content />
      </Container>
    </StyledRoot>
  );
}

// ----------------------------------------------------------------------

function Description() {
  return (
    <Stack
      spacing={3}
      sx={{
        maxWidth: 520,
        mx: 'auto',
        zIndex: { md: 9 },
        position: { md: 'absolute' },
        textAlign: { xs: 'center', md: 'left' },
      }}
    >
      <m.div variants={varFade().inUp}>
        <Typography component="div" variant="overline" sx={{ color: 'text.disabled' }}>
          clean & clear
        </Typography>
      </m.div>

      <m.div variants={varFade().inUp}>
        <Typography
          variant="h2"
          sx={{
            textShadow: (theme) =>
              theme.palette.mode === 'light'
                ? 'unset'
                : `4px 4px 16px ${alpha(theme.palette.grey[800], 0.48)}`,
          }}
        >
          Beautiful, modern and clean user interfaces
        </Typography>
      </m.div>
    </Stack>
  );
}

// ----------------------------------------------------------------------

function Content() {
  return (
    <Box sx={{ position: 'relative' }}>
      {[...Array(10)].map((_, index) => (
        <Box
          key={index}
          component={m.div}
          variants={varFade().inUp}
          sx={{
            top: 0,
            left: 0,
            position: 'absolute',
            ...(index === 0 && { zIndex: 8 }),
            ...(index === 9 && { position: 'relative', zIndex: 9 }),
          }}
        >
          <Image
            disabledEffect
            alt={`clean-${index + 1}`}
            src={`/assets/images/home/clean_${index + 1}.png`}
          />
        </Box>
      ))}
    </Box>
  );
}
