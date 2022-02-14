import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import { Provider } from 'react-redux';
import store from './store';
import './index.scss';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

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
