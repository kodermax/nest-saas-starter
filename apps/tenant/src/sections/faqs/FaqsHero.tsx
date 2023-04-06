import { m } from 'framer-motion';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Container, InputAdornment, Stack, TextField } from '@mui/material';
// components
import Iconify from '../../components/iconify';
import { MotionContainer, TextAnimate, varFade } from '../../components/animate';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundImage: 'url(/assets/background/overlay_1.svg), url(/assets/images/faqs/hero.jpg)',
  padding: theme.spacing(10, 0),
  [theme.breakpoints.up('md')]: {
    height: 560,
    padding: 0,
  },
}));

const StyledContent = styled('div')(({ theme }) => ({
  textAlign: 'center',
  [theme.breakpoints.up('md')]: {
    bottom: 80,
    textAlign: 'left',
    position: 'absolute',
  },
}));

// ----------------------------------------------------------------------

export default function FaqsHero() {
  return (
    <StyledRoot>
      <Container component={MotionContainer}>
        <StyledContent>
          <div>
            <TextAnimate text="How" sx={{ color: 'primary.main' }} variants={varFade().inRight} />
            <br />

            <Stack spacing={2} display="inline-flex" direction="row" sx={{ color: 'common.white' }}>
              <TextAnimate text="can" />
              <TextAnimate text="we" />
              <TextAnimate text="help" />
              <TextAnimate text="you?" />
            </Stack>
          </div>

          <m.div variants={varFade().inUp}>
            <TextField
              placeholder="Search support..."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
              sx={{
                mt: 5,
                '& fieldset': { display: 'none' },
                '& .MuiOutlinedInput-root': {
                  width: 280,
                  color: 'common.white',
                  typography: 'subtitle1',
                  border: (theme) => `solid 1px ${alpha(theme.palette.common.white, 0.24)}`,
                  transition: (theme) =>
                    theme.transitions.create(['box-shadow', 'width', 'background-color'], {
                      duration: theme.transitions.duration.shorter,
                    }),
                  '&.Mui-focused': {
                    color: 'grey.800',
                    bgcolor: 'common.white',
                    width: { sm: 320 },
                    boxShadow: (theme) => theme.customShadows.z20,
                  },
                },
              }}
            />
          </m.div>
        </StyledContent>
      </Container>
    </StyledRoot>
  );
}
