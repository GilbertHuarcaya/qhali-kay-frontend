/* eslint-disable no-console */
/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
import React, { useContext, useRef, useEffect, useState } from 'react';

import { Link, NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Context } from '../data/context';
import { getUsers } from './getUsers';
import { createUser } from './createUser';
import { deleteUser } from './deleteUser';
import { getHospitalsFromGoogle } from '../../../store/actions';
import UserModal from './UserModal';
import Navigation from '../../Navigation';

const Navbar = () => {
  const didMountRef = useRef(false);
  const [current, setCurrent] = useState(null);
  const hospitals = useSelector((state) => state.hospitals);
  const dispatch = useDispatch();
  const [lat, setLat] = useState();
  const [lng, setLng] = useState();
  const { currentUser, setCurrentUser, setUsers, setHospitals } = useContext(Context);
  useEffect(() => {
    const fetchData = async () => {
      await navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      });
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (lat && lng) {
        getHospitalsFromGoogle({ lat, lng }, dispatch);
      }
    };
    fetchData();
  }, [lat, lng]);

  async function syncUsers() {
    getUsers((users) => {
      console.log('Fetched users', users.map((e) => ({ ...e, custom_json: JSON.parse(e.custom_json) })));
      if (users.lenght > 20) {
        users.map((user) => {
          deleteUser(user.id);
        });
      }
      let usersWereAdded = false;

      hospitals.map((hospital) => {
        if (!users.find((user) => hospital.username === user.username)) {
          console.log('Creating user', hospital.username);
          createUser(hospital);
          usersWereAdded = true;
        }
      });
      if (usersWereAdded) console.log('completed');
      setHospitals(hospitals);
      setUsers(users);
      setCurrentUser(users[0]);
    });
  }

  useEffect(() => {
    if (hospitals) {
      didMountRef.current = true;
      syncUsers();
    }
  }, [hospitals]);

  return (

    null

  );
};

export default Navbar;
