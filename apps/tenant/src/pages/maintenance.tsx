// next
import Head from 'next/head';
import NextLink from 'next/link';
// @mui
import { Button, Typography, Stack } from '@mui/material';
// layouts
import CompactLayout from '../layouts/compact';
// assets
import { MaintenanceIllustration } from '../assets/illustrations';

// ----------------------------------------------------------------------

MaintenancePage.getLayout = (page: React.ReactElement) => <CompactLayout>{page}</CompactLayout>;

// ----------------------------------------------------------------------

export default function MaintenancePage() {
  return (
    <>
      <Head>
        <title> Maintenance | Minimal UI</title>
      </Head>

      <Stack sx={{ alignItems: 'center' }}>
        <Typography variant="h3" paragraph>
          Website currently under maintenance
        </Typography>

        <Typography sx={{ color: 'text.secondary' }}>
          We are currently working hard on this page!
        </Typography>

        <MaintenanceIllustration sx={{ my: 10, height: 240 }} />

        <NextLink href="/" passHref>
          <Button size="large" variant="contained">
            Go to Home
          </Button>
        </NextLink>
      </Stack>
    </>
  );
}
