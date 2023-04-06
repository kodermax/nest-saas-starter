// @mui
import { Paper, CircularProgress } from '@mui/material';
import { Masonry } from '@mui/lab';
//
import { Label } from '../../Block';

// ----------------------------------------------------------------------

const style = {
  minHeight: 160,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  '& > *': { m: 1 },
} as const;

// ----------------------------------------------------------------------

const COLORS = ['inherit', 'primary', 'secondary', 'info', 'success', 'warning', 'error'] as const;

type CircularProps = {
  progress: number;
};

export default function ProgressCircular({ progress }: CircularProps) {
  return (
    <Masonry columns={{ xs: 1, md: 3 }} spacing={3}>
      <div>
        <Label title="Circular Indeterminate" />
        <Paper variant="outlined" sx={style}>
          {COLORS.map((color) => (
            <CircularProgress key={color} color={color} />
          ))}
        </Paper>
      </div>

      <div>
        <Label title="Circular determinate" />
        <Paper variant="outlined" sx={style}>
          <CircularProgress color="info" />
          <CircularProgress color="info" variant="determinate" value={25} />
          <CircularProgress color="info" variant="determinate" value={50} />
          <CircularProgress color="info" variant="determinate" value={75} />
          <CircularProgress color="info" variant="determinate" value={100} />
          <CircularProgress color="info" variant="determinate" value={progress} />
        </Paper>
      </div>

      <div>
        <Label title="Circular Size" />
        <Paper variant="outlined" sx={style}>
          <CircularProgress size={48} color="info" />
          <CircularProgress color="info" />
          <CircularProgress size={32} color="info" />
          <CircularProgress size={24} color="info" />
        </Paper>
      </div>
    </Masonry>
  );
}
