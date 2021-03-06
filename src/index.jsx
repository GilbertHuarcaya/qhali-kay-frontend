import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { Provider } from 'react-redux';
import mapboxgl from 'mapbox-gl';
import store from './store';
import './index.scss';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'mapbox-gl/dist/mapbox-gl.css';

// The following is required to stop "npm build" from transpiling mapbox code.
// notice the exclamation point in the import.
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, import/no-unresolved
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

ReactDOM.render(
  <Auth0Provider
    domain="dev-o8t9fu33.us.auth0.com"
    clientId="CmTupym5bO1CFfV7No30VXBdZojJVU2k"
    redirectUri={window.location.origin}
    audience="https://dev-o8t9fu33.us.auth0.com/api/v2/"
    scope="read:current_user update:current_user_metadata"
  >
    <Provider store={store}>
      <App />
    </Provider>
  </Auth0Provider>,
  document.getElementById('root'),
);
