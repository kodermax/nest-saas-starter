// next
import Head from 'next/head';
// @mui
import { Masonry } from '@mui/lab';
import { Box, Fab, Zoom, Fade, Button, Tooltip, Container, IconButton } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import MainLayout from '../../../layouts/main';
// components
import Iconify from '../../../components/iconify';
import { FabButtonAnimate } from '../../../components/animate';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import { Block } from '../../../sections/_examples/Block';

// ----------------------------------------------------------------------

const LONG_TEXT = `
Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.
Praesent non nunc mollis, fermentum neque at, semper arcu.
Nullam eget est sed sem iaculis gravida eget vitae justo.
`;

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': { m: '8px !important' },
} as const;

// ----------------------------------------------------------------------

MUITooltipPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function MUITooltipPage() {
  return (
    <>
      <Head>
        <title> MUI Components: Tooltip | Minimal UI</title>
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
            heading="Tooltip"
            links={[
              {
                name: 'Components',
                href: PATH_PAGE.components,
              },
              { name: 'Tooltip' },
            ]}
            moreLink={['https://mui.com/components/tooltips']}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <Masonry columns={{ xs: 1, md: 2 }} spacing={3}>
          <Block title="Simple" sx={style}>
            <Tooltip title="Delete">
              <IconButton>
                <Iconify icon="eva:trash-2-outline" width={24} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Add">
              <Fab>
                <Iconify icon="eva:plus-fill" width={24} />
              </Fab>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton color="info">
                <Iconify icon="eva:trash-2-outline" width={24} />
              </IconButton>
            </Tooltip>

            <Tooltip title="Add">
              <FabButtonAnimate color="info">
                <Iconify icon="eva:plus-fill" width={24} />
              </FabButtonAnimate>
            </Tooltip>

            <Tooltip title="Add">
              <Button variant="outlined" color="info">
                Button
              </Button>
            </Tooltip>
          </Block>

          <Block title="Arrow" sx={style}>
            <Tooltip title="Add" arrow>
              <Fab>
                <Iconify icon="eva:plus-fill" width={24} />
              </Fab>
            </Tooltip>
          </Block>

          <Block title="Variable Width" sx={style}>
            <Tooltip title={LONG_TEXT}>
              <Button color="inherit">Default Width [300px]</Button>
            </Tooltip>

            <Tooltip title={LONG_TEXT} sx={{ maxWidth: 500 }}>
              <Button color="inherit">Custom Width [500px]</Button>
            </Tooltip>

            <Tooltip title={LONG_TEXT} sx={{ maxWidth: 'none' }}>
              <Button color="inherit">No wrapping</Button>
            </Tooltip>
          </Block>

          <Block title="Transitions" sx={style}>
            <Tooltip title="Add">
              <Button color="inherit">Grow</Button>
            </Tooltip>

            <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Add">
              <Button color="inherit">Fade</Button>
            </Tooltip>

            <Tooltip TransitionComponent={Zoom} title="Add">
              <Button color="inherit">Zoom</Button>
            </Tooltip>
          </Block>

          <Block title="Positioned" sx={style}>
            <Tooltip title="Add" placement="top-start">
              <Button color="inherit">top-start</Button>
            </Tooltip>

            <Tooltip title="Add" placement="top">
              <Button color="inherit">top</Button>
            </Tooltip>

            <Tooltip title="Add" placement="top-end">
              <Button color="inherit">top-end</Button>
            </Tooltip>

            <Tooltip title="Add" placement="left-start">
              <Button color="inherit">left-start</Button>
            </Tooltip>

            <Tooltip title="Add" placement="left">
              <Button color="inherit">left</Button>
            </Tooltip>

            <Tooltip title="Add" placement="left-end">
              <Button color="inherit">left-end</Button>
            </Tooltip>

            <Tooltip title="Add" placement="right-start">
              <Button color="inherit">right-start</Button>
            </Tooltip>

            <Tooltip title="Add" placement="right">
              <Button color="inherit">right</Button>
            </Tooltip>

            <Tooltip title="Add" placement="right-end">
              <Button color="inherit">right-end</Button>
            </Tooltip>

            <Tooltip title="Add" placement="bottom-start">
              <Button color="inherit">bottom-start</Button>
            </Tooltip>

            <Tooltip title="Add" placement="bottom">
              <Button color="inherit">bottom</Button>
            </Tooltip>

            <Tooltip title="Add" placement="bottom-end">
              <Button color="inherit">bottom-end</Button>
            </Tooltip>
          </Block>
        </Masonry>
      </Container>
    </>
  );
}
