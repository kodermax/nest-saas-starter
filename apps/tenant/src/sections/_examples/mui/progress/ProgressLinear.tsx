// @mui
import { Paper, LinearProgress } from '@mui/material';
import { Masonry } from '@mui/lab';
//
import { Label } from '../../Block';

// ----------------------------------------------------------------------

const COLORS = ['inherit', 'primary', 'secondary', 'info', 'success', 'warning', 'error'] as const;

const style = {
  p: 2,
  minHeight: 160,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  '& > *': { m: 1 },
} as const;

// ----------------------------------------------------------------------

type LinearProps = {
  progress: number;
  buffer: number;
};

export default function ProgressLinear({ progress, buffer }: LinearProps) {
  return (
    <Masonry columns={{ xs: 1, md: 2 }} spacing={3}>
      <div>
        <Label title="Linears Indeterminate" />
        <Paper variant="outlined" sx={style}>
          {COLORS.map((color) => (
            <LinearProgress key={color} color={color} sx={{ mb: 2, width: 1 }} />
          ))}
        </Paper>
      </div>

      <div>
        <Label title="Linears Determinate" />
        <Paper variant="outlined" sx={style}>
          {COLORS.map((color) => (
            <LinearProgress
              key={color}
              color={color}
              value={progress}
              variant="determinate"
              sx={{ mb: 2, width: 1 }}
            />
          ))}
        </Paper>
      </div>

      <div>
        <Label title="Linears Buffer" />
        <Paper variant="outlined" sx={style}>
          {COLORS.map((color) => (
            <LinearProgress
              key={color}
              color={color}
              variant="buffer"
              value={progress}
              valueBuffer={buffer}
              sx={{ mb: 2, width: 1 }}
            />
          ))}
        </Paper>
      </div>

      <div>
        <Label title="Linears Query" />
        <Paper variant="outlined" sx={style}>
          {COLORS.map((color) => (
            <LinearProgress
              key={color}
              color={color}
              variant="query"
              value={progress}
              valueBuffer={buffer}
              sx={{ mb: 2, width: 1 }}
            />
          ))}
        </Paper>
      </div>
    </Masonry>
  );
}
