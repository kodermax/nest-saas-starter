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
import IconButtons from '../../../sections/_examples/mui/button/IconButtons';
import ButtonGroups from '../../../sections/_examples/mui/button/ButtonGroups';
import ToggleButtons from '../../../sections/_examples/mui/button/ToggleButtons';
import ButtonVariants from '../../../sections/_examples/mui/button/ButtonVariants';
import FloatingActionButton from '../../../sections/_examples/mui/button/FloatingActionButton';

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'contained',
    label: 'Contained Buttons',
    component: <ButtonVariants variant="contained" />,
  },
  {
    value: 'outlined',
    label: 'Outlined Buttons',
    component: <ButtonVariants variant="outlined" />,
  },
  { value: 'text', label: 'Text Buttons', component: <ButtonVariants /> },
  { value: 'soft', label: 'Soft Buttons', component: <ButtonVariants variant="soft" /> },
  { value: 'icon', label: 'Icon Buttons', component: <IconButtons /> },
  { value: 'fab', label: 'Floating Action Button', component: <FloatingActionButton /> },
  { value: 'groups', label: 'Button Groups', component: <ButtonGroups /> },
  { value: 'toggle', label: 'Toggle Buttons', component: <ToggleButtons /> },
];

// ----------------------------------------------------------------------

MUIButtonsPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function MUIButtonsPage() {
  const [currentTab, setCurrentTab] = useState('contained');

  return (
    <>
      <Head>
        <title> MUI Components: Buttons | Minimal UI</title>
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
            heading="Buttons"
            links={[
              {
                name: 'Components',
                href: PATH_PAGE.components,
              },
              { name: 'Buttons' },
            ]}
            moreLink={[
              'https://mui.com/components/buttons',
              'https://mui.com/components/button-group',
              'https://mui.com/components/floating-action-button',
              'https://mui.com/components/toggle-button',
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
