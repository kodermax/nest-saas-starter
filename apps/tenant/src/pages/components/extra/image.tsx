// next
import Head from 'next/head';
// @mui
import { Box, Card, Container, Typography, CardHeader } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// _mock
import _mock from '../../../_mock';
// layouts
import MainLayout from '../../../layouts/main';
// components
import Image from '../../../components/image';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';

// ----------------------------------------------------------------------

DemoImagePage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

const RATIO = ['4/3', '3/4', '6/4', '4/6', '16/9', '9/16', '21/9', '9/21', '1/1'] as const;

const IMAGES = RATIO.map((value, index) => ({
  value,
  url: _mock.image.cover(index + 1),
}));

export default function DemoImagePage() {
  return (
    <>
      <Head>
        <title> Extra Components: Image | Minimal UI</title>
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
            heading="Image"
            links={[
              {
                name: 'Components',
                href: PATH_PAGE.components,
              },
              { name: 'Image' },
            ]}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <Card>
          <CardHeader title="Image Aspect Ratio" />
          <Box
            gap={3}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(4, 1fr)',
            }}
            sx={{ p: 3 }}
          >
            {IMAGES.map((img) => (
              <Box key={img.value}>
                <Typography variant="overline" sx={{ color: 'text.secondary' }}>
                  {img.value}
                </Typography>

                <Image
                  disabledEffect
                  alt={img.value}
                  src={img.url}
                  ratio={img.value}
                  sx={{ borderRadius: 1 }}
                />
              </Box>
            ))}
          </Box>
        </Card>
      </Container>
    </>
  );
}
