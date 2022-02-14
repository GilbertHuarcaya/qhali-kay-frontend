/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import axios from 'axios';

export const createUser = (data, successFunc) => {
  axios.post(
    'https://api.chatengine.io/users/',
    { ...data, custom_json: JSON.stringify(data.custom_json) },
    { headers: { 'Private-Key': process.env.REACT_APP_CHAT_ENGINE_PRIVATE_KEY } },
  )

    .then((response) => {
      successFunc(response.data);
    })

    .catch((error) => {
      console.log('Create chat user', error.response);
    });
};
