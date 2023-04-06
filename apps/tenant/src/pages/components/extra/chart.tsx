// next
import Head from 'next/head';
// @mui
import { Box, Card, Grid, Container, CardHeader, CardContent } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import MainLayout from '../../../layouts/main';
// components
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import {
  ChartPie,
  ChartBar,
  ChartLine,
  ChartArea,
  ChartMixed,
  ChartDonut,
  ChartsRadarBar,
  ChartRadialBar,
  ChartColumnSingle,
  ChartColumnStacked,
  ChartColumnNegative,
  ChartColumnMultiple,
} from '../../../sections/_examples/extra/chart';

// ----------------------------------------------------------------------

DemoChartsPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function DemoChartsPage() {
  return (
    <>
      <Head>
        <title> Extra Components: Charts | Minimal UI</title>
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
            heading="Charts"
            links={[
              {
                name: 'Components',
                href: PATH_PAGE.components,
              },
              { name: 'Charts' },
            ]}
            moreLink={['https://apexcharts.com']}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card dir="ltr">
              <CardHeader title="Area" />
              <CardContent>
                <ChartArea />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card dir="ltr">
              <CardHeader title="Line" />
              <CardContent>
                <ChartLine />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card dir="ltr">
              <CardHeader title="Column Single" />
              <CardContent>
                <ChartColumnSingle />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card dir="ltr">
              <CardHeader title="Column Multiple" />
              <CardContent>
                <ChartColumnMultiple />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card dir="ltr">
              <CardHeader title="Column Stacked" />
              <CardContent>
                <ChartColumnStacked />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card dir="ltr">
              <CardHeader title="Column Negative" />
              <CardContent>
                <ChartColumnNegative />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card dir="ltr">
              <CardHeader title="Bar" />
              <CardContent>
                <ChartBar />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card dir="ltr">
              <CardHeader title="Mixed" />
              <CardContent>
                <ChartMixed />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card dir="ltr">
              <CardHeader title="Pie" />
              <CardContent
                sx={{
                  height: 420,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ChartPie />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card dir="ltr">
              <CardHeader title="Donut" />
              <CardContent
                sx={{
                  height: 420,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ChartDonut />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card dir="ltr">
              <CardHeader title="Radial Bar" />
              <CardContent
                sx={{
                  height: 420,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ChartRadialBar />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card dir="ltr">
              <CardHeader title="Radar" />
              <CardContent
                sx={{
                  height: 420,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ChartsRadarBar />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
