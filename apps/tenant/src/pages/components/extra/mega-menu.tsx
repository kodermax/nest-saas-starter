// next
import Head from 'next/head';
// @mui
import { Box, Card, Stack, Container, AppBar, Typography } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
import { NAV } from '../../../config';
// _mock
import _mock from '../../../_mock';
// layouts
import MainLayout from '../../../layouts/main';
// components
import Image from '../../../components/image';
import Iconify from '../../../components/iconify';
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
import {
  MegaMenuMobile,
  MegaMenuDesktopHorizon,
  MegaMenuDesktopVertical,
  MegaMenuItemProps,
} from '../../../components/mega-menu';

// ----------------------------------------------------------------------

DemoMegaMenuPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function DemoMegaMenuPage() {
  return (
    <>
      <Head>
        <title> Extra Components: Mega Menu | Minimal UI</title>
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
            heading="Mega Menu"
            links={[
              {
                name: 'Components',
                href: PATH_PAGE.components,
              },
              { name: 'Mega Menu' },
            ]}
          />
        </Container>
      </Box>

      <AppBar
        position="static"
        color="transparent"
        sx={{
          boxShadow: (theme) => theme.customShadows.z8,
        }}
      >
        <Container sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Menu Horizon
          </Typography>

          <MegaMenuDesktopHorizon data={data} />
        </Container>
      </AppBar>

      <Container sx={{ my: 10 }}>
        <MegaMenuMobile data={data} />

        <Stack direction="row" spacing={3} mt={5}>
          <Card sx={{ width: NAV.W_BASE, flexShrink: 0, overflow: 'unset', zIndex: 9 }}>
            <Typography variant="h6" sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
              <Iconify icon="eva:list-fill" width={24} sx={{ mr: 1 }} /> Menu Vertical
            </Typography>

            <MegaMenuDesktopVertical data={data} />
          </Card>

          <Image
            alt="any photo"
            src={_mock.image.cover(18)}
            ratio="21/9"
            sx={{ borderRadius: 1 }}
          />
        </Stack>
      </Container>
    </>
  );
}

// MOCK DATA
// ----------------------------------------------------------------------

export const _products = [...Array(10)].map((_, index) => ({
  name: _mock.text.title(index),
  image: _mock.image.cover(index),
  path: '#',
}));

const ICON_SIZE = {
  width: '100%',
  height: '100%',
};

const TAGS = [
  { name: 'Paper Cup', path: '#' },
  { name: 'Lotion Pump', path: '#' },
  { name: 'Brush Cutter', path: '#' },
  { name: 'Display Rack', path: '#' },
  { name: 'Glass Bottle', path: '#' },
];

const data: MegaMenuItemProps[] = [
  {
    title: 'Parent 1',
    path: '#',
    icon: <Iconify icon="eva:file-fill" {...ICON_SIZE} />,
    more: { title: 'More Categories', path: '#' },
    products: _products,
    tags: TAGS,
    children: [
      {
        subheader: 'Agriculture Machinery',
        items: [
          { title: 'Agriculture Machinery', path: '#' },
          { title: 'Livestock MachineryFeed', path: '#' },
          { title: 'Feed Processing Machinery', path: '#' },
          { title: 'Tiller', path: '#' },
          { title: 'Harvesting Machine', path: '#' },
        ],
      },
      {
        subheader: 'Machine Tools',
        items: [
          { title: 'CNC Machine Tools', path: '#' },
          { title: 'Lathe', path: '#' },
          { title: 'Grinding Machine ', path: '#' },
          { title: 'Drilling Machine ', path: '#' },
          { title: 'Milling Machine ', path: '#' },
        ],
      },
      {
        subheader: 'Other Machinery & Parts',
        items: [
          { title: 'Metallic Processing Machinery', path: '#' },
          { title: 'Machinery for Food, Beverage & Cereal', path: '#' },
          { title: 'Laser Equipment', path: '#' },
          { title: 'Mould', path: '#' },
          { title: 'Textile Machinery & Parts', path: '#' },
          { title: 'Cutting & Fold-bend Machine', path: '#' },
          { title: 'Paper Machinery', path: '#' },
          { title: 'Rubber Machinery', path: '#' },
          { title: 'Chemical Equipment & Machinery', path: '#' },
          { title: 'Mixing Equipment', path: '#' },
          { title: 'Machinery for Garment, Shoes & Accessories', path: '#' },
          { title: 'Crushing & Culling Machine', path: '#' },
        ],
      },
      {
        subheader: 'Plastic & Woodworking Machinery',
        items: [
          { title: 'Plastic Machinery', path: '#' },
          { title: 'Woodworking Machinery', path: '#' },
          { title: 'Blow Molding Machine', path: '#' },
          { title: 'Plastic Recycling Machine', path: '#' },
          { title: 'Injection Molding Machine', path: '#' },
        ],
      },
      {
        subheader: 'Construction Machinery',
        items: [
          { title: 'Building Material Making Machinery', path: '#' },
          { title: 'Lifting Equipment', path: '#' },
          { title: 'Excavator', path: '#' },
          { title: 'Concrete Machinery', path: '#' },
          { title: 'Stone Processing Machinery', path: '#' },
        ],
      },
    ],
  },
  {
    title: 'Parent 2',
    path: '#',
    icon: <Iconify icon="eva:file-fill" {...ICON_SIZE} />,
    more: { title: 'More Categories', path: '#' },
    products: _products,
    tags: TAGS,
    children: [
      {
        subheader: 'Cellphone & Accessories',
        items: [
          { title: 'Mobile Phone Charger', path: '#' },
          { title: 'Power Bank', path: '#' },
          { title: 'Mobile Phone LCD', path: '#' },
          { title: 'Bluetooth Headset', path: '#' },
          { title: 'Mobile Phone', path: '#' },
        ],
      },
      {
        subheader: 'Audio & Video',
        items: [
          { title: 'Display & Accessories', path: '#' },
          { title: 'Audio & Sets', path: '#' },
          { title: 'Professional Audio', path: '#' },
          { title: 'LCD Display', path: '#' },
          { title: 'LCD Module', path: '#' },
          { title: 'Video', path: '#' },
          { title: 'TV & Parts', path: '#' },
          { title: 'Amplifier', path: '#' },
          { title: 'Portable Audio Appliance', path: '#' },
          { title: 'Home Theatre System', path: '#' },
          { title: 'HDMI Cable', path: '#' },
          { title: 'Radio', path: '#' },
        ],
      },
      {
        subheader: 'Household Appliances',
        items: [
          { title: 'Air Conditioner, Purifier & Humidifier', path: '#' },
          { title: 'Refrigerator, Freezer & Parts', path: '#' },
          { title: 'Water Heater & Components', path: '#' },
          { title: 'Electrical Fan & Exhaust Fan', path: '#' },
          { title: 'Household Water Treatment Equipment', path: '#' },
          { title: 'Solar Water Heater', path: '#' },
          { title: 'Photographic Apparatus', path: '#' },
          { title: 'Gas Burner & Gas Stove', path: '#' },
          { title: 'Entertainment Electronics', path: '#' },
          { title: 'Electrical Kettle', path: '#' },
          { title: 'Food Blender', path: '#' },
          { title: 'Dehumidifier', path: '#' },
        ],
      },
      {
        subheader: 'Digital Devices',
        items: [
          { title: 'Battery & Charger', path: '#' },
          { title: 'Wearable Devices', path: '#' },
          { title: 'Digital Photo Frame', path: '#' },
          { title: 'Digital Camera', path: '#' },
          { title: 'Smart Glasses', path: '#' },
        ],
      },
    ],
  },
  {
    title: 'Parent 3',
    path: '#',
    icon: <Iconify icon="eva:file-fill" {...ICON_SIZE} />,
  },
  {
    title: 'Parent 4',
    path: '#',
    icon: <Iconify icon="eva:file-fill" {...ICON_SIZE} />,
  },
];
