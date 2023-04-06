// next
import Head from 'next/head';
// @mui
import { Box, Container, Stack, Card, CardHeader, Typography, Link } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// _mock_
import _mock, { randomInArray } from '../../../_mock';
// layouts
import MainLayout from '../../../layouts/main';
// components
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import DataGridBasic from '../../../sections/_examples/mui/data-grid/DataGridBasic';
import DataGridCustom from '../../../sections/_examples/mui/data-grid/DataGridCustom';

// ----------------------------------------------------------------------

export const _dataGrid = [...Array(36)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  email: _mock.email(index),
  lastLogin: _mock.time(index),
  performance: _mock.number.percent(index),
  rating: _mock.number.rating(index),
  status: randomInArray(['online', 'away', 'busy']),
  isAdmin: _mock.boolean(index),
  lastName: _mock.name.lastName(index),
  firstName: _mock.name.firstName(index),
  age: _mock.number.age(index),
}));

// ----------------------------------------------------------------------

MUIDataGridPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function MUIDataGridPage() {
  return (
    <>
      <Head>
        <title> MUI Components: DataGrid | Minimal UI</title>
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
            heading="DataGrid"
            links={[
              {
                name: 'Components',
                href: PATH_PAGE.components,
              },
              { name: 'DataGrid' },
            ]}
            moreLink={['https://mui.com/x/react-data-grid/']}
            sx={{ mb: 0 }}
          />

          <Typography variant="body2" sx={{ my: 3 }}>
            This component includes 2 <strong>Free</strong> and <strong>Paid</strong> versions from
            MUI.
            <br />
            Paid version will have more features. Please read more{' '}
            <Link href="https://mui.com/x/react-data-grid/" target="_blank" rel="noopener">
              here
            </Link>
          </Typography>
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <Stack spacing={5}>
          <Card>
            <CardHeader title="Basic" sx={{ mb: 2 }} />
            <Box sx={{ height: 390 }}>
              <DataGridBasic data={_dataGrid} />
            </Box>
          </Card>

          <Card>
            <CardHeader title="Custom" sx={{ mb: 2 }} />
            <Box sx={{ height: 720 }}>
              <DataGridCustom data={_dataGrid} />
            </Box>
          </Card>
        </Stack>
      </Container>
    </>
  );
}
