/* eslint-disable no-console */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useContext, useRef, useEffect, useState } from 'react';

import { Link, NavLink } from 'react-router-dom';
import { sellers } from '../data';
import { Context } from '../data/context';
import { getUsers } from './getUsers';
import { createUser } from './createUser';
import UserModal from './UserModal';
import Navigation from '../../Navigation';

const Navbar = () => {
  const didMountRef = useRef(false);
  const [current, setCurrent] = useState(null);
  const { currentUser, setCurrentUser, setUsers } = useContext(Context);

  async function syncUsers() {
    getUsers((users) => {
      console.log('Fetched users', users.map((e) => ({ ...e, custom_json: JSON.parse(e.custom_json) })));
      let usersWereAdded = false;
      sellers.map((seller) => {
        if (!users.find((user) => seller.username === user.username)) {
          console.log('Creating user', seller.username);
          createUser(seller);
          usersWereAdded = true;
        }
      });
      if (usersWereAdded) window.location.reload();
      setUsers(users);
      setCurrentUser(sellers[0]);
    });
  }

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      syncUsers();
    }
  });

  return (

    null

  );
};

export default Navbar;
