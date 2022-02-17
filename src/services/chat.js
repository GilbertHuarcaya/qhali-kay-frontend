/* eslint-disable no-console */
import axios from 'axios';

const createUser = async (data) => {
  const res = await axios.post(
    'https://api.chatengine.io/users/',
    { ...data, custom_json: JSON.stringify(data.custom_json) },
    { headers: { 'Private-Key': process.env.REACT_APP_CHAT_ENGINE_PRIVATE_KEY } },
  );
  return res.data;
};

const deleteUser = (userid) => axios.delete(
  `https://api.chatengine.io/users/${userid}/`,
  { headers: { 'Private-Key': process.env.REACT_APP_CHAT_ENGINE_PRIVATE_KEY } },
);

const getUsers = () => axios.get(
  'https://api.chatengine.io/users/',
  { headers: { 'Private-Key': process.env.REACT_APP_CHAT_ENGINE_PRIVATE_KEY } },
);

const chat = {
  createUser,
  deleteUser,
  getUsers,
  // forgotPassword,
};

export default chat;
