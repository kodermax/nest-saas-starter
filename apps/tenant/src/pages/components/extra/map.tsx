// next
import Head from 'next/head';
import dynamic from 'next/dynamic';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Container, CardHeader, CardContent } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// config
import { MAPBOX_API } from '../../../config';
// _mock_
import { cities as CITIES } from '../../../_mock/map/cities';
import { countries as COUNTRIES } from '../../../_mock/map/countries';
// layouts
import MainLayout from '../../../layouts/main';
// components
import CustomBreadcrumbs from '../../../components/custom-breadcrumbs';
// sections
const MapHeatmap = dynamic(() => import('../../../sections/_examples/extra/map/heatmap'));
const MapClusters = dynamic(() => import('../../../sections/_examples/extra/map/clusters'));
const MapInteraction = dynamic(() => import('../../../sections/_examples/extra/map/interaction'));
const MapChangeTheme = dynamic(() => import('../../../sections/_examples/extra/map/change-theme'));
const MapMarkersPopups = dynamic(
  () => import('../../../sections/_examples/extra/map/MapMarkersPopups')
);
const MapDraggableMarkers = dynamic(
  () => import('../../../sections/_examples/extra/map/draggable-markers')
);
const MapGeoJSONAnimation = dynamic(
  () => import('../../../sections/_examples/extra/map/MapGeoJSONAnimation')
);
const MapViewportAnimation = dynamic(
  () => import('../../../sections/_examples/extra/map/viewport-animation')
);
const MapHighlightByFilter = dynamic(
  () => import('../../../sections/_examples/extra/map/MapHighlightByFilter')
);
const MapSideBySide = dynamic(() => import('../../../sections/_examples/extra/map/side-by-side'));

// ----------------------------------------------------------------------

const THEMES = {
  streets: 'mapbox://styles/mapbox/streets-v11',
  outdoors: 'mapbox://styles/mapbox/outdoors-v11',
  light: 'mapbox://styles/mapbox/light-v10',
  dark: 'mapbox://styles/mapbox/dark-v10',
  satellite: 'mapbox://styles/mapbox/satellite-v9',
  satelliteStreets: 'mapbox://styles/mapbox/satellite-streets-v11',
};

const baseSettings = {
  mapboxAccessToken: MAPBOX_API,
  minZoom: 1,
};

const StyledMapContainer = styled('div')(({ theme }) => ({
  zIndex: 0,
  height: 560,
  overflow: 'hidden',
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  '& .mapboxgl-ctrl-logo, .mapboxgl-ctrl-bottom-right': {
    display: 'none',
  },
}));

// ----------------------------------------------------------------------

DemoMapPage.getLayout = (page: React.ReactElement) => <MainLayout>{page}</MainLayout>;

// ----------------------------------------------------------------------

export default function DemoMapPage() {
  return (
    <>
      <Head>
        <title> Extra Components: Map | Minimal UI</title>
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
            heading="Map"
            links={[
              {
                name: 'Components',
                href: PATH_PAGE.components,
              },
              { name: 'Map' },
            ]}
            moreLink={[
              'http://visgl.github.io/react-map-gl',
              'http://visgl.github.io/react-map-gl/examples',
            ]}
          />
        </Container>
      </Box>

      <Container sx={{ my: 10 }}>
        <Stack spacing={5}>
          <Card>
            <CardHeader title="Change Theme" />
            <CardContent>
              <StyledMapContainer>
                <MapChangeTheme {...baseSettings} themes={THEMES} />
              </StyledMapContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Markers & Popups" />
            <CardContent>
              <StyledMapContainer>
                <MapMarkersPopups {...baseSettings} data={COUNTRIES} mapStyle={THEMES.light} />
              </StyledMapContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Draggable Markers" />
            <CardContent>
              <StyledMapContainer>
                <MapDraggableMarkers {...baseSettings} mapStyle={THEMES.light} />
              </StyledMapContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Geojson Animation" />
            <CardContent>
              <StyledMapContainer>
                <MapGeoJSONAnimation {...baseSettings} mapStyle={THEMES.satelliteStreets} />
              </StyledMapContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Clusters" />
            <CardContent>
              <StyledMapContainer>
                <MapClusters {...baseSettings} mapStyle={THEMES.light} />
              </StyledMapContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Interaction" />
            <CardContent>
              <StyledMapContainer>
                <MapInteraction {...baseSettings} mapStyle={THEMES.light} />
              </StyledMapContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Viewport Animation" />
            <CardContent>
              <StyledMapContainer>
                <MapViewportAnimation
                  {...baseSettings}
                  data={CITIES.filter((city) => city.state === 'Texas')}
                  mapStyle={THEMES.light}
                />
              </StyledMapContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Highlight By Filter" />
            <CardContent>
              <StyledMapContainer>
                <MapHighlightByFilter {...baseSettings} mapStyle={THEMES.light} />
              </StyledMapContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Heatmap" />
            <CardContent>
              <StyledMapContainer>
                <MapHeatmap {...baseSettings} mapStyle={THEMES.light} />
              </StyledMapContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader title="Side By Side" />
            <CardContent>
              <StyledMapContainer>
                <MapSideBySide {...baseSettings} />
              </StyledMapContainer>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </>
  );
}
