/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import axios from 'axios';

export const deleteUser = async (userid) => {
  await axios.delete(
    `https://api.chatengine.io/users/${userid}/`,
    { headers: { 'Private-Key': process.env.REACT_APP_CHAT_ENGINE_PRIVATE_KEY } },
  )

    .then((response) => response);
};
