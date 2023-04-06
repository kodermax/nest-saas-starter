// next
import Head from 'next/head';
// @mui
import { Container, Typography } from '@mui/material';
// layouts
import DashboardLayout from '../../layouts/dashboard';
// components
import { useSettingsContext } from '../../components/settings';

// ----------------------------------------------------------------------

BlankPage.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------
export default function BlankPage() {
  const { themeStretch } = useSettingsContext();

  return (
    <>
      <Head>
        <title> Blank Page | Minimal UI</title>
      </Head>

      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h6"> Blank </Typography>
      </Container>
    </>
  );
}
