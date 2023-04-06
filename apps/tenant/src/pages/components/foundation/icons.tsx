// next
import Head from 'next/head';
// @mui
import { Box, Stack, Container, Link, Tooltip } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import MainLayout from '../../../layouts/main';
// components
import Iconify from '../../../components/iconify';
import SvgColor from '../../../components/svg-color';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import { Block } from '../../../sections/_examples/Block';

// ----------------------------------------------------------------------

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': { m: '8px !important' },
} as const;

// ----------------------------------------------------------------------

FoundationIconsPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function FoundationIconsPage() {
  return (
    <>
      <Head>
        <title> Foundations: Icons | Minimal UI</title>
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
            heading="Icons"
            links={[
              {
                name: 'Components',
                href: PATH_PAGE.components,
              },
              { name: 'Icons' },
            ]}
            moreLink={[
              'https://mui.com/components/material-icons',
              'https://iconify.design/icon-sets',
            ]}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <Stack spacing={3}>
          <Block title="Material Icons" sx={style}>
            <Link
              href="https://mui.com/components/icons/#main-content"
              target="_blank"
              rel="noopener"
            >
              https://mui.com/components/icons/#main-content
            </Link>
          </Block>

          <Block title="Iconify Icons" sx={style}>
            <Tooltip title="Iconify">
              <Iconify icon="eva:color-palette-fill" width={24} />
            </Tooltip>

            <Iconify icon="eva:color-palette-fill" width={24} sx={{ color: 'action.active' }} />
            <Iconify icon="eva:color-palette-fill" width={24} sx={{ color: 'action.disabled' }} />
            <Iconify icon="eva:color-palette-fill" width={24} sx={{ color: 'primary.main' }} />
            <Iconify icon="eva:color-palette-fill" width={24} sx={{ color: 'secondary.main' }} />
            <Iconify icon="eva:color-palette-fill" width={24} sx={{ color: 'info.main' }} />
            <Iconify icon="eva:color-palette-fill" width={24} sx={{ color: 'success.main' }} />
            <Iconify icon="eva:color-palette-fill" width={24} sx={{ color: 'warning.main' }} />
            <Iconify icon="eva:color-palette-fill" width={24} sx={{ color: 'error.main' }} />
          </Block>

          <Block title="Local Icons" sx={style}>
            <Tooltip title="SvgColor">
              <SvgColor src="/assets/icons/navbar/ic_dashboard.svg" />
            </Tooltip>

            <SvgColor src="/assets/icons/navbar/ic_dashboard.svg" sx={{ color: 'action.active' }} />
            <SvgColor
              src="/assets/icons/navbar/ic_dashboard.svg"
              sx={{ color: 'action.disabled' }}
            />
            <SvgColor src="/assets/icons/navbar/ic_dashboard.svg" sx={{ color: 'primary.main' }} />
            <SvgColor
              src="/assets/icons/navbar/ic_dashboard.svg"
              sx={{ color: 'secondary.main' }}
            />
            <SvgColor src="/assets/icons/navbar/ic_dashboard.svg" sx={{ color: 'info.main' }} />
            <SvgColor src="/assets/icons/navbar/ic_dashboard.svg" sx={{ color: 'success.main' }} />
            <SvgColor src="/assets/icons/navbar/ic_dashboard.svg" sx={{ color: 'warning.main' }} />
            <SvgColor src="/assets/icons/navbar/ic_dashboard.svg" sx={{ color: 'error.main' }} />
          </Block>
        </Stack>
      </Container>
    </>
  );
}
