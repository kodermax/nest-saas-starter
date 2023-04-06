import { m } from 'framer-motion';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Container, Typography, Stack, IconButton } from '@mui/material';
// components
import { useSettingsContext } from '../../components/settings';
import SvgColor from '../../components/svg-color';
import Image from '../../components/image';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(10, 0),
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundImage: `url('/assets/background/overlay_4.jpg')`,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(20, 0),
  },
}));

// ----------------------------------------------------------------------

export default function HomeDarkMode() {
  const { themeMode, onToggleMode } = useSettingsContext();

  return (
    <StyledRoot>
      <Container component={MotionViewport}>
        <m.div variants={varFade().inUp}>
          <Typography component="div" variant="overline" sx={{ color: 'primary.main' }}>
            Easy switch between styles.
          </Typography>
        </m.div>

        <m.div variants={varFade().inUp}>
          <Stack spacing={2} direction="row" alignItems="center" display="inline-flex">
            <Typography variant="h2" sx={{ my: 3, color: 'common.white' }}>
              Dark mode
            </Typography>

            <IconButton color={themeMode === 'dark' ? 'warning' : 'default'} onClick={onToggleMode}>
              <SvgColor
                src={`/assets/icons/setting/ic_${themeMode === 'light' ? 'moon' : 'sun'}.svg`}
              />
            </IconButton>
          </Stack>
        </m.div>

        <m.div variants={varFade().inUp}>
          <Typography sx={{ color: 'grey.500' }}>
            A dark theme that feels easier on the eyes.
          </Typography>
        </m.div>

        <m.div variants={varFade().inUp}>
          <Image
            alt="darkmode"
            src="/assets/images/home/darkmode.jpg"
            sx={{
              borderRadius: 2,
              my: { xs: 5, md: 10 },
              boxShadow: (theme) => `-40px 40px 80px ${alpha(theme.palette.common.black, 0.24)}`,
            }}
          />
        </m.div>
      </Container>
    </StyledRoot>
  );
}
