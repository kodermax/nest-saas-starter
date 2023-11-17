// next
import Head from 'next/head';

// @mui
import { Box, Switch, Container, Typography, Stack } from '@mui/material';

// _mock_
import { _pricingPlans } from '../_mock/arrays';

// layouts
import SimpleLayout from '../layouts/simple';

// sections
import { PricingPlanCard } from '../sections/pricing';
import { useEffect, useState } from 'react';
import { getTenantByUrl } from 'src/@core/services/tenants.service';

// ----------------------------------------------------------------------

PricingPage.getLayout = (page: React.ReactElement) => <SimpleLayout>{page}</SimpleLayout>;

// ----------------------------------------------------------------------

export default function PricingPage() {
  const [siteName, setSiteName] = useState<string>('');
  useEffect(() => {
    async function request() {
      const {
        data: { name },
      } = await getTenantByUrl();
      setSiteName(name);
    }
    request();
  });

  return (
    <>
      <Head>
        <title> Pricing | Minimal UI</title>
      </Head>

      <Container
        sx={{
          pt: 15,
          pb: 10,
          minHeight: 1,
        }}
      >
        <Typography variant="h3" align="center" paragraph>
          {siteName}
        </Typography>

        <Typography align="center" sx={{ color: 'text.secondary' }}>
          Choose your plan and make modern online conversation magic
        </Typography>

        <Box sx={{ my: 5 }}>
          <Stack direction="row" alignItems="center" justifyContent="flex-end">
            <Typography variant="overline" sx={{ mr: 1.5 }}>
              MONTHLY
            </Typography>

            <Switch />
            <Typography variant="overline" sx={{ ml: 1.5 }}>
              YEARLY (save 10%)
            </Typography>
          </Stack>

          <Typography
            variant="caption"
            align="right"
            sx={{ color: 'text.secondary', display: 'block' }}
          >
            * Plus applicable taxes
          </Typography>
        </Box>

        <Box gap={3} display="grid" gridTemplateColumns={{ md: 'repeat(3, 1fr)' }}>
          {_pricingPlans.map((card, index) => (
            <PricingPlanCard key={card.subscription} card={card} index={index} />
          ))}
        </Box>
      </Container>
    </>
  );
}
