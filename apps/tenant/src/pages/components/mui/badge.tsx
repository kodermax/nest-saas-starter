// next
import Head from 'next/head';
// @mui
import { Box, Container, Typography, Badge } from '@mui/material';
import { Masonry } from '@mui/lab';
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

MUIBadgePage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function MUIBadgePage() {
  return (
    <>
      <Head>
        <title> MUI Components: Badge | Minimal UI</title>
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
            heading="Badge"
            links={[
              {
                name: 'Components',
                href: PATH_PAGE.components,
              },
              { name: 'Badge' },
            ]}
            moreLink={['https://mui.com/components/badges']}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <Masonry columns={{ xs: 1, md: 2 }} spacing={3}>
          <Block
            title="Basic"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '& > *': { mx: 1 },
            }}
          >
            <Badge badgeContent={4}>
              <Iconify icon="eva:email-fill" width={24} />
            </Badge>

            <Badge badgeContent={4} color="primary">
              <Iconify icon="eva:email-fill" width={24} />
            </Badge>

            <Badge badgeContent={4} color="secondary">
              <Iconify icon="eva:email-fill" width={24} />
            </Badge>

            <Badge badgeContent={4} color="info">
              <Iconify icon="eva:email-fill" width={24} />
            </Badge>

            <Badge badgeContent={4} color="success">
              <Iconify icon="eva:email-fill" width={24} />
            </Badge>

            <Badge badgeContent={4} color="warning">
              <Iconify icon="eva:email-fill" width={24} />
            </Badge>

            <Badge badgeContent={4} color="error">
              <Iconify icon="eva:email-fill" width={24} />
            </Badge>
          </Block>

          <Block
            title="Maximum value"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '& > *': { mx: 1 },
            }}
          >
            <Badge
              badgeContent={99}
              color="error"
              children={<Iconify icon="eva:email-fill" width={24} />}
            />
            <Badge
              badgeContent={100}
              color="error"
              children={<Iconify icon="eva:email-fill" width={24} />}
            />
            <Badge
              badgeContent={1000}
              max={999}
              color="error"
              children={<Iconify icon="eva:email-fill" width={24} />}
            />
          </Block>

          <Block
            title="Dot badge"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '& > *': { mx: 1 },
            }}
          >
            <Badge color="info" variant="dot">
              <Iconify icon="eva:email-fill" width={24} />
            </Badge>

            <Badge color="info" variant="dot">
              <Typography>Typography</Typography>
            </Badge>
          </Block>

          <Block
            title="Badge overlap"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '& > *': { mx: 1 },
            }}
          >
            <Badge color="info" badgeContent=" ">
              <Box sx={{ width: 40, height: 40, bgcolor: 'warning.main' }} />
            </Badge>

            <Badge color="info" badgeContent=" " variant="dot">
              <Box sx={{ width: 40, height: 40, bgcolor: 'warning.main' }} />
            </Badge>

            <Badge color="info" overlap="circular" badgeContent=" ">
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  bgcolor: 'warning.main',
                }}
              />
            </Badge>

            <Badge color="info" overlap="circular" badgeContent=" " variant="dot">
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  bgcolor: 'warning.main',
                }}
              />
            </Badge>
          </Block>
        </Masonry>
      </Container>
    </>
  );
}
