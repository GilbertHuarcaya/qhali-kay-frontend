const URL_BASE = process.env.REACT_APP_API_URL_BASE;

const loginHospital = ({ email, password }) => {
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  };

  return fetch(`${URL_BASE}/auth/local/loginHospital`, payload);
};

// const registerAccount = (user) => {};
const registerHospital = (hospital) => {
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      hospitalName: hospital?.username,
      photo: hospital?.photo,
      email: hospital?.email,
      password: hospital?.password,
    }),
  };
  return fetch(`${URL_BASE}/api/hospitals`, payload);
};

const patchUser = (hospital) => {
  const accessTokenObj = localStorage.getItem('token');

  const hospitalId = hospital.id;
  const payload = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessTokenObj}`,
    },
    body: JSON.stringify(hospital),
  };

  return fetch(`${URL_BASE}/api/users/${hospitalId}`, payload);
};

// obtener usuarios con role PERSONAL
const getAllHospitals = () => {
  const accessTokenObj = localStorage.getItem('token');

  const payload = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessTokenObj}`,
    },
  };

  return fetch(`${URL_BASE}/api/hospitals`, payload);
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
  getAllHospitals,
  getNearHospitals,
  loginHospital,
  registerHospital,
};

export default user;
