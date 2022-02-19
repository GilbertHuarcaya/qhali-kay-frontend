/* eslint-disable react/prop-types */
import * as React from 'react';
import Map, {
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from 'react-map-gl';

const AffiliationsMap = ({ children }) => (
  <Map
    initialViewState={{
      longitude: -77.042793,
      latitude: -12.046374,
      zoom: 10,
      bearing: 0,
      pitch: 0,
    }}
    style={{ width: 'auto', height: '93vh', position: 'sticky', top: '60px' }}
    mapStyle="mapbox://styles/mapbox/streets-v9"
  >
    <GeolocateControl position="top-left" />
    <FullscreenControl position="top-left" />
    <NavigationControl position="top-left" />
    <ScaleControl />
    {children}
  </Map>
);
export default AffiliationsMap;
