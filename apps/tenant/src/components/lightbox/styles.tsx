// @mui
import { useTheme, alpha } from '@mui/material/styles';
import { GlobalStyles } from '@mui/material';

// ----------------------------------------------------------------------

export default function StyledLightbox() {
  const theme = useTheme();

  const ICON_SIZE = 28;

  const ICON_COLOR = theme.palette.grey[500].replace('#', '');

  const ICON_COLOR_HOVER = theme.palette.common.white.replace('#', '');

  const icon = (name: string) => {
    const common = {
      width: 40,
      height: 40,
      backgroundSize: ICON_SIZE,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center center',
      transition: theme.transitions.create('background'),
    };
    return {
      background: `url('https://api.iconify.design/carbon/${name}.svg?color=%23${ICON_COLOR}')`,
      ...common,
      '&:hover': {
        background: `url('https://api.iconify.design/carbon/${name}.svg?color=%23${ICON_COLOR_HOVER}')`,
        ...common,
      },
    };
  };

  const inputGlobalStyles = (
    <GlobalStyles
      styles={{
        '.react-lightbox': {
          '&.ril__outer': {
            backgroundColor: alpha(theme.palette.grey[900], 0.9),
          },
          '.ril__toolbar': {
            backgroundColor: 'transparent',
            justifyContent: 'flex-start',
          },
          '.ril__toolbarRightSide': {
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
          },
          '.ril__toolbarItem': {
            display: 'inline-flex',
            '&:first-of-type': {
              flexGrow: 1,
            },
            '&:not(:first-of-type)': {
              marginLeft: theme.spacing(1),
            },
          },
          '.ril__zoomInButton': icon('zoom-in'),
          '.ril__zoomOutButton': icon('zoom-out'),
          '.ril__closeButton': icon('close'),
          '.ril__navButtonNext': icon('arrow-right'),
          '.ril__navButtonPrev': icon('arrow-left'),
        },
      }}
    />
  );

  return inputGlobalStyles;
}
