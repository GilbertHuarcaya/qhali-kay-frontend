const URL_BASE = process.env.REACT_APP_API_URL_BASE;

const loginAccount = ({ email, password }) => {
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  };

  return fetch(`${URL_BASE}/auth/local/login`, payload);
};

// const registerAccount = (user) => {};
const registerAccount = (user) => {
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      firstName: user?.given_name,
      lastName: user?.family_name,
      userName: user?.nickname,
      email: user?.email,
      password: user?.email,
      isVerified: user?.email_verified,
    }),
  };
  return fetch(`${URL_BASE}/api/users`, payload);
};

// const forgotPassword = (email) => {};
const forgotPassword = ({ email, password, newPassword }) => {
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, newPassword }),
  };
  return fetch(`${URL_BASE}/auth/local/change-password`, payload);
};

const revalidateToken = (email) => {
  const accessTokenObj = localStorage.getItem('token');
  const payload = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessTokenObj}`,
    },
  };
  return fetch(`${URL_BASE}/api/users/email/${email}`, payload);
};

const resetPassword = (form) => {
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(form),
  };
  return fetch(`${URL_BASE}/auth/local/reset-password`, payload);
};

const userCreateValidation = (userToken, id) => {
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id }),
  };
  return fetch(`${URL_BASE}/auth/local/validate-email/${userToken}`, payload);
};

const auth = {
  loginAccount,
  registerAccount,
  revalidateToken,
  forgotPassword,
  userCreateValidation,
  resetPassword,
};

export default auth;
