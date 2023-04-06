import { useState } from 'react';
// next
import Head from 'next/head';
// @mui
import {
  Box,
  Radio,
  Button,
  Popover,
  Container,
  FormLabel,
  Typography,
  RadioGroup,
  FormControl,
  FormControlLabel,
} from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import MainLayout from '../../../layouts/main';
// components
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import MenuPopover, { MenuPopoverArrowValue } from '../../../components/menu-popover';
// sections
import { Block } from '../../../sections/_examples/Block';

// ----------------------------------------------------------------------

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

// ----------------------------------------------------------------------

MUIPopoverPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function MUIPopoverPage() {
  const [click, setCLick] = useState<HTMLButtonElement | null>(null);

  const [hover, setHover] = useState<HTMLElement | null>(null);

  const [customized, setCustomized] = useState<HTMLElement | null>(null);

  const [arrow, setArrow] = useState<MenuPopoverArrowValue>('top-left');

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCLick(event.currentTarget);
  };

  const handleClose = () => {
    setCLick(null);
  };

  const handleHoverOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setHover(event.currentTarget);
  };
  const handleHoverClose = () => {
    setHover(null);
  };

  const handleOpenCustomized = (event: React.MouseEvent<HTMLElement>) => {
    setCustomized(event.currentTarget);
  };

  const handleCloseCustomized = () => {
    setCustomized(null);
  };

  return (
    <>
      <Head>
        <title> MUI Components: Popover | Minimal UI</title>
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
            heading="Popover"
            links={[
              {
                name: 'Components',
                href: PATH_PAGE.components,
              },
              { name: 'Popover' },
            ]}
            moreLink={['https://mui.com/components/popover']}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
          sx={{ mb: 3 }}
        >
          <Block title="Click" sx={style}>
            <Button variant="contained" onClick={handleClick}>
              Open Popover
            </Button>
            <Popover
              open={Boolean(click)}
              anchorEl={click}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <Box sx={{ p: 2, maxWidth: 280 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Etiam feugiat lorem non metus
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Fusce vulputate eleifend sapien. Curabitur at lacus ac velit ornare lobortis.
                </Typography>
              </Box>
            </Popover>
          </Block>

          <Block title="Hover" sx={style}>
            <Typography
              aria-owns={hover ? 'mouse-over-popover' : undefined}
              aria-haspopup="true"
              onMouseEnter={handleHoverOpen}
              onMouseLeave={handleHoverClose}
            >
              Hover with a Popover.
            </Typography>
            <Popover
              id="mouse-over-popover"
              open={Boolean(hover)}
              anchorEl={hover}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              onClose={handleHoverClose}
              disableRestoreFocus
              sx={{
                pointerEvents: 'none',
              }}
            >
              <Box sx={{ p: 2, maxWidth: 280 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Etiam feugiat lorem non metus
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Fusce vulputate eleifend sapien. Curabitur at lacus ac velit ornare lobortis.
                </Typography>
              </Box>
            </Popover>
          </Block>
        </Box>

        <Block title="Customized" sx={style}>
          <Button variant="contained" onClick={handleOpenCustomized} sx={{ mr: 5 }}>
            Open Customized
          </Button>

          <FormControl>
            <FormLabel sx={{ typography: 'body2' }}>Arrow</FormLabel>
            <RadioGroup
              value={arrow}
              onChange={(event) => setArrow(event.target.value as MenuPopoverArrowValue)}
            >
              {[
                'top-left',
                'top-center',
                'top-right',
                'bottom-left',
                'bottom-center',
                'bottom-right',
                'left-top',
                'left-center',
                'left-bottom',
                'right-top',
                'right-center',
                'right-bottom',
              ].map((arrow) => (
                <FormControlLabel key={arrow} value={arrow} control={<Radio />} label={arrow} />
              ))}
            </RadioGroup>
          </FormControl>

          <MenuPopover open={customized} onClose={handleCloseCustomized} arrow={arrow}>
            <Box sx={{ p: 2, maxWidth: 280 }}>
              <Typography variant="subtitle1" gutterBottom>
                Etiam feugiat lorem non metus
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Fusce vulputate eleifend sapien. Curabitur at lacus ac velit ornare lobortis.
              </Typography>
            </Box>
          </MenuPopover>
        </Block>
      </Container>
    </>
  );
}
