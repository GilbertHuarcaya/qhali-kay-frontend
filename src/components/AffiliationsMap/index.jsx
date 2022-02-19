import * as React from 'react';
import Map, { GeolocateControl } from 'react-map-gl';

const AffiliationsMap = () => (
  <Map
    initialViewState={{
      longitude: -77.042793,
      latitude: -12.046374,
      zoom: 10,
    }}
    style={{ width: 'auto', height: '93vh', position: 'sticky', top: '60px' }}
    mapStyle="mapbox://styles/mapbox/streets-v9"
  >
    <GeolocateControl />
  </Map>
);
export default AffiliationsMap;
