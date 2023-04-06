import { useState } from 'react';
// next
import Head from 'next/head';
// @mui
import { Box, Card, Container } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// _mock
import _mock from '../../../_mock';
// layouts
import MainLayout from '../../../layouts/main';
// components
import Image from '../../../components/image';
import Lightbox from '../../../components/lightbox';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';

// ----------------------------------------------------------------------

const imagesLightbox = [...Array(8)].map((_, index) => _mock.image.cover(index + 1));

// ----------------------------------------------------------------------

DemoLightboxPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function DemoLightboxPage() {
  const [openLightbox, setOpenLightbox] = useState(false);

  const [selectedImage, setSelectedImage] = useState<number>(0);

  const handleOpenLightbox = (url: string) => {
    const selectedImage = imagesLightbox.findIndex((index) => index === url);
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };

  const handleCloseLightbox = () => {
    setOpenLightbox(false);
  };

  return (
    <>
      <Head>
        <title> Extra Components: Lightbox | Minimal UI</title>
      </Head>

      <Box
        sx={{
          pt: 6,
          pb: 1,
          mb: 10,
          bgcolor: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.800'),
        }}
      >
        <Container>
          <CustomBreadcrumbs
            heading="Lightbox"
            links={[
              {
                name: 'Components',
                href: PATH_PAGE.components,
              },
              { name: 'Lightbox' },
            ]}
            moreLink={['https://www.npmjs.com/package/react-image-lightbox']}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <Card sx={{ p: 3 }}>
          <Box
            gap={1.5}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(2, 1fr)',
              sm: 'repeat(3, 1fr)',
              md: 'repeat(4, 1fr)',
            }}
          >
            {imagesLightbox.map((img) => (
              <Image
                key={img}
                alt={img}
                src={img}
                ratio="1/1"
                onClick={() => handleOpenLightbox(img)}
                sx={{
                  borderRadius: 1,
                  cursor: 'pointer',
                }}
              />
            ))}
          </Box>
        </Card>
      </Container>

      <Lightbox
        images={imagesLightbox}
        mainSrc={imagesLightbox[selectedImage]}
        photoIndex={selectedImage}
        setPhotoIndex={setSelectedImage}
        open={openLightbox}
        onCloseRequest={handleCloseLightbox}
      />
    </>
  );
}
