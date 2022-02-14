import axios from 'axios';

const URL_BASE = process.env.REACT_APP_API_URL_BASE;

const postFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post(`${URL_BASE}/api/uploads/file`, formData);
};

const postFiles = (files) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('file', file);
    formData.append('upload_preset', 'viz4umbi');
    formData.append('api_key', '454469217291652');
  });
  return axios.post(`${URL_BASE}/api/uploads/files`, formData);
};

const file = {
  postFile,
  postFiles,
};

export default file;
