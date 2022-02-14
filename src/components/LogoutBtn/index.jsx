import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/actions';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const { logout } = useAuth0();
  const logoutQhaliUser = (e) => {
    e.preventDefault();
    logout({ returnTo: window.location.origin });

    logoutUser(dispatch);
  };
  return (
    <button
      type="button"
      onClick={(e) => logoutQhaliUser(e)}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
