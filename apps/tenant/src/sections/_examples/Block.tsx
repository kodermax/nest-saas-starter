// @mui
import { Theme, alpha } from '@mui/material/styles';
import { Paper, CardHeader, Box, Typography, SxProps } from '@mui/material';

// ----------------------------------------------------------------------

type BlockProps = {
  title?: string;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
};

export function Block({ title, sx, children }: BlockProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        borderRadius: 1.5,
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
      }}
    >
      {title && <CardHeader title={title} />}

      <Box
        sx={{
          p: 5,
          minHeight: 180,
          ...sx,
        }}
      >
        {children}
      </Box>
    </Paper>
  );
}

// ----------------------------------------------------------------------

type LabelProps = {
  title: string;
};

export function Label({ title }: LabelProps) {
  return (
    <Typography variant="overline" component="p" gutterBottom sx={{ color: 'text.secondary' }}>
      {title}
    </Typography>
  );
}
