import { useRef, memo } from 'react';
import Map, {
  Layer,
  Source,
  MapRef,
  LngLatLike,
  GeoJSONSource,
  MapLayerMouseEvent,
} from 'react-map-gl';
// components
import { MapBoxProps } from '../../../../../components/map';
//
import { clusterLayer, clusterCountLayer, unclusteredPointLayer } from './layers';

// ----------------------------------------------------------------------

function MapClusters({ ...other }: MapBoxProps) {
  const mapRef = useRef<MapRef>(null);

  const onClick = (event: MapLayerMouseEvent) => {
    const feature = event.features?.[0];

    const clusterId = feature?.properties?.cluster_id;

    const mapboxSource = mapRef.current?.getSource('earthquakes') as GeoJSONSource;

    mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err) {
        return;
      }

      if (feature?.geometry.type === 'Point') {
        mapRef.current?.easeTo({
          center: feature?.geometry.coordinates as LngLatLike | undefined,
          zoom: Number.isNaN(zoom) ? 3 : zoom,
          duration: 500,
        });
      }
    });
  };

  return (
    <>
      <Map
        initialViewState={{
          latitude: 40.67,
          longitude: -103.59,
          zoom: 3,
        }}
        interactiveLayerIds={[clusterLayer.id || '']}
        onClick={onClick}
        ref={mapRef}
        {...other}
      >
        <Source
          id="earthquakes"
          type="geojson"
          data="https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson"
          cluster
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...unclusteredPointLayer} />
        </Source>
      </Map>
    </>
  );
}

export default memo(MapClusters);
