// next
import Head from 'next/head';
// @mui
import { useTheme, hexToRgb, alpha } from '@mui/material/styles';
import {
  Box,
  Paper,
  Stack,
  Tooltip,
  Divider,
  BoxProps,
  Container,
  Typography,
  IconButton,
} from '@mui/material';
import useCopyToClipboard from '../../../hooks/useCopyToClipboard';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import MainLayout from '../../../layouts/main';
// components
import Iconify from '../../../components/iconify';
import { useSnackbar } from '../../../components/snackbar';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';

// ----------------------------------------------------------------------

const PALETTE = ['primary', 'secondary', 'info', 'success', 'warning', 'error'] as const;

const VARIATIONS = ['lighter', 'light', 'main', 'dark', 'darker'] as const;

const GREY = ['100', '200', '300', '400', '500', '600', '700', '800', '900'] as const;

// ----------------------------------------------------------------------

FoundationColorsPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function FoundationColorsPage() {
  const theme = useTheme();

  const { enqueueSnackbar } = useSnackbar();

  const { copy } = useCopyToClipboard();

  const onCopy = (color: string) => {
    if (color) {
      enqueueSnackbar(`Copied! ${color}`);
      copy(color);
    }
  };

  return (
    <>
      <Head>
        <title> Foundations: Colors | Minimal UI</title>
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
            heading="Color"
            links={[
              {
                name: 'Components',
                href: PATH_PAGE.components,
              },
              { name: 'Color' },
            ]}
            moreLink={['https://mui.com/customization/color', 'https://colors.eva.design']}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <Stack spacing={5} divider={<Divider sx={{ borderStyle: 'dashed' }} />}>
          {PALETTE.map((color) => (
            <Box key={color}>
              <Typography variant="h5" sx={{ textTransform: 'capitalize', mb: 3 }}>
                {color}
              </Typography>

              <Grid>
                {VARIATIONS.map((variation) => (
                  <ColorCard
                    key={variation}
                    variation={variation}
                    hexColor={theme.palette[color][variation]}
                    onCopy={() => onCopy(theme.palette[color][variation])}
                  />
                ))}
              </Grid>
            </Box>
          ))}

          <div>
            <Typography variant="h5" sx={{ textTransform: 'capitalize', mb: 3 }}>
              Grey
            </Typography>

            <Grid>
              {GREY.map((variation) => (
                <ColorCard
                  key={variation}
                  variation={variation}
                  hexColor={theme.palette.grey[variation]}
                  onCopy={() => onCopy(theme.palette.grey[variation])}
                />
              ))}
            </Grid>
          </div>
        </Stack>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

type ColorCardProps = {
  hexColor: string;
  variation: string;
  onCopy: VoidFunction;
};

function ColorCard({ hexColor, variation, onCopy }: ColorCardProps) {
  return (
    <Paper
      variant="outlined"
      sx={{
        overflow: 'hidden',
        position: 'relative',
        borderColor: (theme) => alpha(theme.palette.grey[500], 0.16),
      }}
    >
      <Tooltip title="Copy">
        <IconButton
          onClick={onCopy}
          sx={{
            top: 8,
            right: 8,
            position: 'absolute',
            color: (theme) => theme.palette.getContrastText(hexColor),
          }}
        >
          <Iconify icon="eva:copy-fill" />
        </IconButton>
      </Tooltip>

      <Box sx={{ bgcolor: hexColor, paddingTop: '75%' }} />

      <Stack spacing={1} sx={{ p: 2 }}>
        <Typography variant="subtitle2" sx={{ textTransform: 'capitalize' }}>
          {variation}
        </Typography>

        <Stack direction="row" alignItems="center">
          <Typography variant="overline" sx={{ width: 56, color: 'text.disabled' }}>
            Hex
          </Typography>

          <Typography variant="body2">{hexColor}</Typography>
        </Stack>

        <Stack direction="row" alignItems="center">
          <Typography variant="overline" sx={{ width: 56, color: 'text.disabled' }}>
            Rgb
          </Typography>

          <Typography variant="body2">
            {hexToRgb(hexColor).replace('rgb(', '').replace(')', '')}
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}

// ----------------------------------------------------------------------

function Grid({ children }: BoxProps) {
  return (
    <Box
      gap={2.5}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(2, 1fr)',
        sm: 'repeat(3, 1fr)',
        md: 'repeat(4, 1fr)',
        lg: 'repeat(5, 1fr)',
      }}
    >
      {children}
    </Box>
  );
}
