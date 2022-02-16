import axios from 'axios';

const URL_BASE = process.env.REACT_APP_API_URL_BASE;

const patchUser = (user) => {
  const accessTokenObj = localStorage.getItem('token');

  const userId = user.id;
  const payload = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessTokenObj}`,
    },
    body: JSON.stringify(user),
  };

  return fetch(`${URL_BASE}/api/users/${userId}`, payload);
};
// const forgotPassword = (email) => {};
const sendUserEmail = (form) => {
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  };
  return fetch(`${URL_BASE}/api/users/email`, payload);
};

const postulaPersonal = (form) => {
  const formData = new FormData();
  const { files } = form;

  files.forEach((file) => {
    formData.append('file', file);
    formData.append('upload_preset', 'viz4umbi');
    formData.append('api_key', '454469217291652');
  });
  formData.append('celular', form.celular);
  formData.append('direccion', form.direccion);
  formData.append('email', form.email);
  formData.append('fullname', form.fullname);
  formData.append('identificacion', form.identificacion);

  return axios.post(`${URL_BASE}/api/users/postula`, formData);
};

// obtener usuarios con role PERSONAL
const getAllRolePersonalService = () => {
  const accessTokenObj = localStorage.getItem('token');

  const payload = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessTokenObj}`,
    },
  };

  return fetch(`${URL_BASE}/api/users/personalclens`, payload);
};

export const getNearHospitals = (data) => {
  const accessTokenObj = localStorage.getItem('token');

  const payload = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessTokenObj}`,
    },
  };

  return fetch(`${URL_BASE}/api/hospitals/search/${data.lat},${data.lng}`, payload);
};

const user = {
  patchUser,
  sendUserEmail,
  getAllRolePersonalService,
  postulaPersonal,
  getNearHospitals,
  // forgotPassword,
};

export default user;
