// next
import Head from 'next/head';
// @mui
import { Box, Container } from '@mui/material';
import { Masonry } from '@mui/lab';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import MainLayout from '../../../layouts/main';
// components
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import FormDialogs from '../../../sections/_examples/mui/dialog/FormDialogs';
import AlertDialog from '../../../sections/_examples/mui/dialog/AlertDialog';
import ScrollDialog from '../../../sections/_examples/mui/dialog/ScrollDialog';
import SimpleDialogs from '../../../sections/_examples/mui/dialog/SimpleDialogs';
import MaxWidthDialog from '../../../sections/_examples/mui/dialog/MaxWidthDialog';
import FullScreenDialogs from '../../../sections/_examples/mui/dialog/FullScreenDialogs';
import TransitionsDialogs from '../../../sections/_examples/mui/dialog/TransitionsDialogs';
import { Block } from '../../../sections/_examples/Block';

// ----------------------------------------------------------------------

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

// ----------------------------------------------------------------------

MUIDialogPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function MUIDialogPage() {
  return (
    <>
      <Head>
        <title> MUI Components: Dialog | Minimal UI</title>
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
            heading="Dialog"
            links={[
              {
                name: 'Components',
                href: PATH_PAGE.components,
              },
              { name: 'Dialog' },
            ]}
            moreLink={['https://mui.com/components/dialogs']}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <Masonry columns={{ xs: 1, md: 3 }} spacing={3}>
          <Block title="Simple" sx={style}>
            <SimpleDialogs />
          </Block>

          <Block title="Alerts" sx={style}>
            <AlertDialog />
          </Block>

          <Block title="Transitions" sx={style}>
            <TransitionsDialogs />
          </Block>

          <Block title="Form" sx={style}>
            <FormDialogs />
          </Block>

          <Block title="Full Screen" sx={style}>
            <FullScreenDialogs />
          </Block>

          <Block title="Max Width Dialog" sx={style}>
            <MaxWidthDialog />
          </Block>

          <Block title="Scrolling Content Dialogs" sx={style}>
            <ScrollDialog />
          </Block>
        </Masonry>
      </Container>
    </>
  );
}
