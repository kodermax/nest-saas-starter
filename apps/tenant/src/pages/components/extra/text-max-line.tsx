// next
import Head from 'next/head';
// @mui
import Masonry from '@mui/lab/Masonry';
import { Box, Card, CardHeader, Container, CardContent } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import MainLayout from '../../../layouts/main';
// components
import TextMaxLine from '../../../components/text-max-line';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';

// ----------------------------------------------------------------------

DemoTextMaxLinePage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function DemoTextMaxLinePage() {
  return (
    <>
      <Head>
        <title> Extra Components: Text Max Line | Minimal UI</title>
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
            heading="TextMaxLine"
            links={[
              {
                name: 'Components',
                href: PATH_PAGE.components,
              },
              { name: 'TextMaxLine' },
            ]}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <Masonry columns={3} spacing={3}>
          <Card>
            <CardHeader title="1 Line" />
            <CardContent>
              <TextMaxLine line={1}>
                Donec posuere vulputate arcu. Fusce vulputate eleifend sapien. Phasellus magna.
                Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Suspendisse faucibus, nunc
                et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id
                tortor.
              </TextMaxLine>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="2 Line" />
            <CardContent>
              <TextMaxLine>
                Donec posuere vulputate arcu. Fusce vulputate eleifend sapien. Phasellus magna.
                Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Suspendisse faucibus, nunc
                et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id
                tortor.
              </TextMaxLine>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="3 Line" />
            <CardContent>
              <TextMaxLine line={3}>
                Donec posuere vulputate arcu. Fusce vulputate eleifend sapien. Phasellus magna.
                Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Suspendisse faucibus, nunc
                et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id
                tortor.
              </TextMaxLine>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="4 Line" />
            <CardContent>
              <TextMaxLine line={4}>
                Donec posuere vulputate arcu. Fusce vulputate eleifend sapien. Phasellus magna.
                Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Suspendisse faucibus, nunc
                et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id
                tortor.
              </TextMaxLine>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="As Link" />
            <CardContent>
              <TextMaxLine asLink line={3} href="#" color="primary" sx={{ maxWidth: 300 }}>
                Donec posuere vulputate arcu. Fusce vulputate eleifend sapien. Phasellus magna.
                Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Suspendisse faucibus, nunc
                et pellentesque egestas, lacus ante convallis tellus, vitae iaculis lacus elit id
                tortor.
              </TextMaxLine>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Persistent" />
            <CardContent>
              <TextMaxLine persistent line={3} href="#" sx={{ bgcolor: 'background.neutral' }}>
                Donec posuere vulputate arcu.
              </TextMaxLine>
            </CardContent>
          </Card>
        </Masonry>
      </Container>
    </>
  );
}
