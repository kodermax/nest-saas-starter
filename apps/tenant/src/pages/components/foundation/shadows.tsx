// next
import Head from 'next/head';
// @mui
import { useTheme } from '@mui/material/styles';
import { Stack, Box, Paper, Container, Typography, PaperProps } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import MainLayout from '../../../layouts/main';
// components
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import { Block } from '../../../sections/_examples/Block';

// ----------------------------------------------------------------------

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': { m: '8px !important' },
} as const;

// ----------------------------------------------------------------------

FoundationShadowsPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function FoundationShadowsPage() {
  const theme = useTheme();

  const systemShadows = theme.shadows.slice(1, theme.shadows.length);

  const customShadows = [
    ['z1', theme.customShadows.z1],
    ['z4', theme.customShadows.z4],
    ['z8', theme.customShadows.z8],
    ['z12', theme.customShadows.z12],
    ['z16', theme.customShadows.z16],
    ['z20', theme.customShadows.z20],
    ['z24', theme.customShadows.z24],
    ['card', theme.customShadows.card],
    ['dropdown', theme.customShadows.dropdown],
    ['dialog', theme.customShadows.dialog],
  ];

  const colorShadows = ['primary', 'secondary', 'info', 'success', 'warning', 'error'] as const;

  return (
    <>
      <Head>
        <title> Foundations: Shadows | Minimal UI</title>
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
            heading="Shadows"
            links={[
              {
                name: 'Components',
                href: PATH_PAGE.components,
              },
              { name: 'Shadows' },
            ]}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <Stack spacing={5}>
          <Block title="System" sx={style}>
            {systemShadows.map((shadow, index) => (
              <ShadowCard key={shadow} title={`z${index + 1}`} sx={{ boxShadow: shadow }} />
            ))}
          </Block>

          <Block title="Customs" sx={style}>
            {customShadows.map((shadow) => (
              <ShadowCard key={shadow[0]} title={shadow[0]} sx={{ boxShadow: shadow[1] }} />
            ))}
          </Block>

          <Block title="Colors" sx={style}>
            {colorShadows.map((color) => (
              <ShadowCard
                key={color}
                title={color}
                sx={{
                  color: theme.palette[color].contrastText,
                  bgcolor: theme.palette[color].main,
                  boxShadow: theme.customShadows[color],
                }}
              />
            ))}
          </Block>
        </Stack>
      </Container>
    </>
  );
}

// ----------------------------------------------------------------------

function ShadowCard({ sx, title }: PaperProps) {
  return (
    <Paper
      sx={{
        padding: 3,
        margin: 1.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: {
          xs: 'calc((100%/2) - 24px)',
          sm: 'calc((100%/4) - 24px)',
          md: 'calc((100%/6) - 24px)',
        },
        ...sx,
      }}
    >
      <Typography variant="subtitle2" sx={{ textTransform: 'capitalize' }}>
        {title}
      </Typography>
    </Paper>
  );
}
