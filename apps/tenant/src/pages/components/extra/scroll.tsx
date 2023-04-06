// next
import Head from 'next/head';
// @mui
import { Box, Card, CardHeader, Container, CardContent } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import MainLayout from '../../../layouts/main';
// components
import Scrollbar from '../../../components/scrollbar';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';

// ----------------------------------------------------------------------

DemoScrollbarPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function DemoScrollbarPage() {
  return (
    <>
      <Head>
        <title> Extra Components: Scrollbar | Minimal UI</title>
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
            heading="Scrollbar"
            links={[
              {
                name: 'Components',
                href: PATH_PAGE.components,
              },
              { name: 'Scrollbar' },
            ]}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <Box
          gap={3}
          display="grid"
          alignItems="flex-start"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
        >
          <Card>
            <CardHeader title="Vertical" />
            <CardContent sx={{ height: 320 }}>
              <Scrollbar>
                Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Quisque ut nisi.
                Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam.
                Vestibulum eu odio. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Cras
                ultricies mi eu turpis hendrerit fringilla. Phasellus consectetuer vestibulum elit.
                Phasellus magna. Nullam tincidunt adipiscing enim. Vestibulum volutpat pretium
                libero. Nullam quis ante. Morbi mollis tellus ac sapien. Donec orci lectus, aliquam
                ut, faucibus non, euismod id, nulla. Pellentesque habitant morbi tristique senectus
                et netus et malesuada fames ac turpis egestas. Fusce ac felis sit amet ligula
                pharetra condimentum. Morbi mattis ullamcorper velit. Vivamus consectetuer hendrerit
                lacus. Nullam quis ante. Praesent turpis. Praesent porttitor, nulla vitae posuere
                iaculis, arcu nisl dignissim dolor, a pretium mi sem ut ipsum. Donec mi odio,
                faucibus at, scelerisque quis, convallis in, nisi. Quisque ut nisi. Suspendisse nisl
                elit, rhoncus eget, elementum ac, condimentum eget, diam. Vestibulum eu odio. Proin
                sapien ipsum, porta a, auctor quis, euismod ut, mi. Cras ultricies mi eu turpis
                hendrerit fringilla. Phasellus consectetuer vestibulum elit. Phasellus magna. Nullam
                tincidunt adipiscing enim. Vestibulum volutpat pretium libero. Nullam quis ante.
                Morbi mollis tellus ac sapien. Donec orci lectus, aliquam ut, faucibus non, euismod
                id, nulla. Pellentesque habitant morbi tristique senectus et netus et malesuada
                fames ac turpis egestas. Fusce ac felis sit amet ligula pharetra condimentum. Morbi
                mattis ullamcorper velit. Vivamus consectetuer hendrerit lacus. Nullam quis ante.
                Praesent turpis. Praesent porttitor, nulla vitae posuere iaculis, arcu nisl
                dignissim dolor, a pretium mi sem ut ipsum.
              </Scrollbar>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Horizontal" />
            <CardContent>
              <Scrollbar>
                <Box sx={{ width: '200%' }}>
                  Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi. Quisque ut nisi.
                  Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum eget, diam.
                  Vestibulum eu odio. Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Cras
                  ultricies mi eu turpis hendrerit fringilla. Phasellus consectetuer vestibulum
                  elit. Phasellus magna. Nullam tincidunt adipiscing enim. Vestibulum volutpat
                  pretium libero. Nullam quis ante. Morbi mollis tellus ac sapien. Donec orci
                  lectus, aliquam ut, faucibus non, euismod id, nulla. Pellentesque habitant morbi
                  tristique senectus et netus et malesuada fames ac turpis egestas. Fusce ac felis
                  sit amet ligula pharetra condimentum. Morbi mattis ullamcorper velit. Vivamus
                  consectetuer hendrerit lacus. Nullam quis ante. Praesent turpis. Praesent
                  porttitor, nulla vitae posuere iaculis, arcu nisl dignissim dolor, a pretium mi
                  sem ut ipsum. Donec mi odio, faucibus at, scelerisque quis, convallis in, nisi.
                  Quisque ut nisi. Suspendisse nisl elit, rhoncus eget, elementum ac, condimentum
                  eget, diam. Vestibulum eu odio. Proin sapien ipsum, porta a, auctor quis, euismod
                  ut, mi. Cras ultricies mi eu turpis hendrerit fringilla. Phasellus consectetuer
                  vestibulum elit. Phasellus magna. Nullam tincidunt adipiscing enim. Vestibulum
                  volutpat pretium libero. Nullam quis ante. Morbi mollis tellus ac sapien. Donec
                  orci lectus, aliquam ut, faucibus non, euismod id, nulla. Pellentesque habitant
                  morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce ac
                  felis sit amet ligula pharetra condimentum. Morbi mattis ullamcorper velit.
                  Vivamus consectetuer hendrerit lacus. Nullam quis ante. Praesent turpis. Praesent
                  porttitor, nulla vitae posuere iaculis, arcu nisl dignissim dolor, a pretium mi
                  sem ut ipsum.
                </Box>
              </Scrollbar>
            </CardContent>
          </Card>
        </Box>
      </Container>
    </>
  );
}
