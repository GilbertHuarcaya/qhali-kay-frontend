/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState, createContext } from 'react';

export const Context = createContext();

export const ContextProvider = (props) => {
  const [currentUser, setCurrentUser] = useState({});
  const [users, setUsers] = useState([]);

  const value = {
    currentUser,
    setCurrentUser,
    users,
    setUsers,
  };

  return (
    <Context.Provider value={value}>
      { currentUser && props.children }
    </Context.Provider>
  );
};
