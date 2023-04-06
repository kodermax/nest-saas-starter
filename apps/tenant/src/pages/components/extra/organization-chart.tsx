// next
import Head from 'next/head';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Stack, Container } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import MainLayout from '../../../layouts/main';
// _mock
import _mock from '../../../_mock';
// components
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import OrganizationalChart from '../../../components/organizational-chart';
// sections
import { Block } from '../../../sections/_examples/Block';

// ----------------------------------------------------------------------

DemoOrganizationalChartPage.getLayout = (page: React.ReactElement) => (
  <MainLayout>{page}</MainLayout>
);

// ----------------------------------------------------------------------

export default function DemoOrganizationalChartPage() {
  const theme = useTheme();

  return (
    <>
      <Head>
        <title> Extra Components: Organizational Chart | Minimal UI</title>
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
            heading="Organizational Chart"
            links={[
              { name: 'Components', href: PATH_PAGE.components },
              { name: 'Organizational Chart' },
            ]}
            moreLink={[
              'https://www.npmjs.com/package/react-organizational-chart',
              'https://daniel-hauser.github.io/react-organizational-chart/?path=/story/example-tree--basic',
            ]}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <Stack spacing={5}>
          <Block title="Simple">
            <OrganizationalChart data={SIMPLE_DATA} lineColor={theme.palette.primary.light} />
          </Block>

          <Block title="Standard" sx={{ overflow: 'auto' }}>
            <OrganizationalChart data={SIMPLE_DATA} variant="standard" lineHeight={'40px'} />
          </Block>

          <Block title="By Group" sx={{ overflow: 'auto' }}>
            <OrganizationalChart data={DATA} variant="group" lineHeight={'64px'} />
          </Block>
        </Stack>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

const createData = (name: string, group: string, role: string | null, avatar: string | null) => ({
  name,
  group,
  role,
  avatar,
});

const SIMPLE_DATA = {
  ...createData('tasha mcneill', 'root', 'ceo, co-founder', _mock.image.avatar(1)),
  children: [
    {
      ...createData('john stone', 'product design', 'lead', _mock.image.avatar(2)),
      children: [
        {
          ...createData('rimsha wynn', 'product design', 'senior', _mock.image.avatar(3)),
          children: null,
        },
      ],
    },
    {
      ...createData('ponnappa priya', 'development', 'lead', _mock.image.avatar(4)),
      children: [
        {
          ...createData('tyra elliott', 'development', 'senior', _mock.image.avatar(5)),
          children: [
            {
              ...createData(
                'sheridan mckee',
                'development',
                'back end developer',
                _mock.image.avatar(6)
              ),
              children: [
                {
                  ...createData(
                    'ang li',
                    'development',
                    'back end developer',
                    _mock.image.avatar(7)
                  ),
                  children: null,
                },
              ],
            },
            {
              ...createData('hope ahmad', 'development', 'front end', _mock.image.avatar(8)),
              children: null,
            },
          ],
        },
      ],
    },
    {
      ...createData('peter stanbridge', 'marketing', 'lead', _mock.image.avatar(9)),
      children: [
        {
          ...createData('madeline harding', 'marketing', 'support', _mock.image.avatar(10)),
          children: null,
        },
        {
          ...createData('eoin medrano', 'marketing', 'content writer', _mock.image.avatar(11)),
          children: null,
        },
      ],
    },
  ],
};

const DATA = {
  ...createData('tasha mcneill', 'root', 'ceo, co-founder', _mock.image.avatar(1)),
  children: [
    {
      ...createData('product design', 'product design', null, null),
      children: [
        {
          ...createData('john stone', 'product design', 'lead', _mock.image.avatar(2)),
          children: [
            {
              ...createData('rimsha wynn', 'product design', 'senior', _mock.image.avatar(3)),
              children: null,
            },
          ],
        },
      ],
    },
    {
      ...createData('development', 'development', null, null),
      children: [
        {
          ...createData('ponnappa priya', 'development', 'lead', _mock.image.avatar(4)),
          children: [
            {
              ...createData('tyra elliott', 'development', 'senior', _mock.image.avatar(5)),
              children: [
                {
                  ...createData(
                    'sheridan mckee',
                    'development',
                    'back end developer',
                    _mock.image.avatar(6)
                  ),
                  children: [
                    {
                      ...createData(
                        'ang li',
                        'development',
                        'back end developer',
                        _mock.image.avatar(7)
                      ),
                      children: null,
                    },
                  ],
                },
                {
                  ...createData('hope ahmad', 'development', 'front end', _mock.image.avatar(8)),
                  children: null,
                },
              ],
            },
          ],
        },
      ],
    },
    {
      ...createData('marketing', 'marketing', null, null),
      children: [
        {
          ...createData('peter stanbridge', 'marketing', 'lead', _mock.image.avatar(9)),
          children: [
            {
              ...createData('madeline harding', 'marketing', 'support', _mock.image.avatar(10)),
              children: null,
            },
            {
              ...createData('eoin medrano', 'marketing', 'content writer', _mock.image.avatar(11)),
              children: null,
            },
          ],
        },
      ],
    },
  ],
};
