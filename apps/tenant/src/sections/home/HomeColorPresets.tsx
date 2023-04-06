import { m } from 'framer-motion';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Stack,
  Radio,
  Tooltip,
  Container,
  Typography,
  RadioGroup,
  CardActionArea,
  FormControlLabel,
} from '@mui/material';
// components
import { useSettingsContext } from '../../components/settings';
import Image from '../../components/image';
import Iconify from '../../components/iconify';
import { MotionViewport, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

// ----------------------------------------------------------------------

export default function HomeColorPresets() {
  return (
    <StyledRoot>
      <Container component={MotionViewport} sx={{ position: 'relative' }}>
        <Description />

        <m.div variants={varFade().inDown}>
          <Options />
        </m.div>

        <Content />
      </Container>
    </StyledRoot>
  );
}

// ----------------------------------------------------------------------

function Description() {
  return (
    <Stack spacing={3} sx={{ textAlign: 'center' }}>
      <m.div variants={varFade().inDown}>
        <Typography component="div" variant="overline" sx={{ color: 'text.disabled' }}>
          choose your style
        </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography variant="h2"> Color presets </Typography>
      </m.div>

      <m.div variants={varFade().inDown}>
        <Typography sx={{ color: 'text.secondary' }}>
          Express your own style with just one click
        </Typography>
      </m.div>
    </Stack>
  );
}

// ----------------------------------------------------------------------

function Content() {
  const { themeColorPresets: color } = useSettingsContext();

  return (
    <Box sx={{ position: 'relative' }}>
      <Image disabledEffect alt="grid" src="/assets/images/home/presets_grid.png" />

      <Box sx={{ position: 'absolute', top: 0 }}>
        <m.div variants={varFade().inUp}>
          <Image
            disabledEffect
            alt="screen"
            src={`/assets/images/home/presets_screen_${color}.png`}
          />
        </m.div>
      </Box>

      <Box sx={{ position: 'absolute', top: 0 }}>
        <m.div variants={varFade().inDown}>
          <m.div animate={{ y: [0, -15, 0] }} transition={{ duration: 8, repeat: Infinity }}>
            <Image
              disabledEffect
              alt="sidebar"
              src={`/assets/images/home/presets_block_${color}.png`}
            />
          </m.div>
        </m.div>
      </Box>

      <Box sx={{ position: 'absolute', top: 0 }}>
        <m.div variants={varFade().inDown}>
          <m.div animate={{ y: [-5, 10, -5] }} transition={{ duration: 8, repeat: Infinity }}>
            <Image
              disabledEffect
              alt="sidebar"
              src={`/assets/images/home/presets_chart_${color}.png`}
            />
          </m.div>
        </m.div>
      </Box>

      <Box sx={{ position: 'absolute', top: 0 }}>
        <m.div variants={varFade().inDown}>
          <m.div animate={{ y: [-25, 5, -25] }} transition={{ duration: 10, repeat: Infinity }}>
            <Image
              disabledEffect
              alt="sidebar"
              src={`/assets/images/home/presets_sidebar_${color}.png`}
            />
          </m.div>
        </m.div>
      </Box>
    </Box>
  );
}

// ----------------------------------------------------------------------

function Options() {
  const { themeColorPresets, onChangeColorPresets, presetsOption } = useSettingsContext();

  return (
    <RadioGroup
      name="themeColorPresets"
      value={themeColorPresets}
      onChange={onChangeColorPresets}
      sx={{ my: 5 }}
    >
      <Stack
        alignItems="center"
        justifyContent="center"
        sx={{
          width: 100,
          height: 88,
          mx: 'auto',
          position: 'relative',
        }}
      >
        {presetsOption.map((color, index) => {
          const { name, value } = color;
          const isSelected = themeColorPresets === name;

          return (
            <Tooltip key={name} title={name}>
              <CardActionArea
                sx={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  position: 'absolute',
                  color: 'common.white',
                  ...(index === 0 && { bottom: 0 }),
                  ...(index === 1 && { left: 19 }),
                  ...(index === 2 && { right: 19 }),
                  ...(index === 3 && { top: 0, left: 0 }),
                  ...(index === 4 && { top: 0 }),
                  ...(index === 5 && { top: 0, right: 0 }),
                }}
              >
                <Box
                  sx={{
                    bgcolor: value,
                    width: 1,
                    height: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: '50%',
                  }}
                >
                  {isSelected && <Iconify icon="eva:color-picker-fill" width={16} />}

                  <FormControlLabel
                    label=""
                    value={name}
                    control={<Radio sx={{ display: 'none' }} />}
                    sx={{
                      top: 0,
                      left: 0,
                      margin: 0,
                      width: 1,
                      height: 1,
                      position: 'absolute',
                    }}
                  />
                </Box>
              </CardActionArea>
            </Tooltip>
          );
        })}
      </Stack>
    </RadioGroup>
  );
}
