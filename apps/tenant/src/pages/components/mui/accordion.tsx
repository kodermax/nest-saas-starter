import { useState } from 'react';
// next
import Head from 'next/head';
// @mui
import {
  Box,
  Stack,
  Container,
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// _mock_
import _mock from '../../../_mock';
// layouts
import MainLayout from '../../../layouts/main';
// components
import Iconify from '../../../components/iconify';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import { Block } from '../../../sections/_examples/Block';

// ----------------------------------------------------------------------

const _accordions = [...Array(4)].map((_, index) => ({
  id: _mock.id(index),
  value: `panel${index + 1}`,
  heading: `Accordion ${index + 1}`,
  subHeading: _mock.text.title(index),
  detail: _mock.text.description(index),
}));

// ----------------------------------------------------------------------

MUIAccordionPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function MUIAccordionPage() {
  const [controlled, setControlled] = useState<string | false>(false);

  const handleChangeControlled =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setControlled(isExpanded ? panel : false);
    };

  return (
    <>
      <Head>
        <title> MUI Components: Accordion | Minimal UI</title>
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
            heading="Accordion"
            links={[
              {
                name: 'Components',
                href: PATH_PAGE.components,
              },
              { name: 'Accordion' },
            ]}
            moreLink={['https://mui.com/components/accordion']}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <Stack spacing={5}>
          <Block title="Simple">
            {_accordions.map((accordion, index) => (
              <Accordion key={accordion.value} disabled={index === 3}>
                <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                  <Typography variant="subtitle1">{accordion.heading}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{accordion.detail}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Block>

          <Block title="Controlled">
            {_accordions.map((item, index) => (
              <Accordion
                key={item.value}
                disabled={index === 3}
                expanded={controlled === item.value}
                onChange={handleChangeControlled(item.value)}
              >
                <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                  <Typography variant="subtitle1" sx={{ width: '33%', flexShrink: 0 }}>
                    {item.heading}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>{item.subHeading}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{item.detail}</Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Block>
        </Stack>
      </Container>
    </>
  );
}
