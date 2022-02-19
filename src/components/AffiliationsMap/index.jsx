/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable import/no-unresolved */
/* eslint-disable react/prop-types */
import * as React from 'react';
import Map, {
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from '!react-map-gl';

const mapToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const AffiliationsMap = ({ children }) => (
  <Map
    initialViewState={{
      longitude: -77.042793,
      latitude: -12.046374,
      zoom: 10,
      bearing: 0,
      pitch: 0,
    }}
    id="mapbox"
    style={{ minWidth: '48vw', maxWidth: '100vw', minHeight: '50vh', maxHeight: '93vh', position: 'sticky', top: '60px' }}
    mapStyle="mapbox://styles/mapbox/streets-v9"
    mapboxAccessToken={mapToken}
  >
    <GeolocateControl position="top-left" />
    <FullscreenControl position="top-left" />
    <NavigationControl position="top-left" />
    <ScaleControl />
    {children}
  </Map>
);
export default AffiliationsMap;
