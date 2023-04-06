import { ApexOptions } from 'apexcharts';
// @mui
import { useTheme } from '@mui/material/styles';
import { Card, Typography, CardProps, Stack, Avatar } from '@mui/material';
// utils
import { fData } from '../../../../utils/formatNumber';
// components
import Chart, { useChart } from '../../../../components/chart';

// ----------------------------------------------------------------------

interface Props extends CardProps {
  total: number;
  data: {
    name: string;
    usedStorage: number;
    filesCount: number;
    icon: React.ReactNode;
  }[];
  chart: {
    colors?: string[];
    series: number;
    options?: ApexOptions;
  };
}

export default function FileGeneralStorageOverview({ data, total, chart, ...other }: Props) {
  const theme = useTheme();

  const { colors, series, options } = chart;

  const chartColors = colors || [theme.palette.primary.light, theme.palette.primary.main];

  const chartOptions = useChart({
    chart: {
      offsetY: -16,
      sparkline: {
        enabled: true,
      },
    },
    grid: {
      padding: {
        top: 24,
        bottom: 24,
      },
    },
    legend: {
      show: false,
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          size: '56%',
        },
        dataLabels: {
          name: {
            offsetY: 8,
          },
          value: {
            offsetY: -40,
          },
          total: {
            label: `Used of ${fData(total)}`,
            color: theme.palette.text.disabled,
            fontSize: theme.typography.body2.fontSize as string,
            fontWeight: theme.typography.body2.fontWeight,
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [chartColors].map((colors) => [
          { offset: 0, color: colors[0] },
          { offset: 100, color: colors[1] },
        ]),
      },
    },
    ...options,
  });

  return (
    <Card {...other}>
      <Chart type="radialBar" series={[series]} options={chartOptions} height={360} />

      <Stack spacing={3} sx={{ p: 3 }}>
        {data.map((category) => (
          <Stack key={category.name} spacing={2} direction="row" alignItems="center">
            <Avatar
              variant="rounded"
              sx={{ bgcolor: 'background.neutral', width: 48, height: 48, borderRadius: 1.5 }}
            >
              {category.icon}
            </Avatar>

            <Stack spacing={0.5} flexGrow={1}>
              <Typography variant="subtitle2"> {category.name} </Typography>
              <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                {category.filesCount} files
              </Typography>
            </Stack>

            <Typography variant="subtitle2"> {fData(category.usedStorage)} </Typography>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}
