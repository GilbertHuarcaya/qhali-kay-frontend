import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/actions';
import { deleteUser } from '../Chat/Navbar/deleteUser';

const LogoutButton = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, logout } = useAuth0();
  const currentUser = useSelector((state) => state.currentUser);
  const logoutQhaliUser = (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      logout({ returnTo: window.location.origin });
    }
    deleteUser(currentUser.id);
    logoutUser(dispatch);
  };
  return (
    <button
      type="button"
      className="btn btn-danger px-3 text-qhali w-100"
      onClick={(e) => logoutQhaliUser(e)}
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
