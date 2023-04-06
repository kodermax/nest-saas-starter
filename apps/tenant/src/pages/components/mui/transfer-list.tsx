// next
import Head from 'next/head';
// @mui
import { Box, Container, Stack } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import MainLayout from '../../../layouts/main';
// components
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import { Block } from '../../../sections/_examples/Block';
import SimpleTransferList from '../../../sections/_examples/mui/transfer-list/SimpleTransferList';
import EnhancedTransferList from '../../../sections/_examples/mui/transfer-list/EnhancedTransferList';

// ----------------------------------------------------------------------

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
} as const;

// ----------------------------------------------------------------------

MUITransferListPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function MUITransferListPage() {
  return (
    <>
      <Head>
        <title> MUI Components: Transfer List | Minimal UI</title>
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
            heading="Transfer List"
            links={[
              {
                name: 'Components',
                href: PATH_PAGE.components,
              },
              { name: 'Transfer List' },
            ]}
            moreLink={['https://mui.com/components/transfer-list']}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <Stack spacing={3}>
          <Block title="Simple" sx={style}>
            <SimpleTransferList />
          </Block>

          <Block title="Enhanced" sx={style}>
            <EnhancedTransferList />
          </Block>
        </Stack>
      </Container>
    </>
  );
}
