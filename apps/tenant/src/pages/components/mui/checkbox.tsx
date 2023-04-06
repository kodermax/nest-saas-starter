import { useState } from 'react';
// next
import Head from 'next/head';
// @mui
import { Box, Checkbox, FormGroup, Container, FormControl, FormControlLabel } from '@mui/material';
import { Masonry } from '@mui/lab';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import MainLayout from '../../../layouts/main';
// components
import Iconify from '../../../components/iconify';
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
  '& > *': { m: '8px !important' },
} as const;

// ----------------------------------------------------------------------

MUICheckboxPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function MUICheckboxPage() {
  const [checked, setChecked] = useState([true, false]);

  const handleChange1 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked([checked[0], event.target.checked]);
  };

  return (
    <>
      <Head>
        <title> MUI Components: Checkbox | Minimal UI</title>
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
            heading="Checkboxes"
            links={[
              {
                name: 'Components',
                href: PATH_PAGE.components,
              },
              { name: 'Checkboxes' },
            ]}
            moreLink={['https://mui.com/components/checkboxes']}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <Masonry columns={{ xs: 1, md: 2 }} spacing={3}>
          <Block title="Basic" sx={style}>
            <Checkbox />
            <Checkbox defaultChecked />
            <Checkbox defaultChecked indeterminate />
            <Checkbox disabled />
            <Checkbox disabled defaultChecked />
            <Checkbox disabled indeterminate />
          </Block>

          <Block title="Size & Custom Icon" sx={style}>
            <FormControlLabel label="Normal" control={<Checkbox defaultChecked />} />
            <FormControlLabel label="Small" control={<Checkbox defaultChecked size="small" />} />
            <FormControlLabel
              control={
                <Checkbox
                  color="info"
                  size="small"
                  icon={<Iconify icon="eva:heart-fill" />}
                  checkedIcon={<Iconify icon="eva:heart-fill" />}
                />
              }
              label="Custom icon"
            />

            <FormControlLabel
              control={
                <Checkbox
                  color="error"
                  icon={<Iconify icon="eva:award-fill" />}
                  checkedIcon={<Iconify icon="eva:award-fill" />}
                />
              }
              label="Custom icon"
            />
          </Block>

          <Block title="Placement" sx={style}>
            <FormControl component="fieldset">
              <FormGroup aria-label="position" row>
                {PLACEMENTS.map((placement) => (
                  <FormControlLabel
                    key={placement}
                    value={placement}
                    label={placement}
                    labelPlacement={placement}
                    control={<Checkbox />}
                    sx={{ textTransform: 'capitalize' }}
                  />
                ))}
              </FormGroup>
            </FormControl>
          </Block>

          <Block title="Colors">
            <FormGroup>
              {COLORS.map((color) => (
                <FormControlLabel
                  key={color}
                  control={<Checkbox defaultChecked color={color} />}
                  label={color}
                  sx={{ textTransform: 'capitalize' }}
                />
              ))}

              <FormControlLabel
                disabled
                control={<Checkbox defaultChecked color="error" />}
                label="Disabled"
              />
            </FormGroup>

            <FormControl component="fieldset">
              <FormGroup>
                {COLORS.map((color) => (
                  <FormControlLabel
                    key={color}
                    control={<Checkbox defaultChecked indeterminate color={color} />}
                    label={color}
                    sx={{ textTransform: 'capitalize' }}
                  />
                ))}

                <FormControlLabel
                  disabled
                  control={<Checkbox defaultChecked indeterminate color="error" />}
                  label="Disabled"
                />
              </FormGroup>
            </FormControl>
          </Block>

          <Block title="Indeterminate" sx={style}>
            <div>
              <FormControlLabel
                label="Parent"
                control={
                  <Checkbox
                    checked={checked[0] && checked[1]}
                    indeterminate={checked[0] !== checked[1]}
                    onChange={handleChange1}
                  />
                }
              />
              <div>
                <FormControlLabel
                  label="Child 1"
                  control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
                />
                <FormControlLabel
                  label="Child 2"
                  control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
                />
              </div>
            </div>
          </Block>
        </Masonry>
      </Container>
    </>
  );
}
