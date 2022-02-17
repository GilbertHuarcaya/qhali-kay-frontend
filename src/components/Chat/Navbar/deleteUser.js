/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import axios from 'axios';

export const deleteUser = async (userid, successFunc) => {
  await axios.delete(
    `https://api.chatengine.io/users/${userid}/`,
    { headers: { 'Private-Key': process.env.REACT_APP_CHAT_ENGINE_PRIVATE_KEY } },
  )

    .then((response) => {
      successFunc(response.data);
    })

    .catch((error) => {
      console.log('Delete chat user', error.response);
    });
};
