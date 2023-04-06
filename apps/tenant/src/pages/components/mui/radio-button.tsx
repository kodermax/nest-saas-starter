import { useState } from 'react';
// next
import Head from 'next/head';
// @mui
import { Box, Radio, Container, RadioGroup, FormControl, FormControlLabel } from '@mui/material';
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
  '& > *': { mx: 1 },
} as const;

// ----------------------------------------------------------------------

MUIRadioButtonsPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function MUIRadioButtonsPage() {
  const [value, setValue] = useState('a1');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((event.target as HTMLInputElement).value);
  };

  return (
    <>
      <Head>
        <title> MUI Components: Radio Buttons | Minimal UI</title>
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
            heading="Radio Buttons"
            links={[
              {
                name: 'Components',
                href: PATH_PAGE.components,
              },
              { name: 'Radio Buttons' },
            ]}
            moreLink={['https://mui.com/components/radio-buttons']}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <Masonry columns={{ xs: 1, md: 2 }} spacing={3}>
          <Block title="Basic" sx={style}>
            <FormControl component="fieldset">
              <RadioGroup row defaultValue="nn">
                <Radio value="nn" />
                <Radio value="gg" />
                <Radio disabled value="hh" />
              </RadioGroup>
            </FormControl>
          </Block>

          <Block title="Size" sx={style}>
            <RadioGroup row defaultValue="g">
              <FormControlLabel value="g" control={<Radio />} label="Normal" />
              <FormControlLabel value="p" control={<Radio size="small" />} label="Small" />
            </RadioGroup>
          </Block>

          <Block title="Placement" sx={style}>
            <FormControl component="fieldset">
              <RadioGroup row defaultValue="top">
                {PLACEMENTS.map((placement) => (
                  <FormControlLabel
                    key={placement}
                    value={placement}
                    label={placement}
                    labelPlacement={placement}
                    control={<Radio />}
                    sx={{ textTransform: 'capitalize' }}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Block>

          <Block title="Colors">
            <FormControl component="fieldset">
              <RadioGroup value={value} onChange={handleChange}>
                {COLORS.map((color) => (
                  <FormControlLabel
                    key={color}
                    value={color}
                    control={<Radio color={color} />}
                    label={color}
                    sx={{ textTransform: 'capitalize' }}
                  />
                ))}

                <FormControlLabel
                  disabled
                  value="a8"
                  control={<Radio color="error" />}
                  label="Disabled"
                />
              </RadioGroup>
            </FormControl>
          </Block>
        </Masonry>
      </Container>
    </>
  );
}
