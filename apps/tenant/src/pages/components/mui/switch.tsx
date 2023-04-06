// next
import Head from 'next/head';
// @mui
import { Box, Switch, Container, FormGroup, FormControl, FormControlLabel } from '@mui/material';
import { Masonry } from '@mui/lab';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import MainLayout from '../../../layouts/main';
// components
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
import { Block } from '../../../sections/_examples/Block';

// ----------------------------------------------------------------------

const COLORS = ['default', 'primary', 'secondary', 'info', 'success', 'warning', 'error'] as const;

const PLACEMENTS = ['top', 'start', 'bottom', 'end'] as const;

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': { mx: '8px !important' },
} as const;

// ----------------------------------------------------------------------

MUISwitchPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function MUISwitchPage() {
  return (
    <>
      <Head>
        <title> MUI Components: Switch | Minimal UI</title>
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
            heading="Switch"
            links={[
              {
                name: 'Components',
                href: PATH_PAGE.components,
              },
              { name: 'Switch' },
            ]}
            moreLink={['https://mui.com/components/switches']}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <Masonry columns={{ xs: 1, md: 2 }} spacing={3}>
          <Block title="Basic" sx={style}>
            <Switch defaultChecked />
            <Switch />
            <Switch disabled />
            <Switch disabled checked />
            <Switch defaultChecked color="default" />
          </Block>

          <Block title="Sizes" sx={style}>
            <FormGroup row>
              <FormControlLabel control={<Switch size="small" />} label="Small" />
              <FormControlLabel control={<Switch />} label="Normal" />
            </FormGroup>
          </Block>

          <Block title="Placement" sx={style}>
            <FormGroup row>
              {PLACEMENTS.map((placement) => (
                <FormControlLabel
                  key={placement}
                  value={placement}
                  label={placement}
                  labelPlacement={placement}
                  control={<Switch />}
                  sx={{ textTransform: 'capitalize' }}
                />
              ))}
            </FormGroup>
          </Block>

          <Block title="Colors">
            <FormControl component="fieldset">
              <FormGroup>
                {COLORS.map((color) => (
                  <FormControlLabel
                    key={color}
                    control={<Switch defaultChecked color={color} />}
                    label={color}
                    sx={{ textTransform: 'capitalize' }}
                  />
                ))}

                <FormControlLabel disabled control={<Switch color="error" />} label="Disabled" />
              </FormGroup>
            </FormControl>
          </Block>
        </Masonry>
      </Container>
    </>
  );
}
