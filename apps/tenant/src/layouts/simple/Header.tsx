// next
import NextLink from 'next/link';
// @mui
import { useTheme } from '@mui/material/styles';
import { AppBar, Toolbar, Box, BoxProps, Link } from '@mui/material';
// config
import { HEADER } from '../../config';
// utils
import { bgBlur } from '../../utils/cssStyles';
// routes
import { PATH_PAGE } from '../../routes/paths';
// components
import Logo from '../../components/logo';

// ----------------------------------------------------------------------

type Props = {
  isOffset: boolean;
};

export default function Header({ isOffset }: Props) {
  const theme = useTheme();

  return (
    <AppBar color="transparent" sx={{ boxShadow: 0 }}>
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_MAIN_DESKTOP,
          },
          transition: theme.transitions.create(['height', 'background-color'], {
            easing: theme.transitions.easing.easeInOut,
            duration: theme.transitions.duration.shorter,
          }),
          ...(isOffset && {
            ...bgBlur({ color: theme.palette.background.default }),
            height: {
              md: HEADER.H_MAIN_DESKTOP - 16,
            },
          }),
        }}
      >
        <Logo />

        <NextLink href={PATH_PAGE.faqs} passHref>
          <Link variant="subtitle2" color="inherit">
            Need Help?
          </Link>
        </NextLink>
      </Toolbar>

      {isOffset && <Shadow />}
    </AppBar>
  );
}

// ----------------------------------------------------------------------

function Shadow({ sx, ...other }: BoxProps) {
  return (
    <Box
      sx={{
        left: 0,
        right: 0,
        bottom: 0,
        height: 24,
        zIndex: -1,
        m: 'auto',
        borderRadius: '50%',
        position: 'absolute',
        width: `calc(100% - 48px)`,
        boxShadow: (theme) => theme.customShadows.z8,
        ...sx,
      }}
      {...other}
    />
  );
}
