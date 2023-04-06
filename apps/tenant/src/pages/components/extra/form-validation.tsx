// next
import Head from 'next/head';
// @mui
import { Box, Card, Container, CardHeader, CardContent } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import MainLayout from '../../../layouts/main';
// components
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import { ReactHookForm } from '../../../sections/_examples/extra/form';

// ----------------------------------------------------------------------

DemoFormValidationPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function DemoFormValidationPage() {
  return (
    <>
      <Head>
        <title> Extra Components: Form Validation | Minimal UI</title>
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
            heading="Form Validation"
            links={[
              { name: 'Components', href: PATH_PAGE.components },
              { name: 'Form Validation' },
            ]}
            moreLink={['https://react-hook-form.com/', 'https://github.com/jquense/yup']}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <Card>
          <CardHeader title="React Hook Form" />
          <CardContent>
            <ReactHookForm />
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
