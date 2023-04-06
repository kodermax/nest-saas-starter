import { useState } from 'react';
// next
import Head from 'next/head';
// @mui
import {
  Box,
  List,
  Menu,
  Button,
  MenuItem,
  Container,
  IconButton,
  ListItemText,
  ListItemButton,
} from '@mui/material';
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

const OPTIONS = [
  'Show some love to Material-UI',
  'Show all notification content',
  'Hide sensitive notification content',
  'Hide all notification content',
];

const OPTIONS_MAXHEIGHT = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
];

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

// ----------------------------------------------------------------------

MUIMenuPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function MUIMenuPage() {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const [isOpen, setOpen] = useState<null | HTMLElement>(null);

  const [isOpenList, setOpenList] = useState<null | HTMLElement>(null);

  const [isOpenMaxHeight, setOpenMaxHeight] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenMaxHeight(event.currentTarget);
  };

  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setOpenList(event.currentTarget);
  };

  const handleMenuItemClick = (event: React.MouseEvent<HTMLElement>, index: number) => {
    setSelectedIndex(index);
    setOpenList(null);
  };

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMaxHeightClose = () => {
    setOpenMaxHeight(null);
  };

  return (
    <>
      <Head>
        <title> MUI Components: Menu | Minimal UI</title>
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
            heading="Menu"
            links={[
              {
                name: 'Components',
                href: PATH_PAGE.components,
              },
              { name: 'Menu' },
            ]}
            moreLink={['https://mui.com/components/menus']}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(3, 1fr)',
          }}
        >
          <Block title="Simple" sx={style}>
            <Button variant="outlined" onClick={handleOpen}>
              Open Menu
            </Button>
            <Menu
              keepMounted
              id="simple-menu"
              anchorEl={isOpen}
              onClose={handleClose}
              open={Boolean(isOpen)}
            >
              {['Profile', 'My account', 'Logout'].map((option) => (
                <MenuItem key={option} onClick={handleClose}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </Block>

          <Block title="Selected" sx={style}>
            <List component="nav" aria-label="Device settings">
              <ListItemButton
                aria-haspopup="true"
                aria-controls="lock-menu"
                aria-label="when device is locked"
                onClick={handleClickListItem}
              >
                <ListItemText primary="When device is locked" secondary={OPTIONS[selectedIndex]} />
              </ListItemButton>
            </List>

            <Menu
              keepMounted
              id="lock-menu"
              anchorEl={isOpenList}
              onClose={handleClose}
              open={Boolean(isOpenList)}
            >
              {OPTIONS.map((option, index) => (
                <MenuItem
                  key={option}
                  disabled={index === 0}
                  selected={index === selectedIndex}
                  onClick={(event) => handleMenuItemClick(event, index)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </Block>

          <Block title="Max height" sx={style}>
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>

            <Menu
              keepMounted
              id="long-menu"
              anchorEl={isOpenMaxHeight}
              onClose={handleMaxHeightClose}
              open={Boolean(isOpenMaxHeight)}
              PaperProps={{
                style: {
                  maxHeight: 48 * 4.5,
                  width: '20ch',
                },
              }}
            >
              {OPTIONS_MAXHEIGHT.map((option) => (
                <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleMaxHeightClose}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </Block>
        </Box>
      </Container>
    </>
  );
}
