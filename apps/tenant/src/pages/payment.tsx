// next
import Head from 'next/head';
// @mui
import { Box, Grid, Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// layouts
import SimpleLayout from '../layouts/simple';
// sections
import { PaymentSummary, PaymentMethods, PaymentBillingAddress } from '../sections/payment';

// ----------------------------------------------------------------------

PaymentPage.getLayout = (page: React.ReactElement) => <SimpleLayout>{page}</SimpleLayout>;

// ----------------------------------------------------------------------

export default function PaymentPage() {
  const isDesktop = useResponsive('up', 'md');

  return (
    <>
      <Head>
        <title> Payment | Minimal UI</title>
      </Head>

      <Container
        sx={{
          pt: 15,
          pb: 10,
          minHeight: 1,
        }}
      >
        <Typography variant="h3" align="center" paragraph>
          Let's finish powering you up!
        </Typography>

        <Typography align="center" sx={{ color: 'text.secondary', mb: 5 }}>
          Professional plan is right for you.
        </Typography>

        <Grid container spacing={isDesktop ? 3 : 5}>
          <Grid item xs={12} md={8}>
            <Box
              gap={5}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
              }}
              sx={{
                p: { md: 5 },
                borderRadius: 2,
                border: (theme) => ({
                  md: `dashed 1px ${theme.palette.divider}`,
                }),
              }}
            >
              <PaymentBillingAddress />

              <PaymentMethods />
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <PaymentSummary />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
