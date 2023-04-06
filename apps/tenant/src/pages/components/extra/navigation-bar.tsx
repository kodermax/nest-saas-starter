// next
import Head from 'next/head';
// @mui
import { Box, Container, Stack, AppBar, Toolbar, Typography } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// config
import { NAV, HEADER } from '../../../config';
// layouts
import MainLayout from '../../../layouts/main';
// components
import Iconify from '../../../components/iconify';
import {
  NavSectionMini,
  NavSectionVertical,
  NavSectionHorizontal,
} from '../../../components/nav-section';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';

// ----------------------------------------------------------------------

DemoNavigationBarPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function DemoNavigationBarPage() {
  return (
    <>
      <Head>
        <title> Extra Components: Navigation Bar | Minimal UI</title>
      </Head>

      <Box
        sx={{
          pt: 6,
          pb: 1,
          bgcolor: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.800'),
        }}
      >
        <Container>
          <CustomBreadcrumbs
            heading="Navigation Bar"
            links={[
              {
                name: 'Components',
                href: PATH_PAGE.components,
              },
              { name: 'Navigation Bar' },
            ]}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <Stack spacing={2} sx={{ mb: 10 }}>
          <Typography variant="h6"> Nav Horizontal </Typography>
          <AppBar
            position="static"
            component="nav"
            color="default"
            sx={{
              boxShadow: 0,
              top: HEADER.H_DASHBOARD_DESKTOP_OFFSET,
            }}
          >
            <Toolbar>
              <NavSectionHorizontal data={NAV_ITEMS} />
            </Toolbar>
          </AppBar>
        </Stack>

        <Stack direction="row" spacing={5}>
          <Stack spacing={2} sx={{ width: NAV.W_BASE }}>
            <Typography variant="h6"> Nav Vertical </Typography>

            <NavSectionVertical
              data={NAV_ITEMS}
              sx={{
                py: 5,
                borderRadius: 2,
                bgcolor: 'background.paper',
                boxShadow: (theme) => theme.customShadows.z24,
              }}
            />
          </Stack>

          <Stack spacing={2} sx={{ width: NAV.W_DASHBOARD_MINI }}>
            <Typography variant="h6"> Nav Mini </Typography>

            <NavSectionMini
              data={NAV_ITEMS}
              sx={{
                py: 5,
                borderRadius: 2,
                bgcolor: 'background.paper',
                boxShadow: (theme) => theme.customShadows.z24,
              }}
            />
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

const NAV_ITEMS = [
  {
    subheader: 'Marketing',
    items: [
      {
        title: 'Landing',
        path: '#',
        icon: <Iconify icon="carbon:bat" />,
      },
      {
        title: 'Services',
        path: '#',
        icon: <Iconify icon="carbon:cyclist" />,
      },
      {
        title: 'Case Studies',
        path: '#',
        icon: <Iconify icon="carbon:3d-cursor-alt" />,
        children: [
          { title: 'Case Studies', path: '#' },
          { title: 'Case Study', path: '#' },
        ],
      },
      {
        title: 'Blog',
        path: '#',
        icon: <Iconify icon="carbon:3d-mpr-toggle" />,
        children: [
          { title: 'Blog Posts', path: '#' },
          { title: 'Blog Post', path: '#' },
        ],
      },
      {
        title: 'About',
        path: '#',
        icon: <Iconify icon="carbon:airport-01" />,
      },
      {
        title: 'Contact',
        path: '#',
        icon: <Iconify icon="carbon:battery-full" />,
      },
      {
        title: 'Tours',
        path: '#',
        icon: <Iconify icon="carbon:basketball" />,
        children: [
          { title: 'Tours', path: '#' },
          { title: 'Tour', path: '#' },
        ],
      },
      {
        title: 'Checkout',
        path: '#',
        icon: <Iconify icon="carbon:area" />,
        children: [
          { title: 'Checkout', path: '#' },
          { title: 'Checkout Complete', path: '#' },
        ],
      },
    ],
  },
  {
    subheader: 'Travel',
    items: [
      {
        title: 'Level 1',
        path: '#',
        icon: <Iconify icon="carbon:play" />,
        children: [
          { title: 'Level 2.1', path: '#' },
          { title: 'Level 2.2', path: '#' },
          {
            title: 'Level 2.3',
            path: '#',
            children: [
              { title: 'Level 3.1', path: '#' },
              { title: 'Level 3.2', path: '#' },
            ],
          },
        ],
      },
    ],
  },
];
