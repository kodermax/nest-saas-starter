import { ApexOptions } from 'apexcharts';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Card, Stack, Divider, CardHeader, Typography, CardProps } from '@mui/material';
// hooks
import useResponsive from '../../../../hooks/useResponsive';
// components
import Chart, { useChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

const StyledRoot = styled(Card)(({ theme }) => ({
  '& .apexcharts-legend': {
    width: 240,
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
      flexWrap: 'wrap',
      height: 160,
      width: '50%',
    },
  },
  '& .apexcharts-datalabels-group': {
    display: 'none',
  },
}));

// ----------------------------------------------------------------------

interface Props extends CardProps {
  title?: string;
  subheader?: string;
  chart: {
    colors?: string[];
    series: {
      label: string;
      value: number;
    }[];
    options?: ApexOptions;
  };
}

export default function BankingExpensesCategories({ title, subheader, chart, ...other }: Props) {
  const theme = useTheme();

  const isDesktop = useResponsive('up', 'sm');

  const { colors, series, options } = chart;

  const chartSeries = series.map((i) => i.value);

  const chartOptions = useChart({
    colors,
    labels: series.map((i) => i.label),
    stroke: {
      colors: [theme.palette.background.paper],
    },
    fill: { opacity: 0.8 },
    legend: {
      position: 'right',
      itemMargin: {
        horizontal: 10,
        vertical: 5,
      },
    },
    responsive: [
      {
        breakpoint: theme.breakpoints.values.sm,
        options: {
          legend: {
            position: 'bottom',
            horizontalAlign: 'left',
          },
        },
      },
    ],
    ...options,
  });

  return (
    <StyledRoot {...other}>
      <CardHeader title={title} subheader={subheader} />

      <Box sx={{ my: 5 }} dir="ltr">
        <Chart
          type="polarArea"
          series={chartSeries}
          options={chartOptions}
          height={isDesktop ? 240 : 360}
        />
      </Box>

      <Divider />

      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
        <Box sx={{ py: 2, width: 1, textAlign: 'center' }}>
          <Typography sx={{ mb: 1, typography: 'body2', color: 'text.secondary' }}>
            Categories
          </Typography>

          <Typography sx={{ typography: 'h4' }}>9</Typography>
        </Box>

        <Box sx={{ py: 2, width: 1, textAlign: 'center' }}>
          <Typography sx={{ mb: 1, typography: 'body2', color: 'text.secondary' }}>
            Categories
          </Typography>

          <Typography sx={{ typography: 'h4' }}>$18,765</Typography>
        </Box>
      </Stack>
    </StyledRoot>
  );
}
