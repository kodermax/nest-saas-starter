import { useState } from 'react';
// next
import Head from 'next/head';
// @mui
import { Box, Container, Tab, Tabs } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import MainLayout from '../../../layouts/main';
// components
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import PickerDate from '../../../sections/_examples/mui/pickers/PickerDate';
import PickerTime from '../../../sections/_examples/mui/pickers/PickerTime';
import PickerDateTime from '../../../sections/_examples/mui/pickers/PickerDateTime';
import PickerDateRange from '../../../sections/_examples/mui/pickers/PickerDateRange';

// ----------------------------------------------------------------------

const TABS = [
  { value: 'date', label: 'Date', component: <PickerDate /> },
  { value: 'datetime', label: 'DateTime', component: <PickerDateTime /> },
  { value: 'time', label: 'Time', component: <PickerTime /> },
  { value: 'range', label: 'Range', component: <PickerDateRange /> },
];

// ----------------------------------------------------------------------

MUIPickersPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function MUIPickersPage() {
  const [currentTab, setCurrentTab] = useState('date');

  return (
    <>
      <Head>
        <title> MUI Components: Pickers | Minimal UI</title>
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
            heading="Date / Time pickers"
            links={[
              { name: 'Components', href: PATH_PAGE.components },
              { name: 'Date / Time pickers' },
            ]}
            moreLink={[
              'https://mui.com/components/pickers',
              'https://mui.com/x/react-date-pickers/getting-started/',
            ]}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <Tabs value={currentTab} onChange={(event, newValue) => setCurrentTab(newValue)}>
          {TABS.map((tab) => (
            <Tab key={tab.value} value={tab.value} label={tab.label} />
          ))}
        </Tabs>

        {TABS.map(
          (tab) =>
            tab.value === currentTab && (
              <Box key={tab.value} sx={{ mt: 5 }}>
                {tab.component}
              </Box>
            )
        )}
      </Container>
    </>
  );
}
