// next
import Head from 'next/head';
// @mui
import { Box, Link, Stack, Button, Container, Typography, Breadcrumbs } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import MainLayout from '../../../layouts/main';
// components
import Iconify from '../../../components/iconify';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import { Block } from '../../../sections/_examples/Block';

// ----------------------------------------------------------------------

MUIBreadcrumbsPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function MUIBreadcrumbsPage() {
  return (
    <>
      <Head>
        <title> MUI Components: Breadcrumbs | Minimal UI</title>
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
            heading="Breadcrumbs"
            links={[
              {
                name: 'Components',
                href: PATH_PAGE.components,
              },
              { name: 'Breadcrumbs' },
            ]}
            moreLink={['https://mui.com/components/custom-breadcrumbs']}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <Stack spacing={3}>
          <Block
            title="Text"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Breadcrumbs>
              <Link color="inherit" href="#">
                Material-UI
              </Link>
              <Link color="inherit" href="#">
                Core
              </Link>
              <Typography sx={{ color: 'text.primary' }}>Breadcrumb</Typography>
            </Breadcrumbs>
          </Block>

          <Block
            title="With Icon"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <Breadcrumbs>
              <Link color="inherit" href="#" sx={{ display: 'flex', alignItems: 'center' }}>
                <Iconify icon="eva:home-fill" sx={{ mr: 0.5 }} />
                Material-UI
              </Link>
              <Link color="inherit" href="#" sx={{ display: 'flex', alignItems: 'center' }}>
                <Iconify icon="eva:camera-fill" sx={{ mr: 0.5 }} />
                Core
              </Link>
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: 'text.primary',
                }}
              >
                <Iconify icon="eva:bell-fill" sx={{ mr: 0.5 }} />
                Breadcrumb
              </Typography>
            </Breadcrumbs>
          </Block>

          <Block title="Customized">
            <CustomBreadcrumbs
              links={[
                {
                  name: 'Home',
                  href: '#',
                  icon: <Iconify icon="eva:home-fill" />,
                },
                { name: 'Link1', href: '#', icon: <Iconify icon="eva:cube-outline" /> },
                { name: 'Link2', href: '#', icon: <Iconify icon="eva:cube-outline" /> },
                { name: 'Link3', href: '#', icon: <Iconify icon="eva:cube-outline" /> },
                { name: 'Link4', href: '#', icon: <Iconify icon="eva:cube-outline" /> },
                { name: 'Link5', href: '#', icon: <Iconify icon="eva:cube-outline" /> },
              ]}
            />

            <CustomBreadcrumbs
              heading="Heading"
              links={[
                {
                  name: 'Home',
                  href: '#',
                  icon: <Iconify icon="eva:home-fill" />,
                },
                { name: 'Link1', href: '#', icon: <Iconify icon="eva:cube-outline" /> },
                { name: 'Link2', href: '#', icon: <Iconify icon="eva:cube-outline" /> },
                { name: 'Link3', href: '#', icon: <Iconify icon="eva:cube-outline" /> },
                { name: 'Link4', href: '#', icon: <Iconify icon="eva:cube-outline" /> },
                { name: 'Link5', icon: <Iconify icon="eva:cube-outline" /> },
              ]}
              action={
                <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
                  New Product
                </Button>
              }
            />
          </Block>
        </Stack>
      </Container>
    </>
  );
}
