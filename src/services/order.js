const URL_BASE = process.env.REACT_APP_API_URL_BASE;

const getAllOrders = () => {
  const accessTokenObj = localStorage.getItem('token');

  const payload = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessTokenObj}`,
    },
  };

  return fetch(`${URL_BASE}/api/orders`, payload);
};

// const registerAccount = (user) => {};
const postOrder = (order) => {
  const accessTokenObj = localStorage.getItem('token');

  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessTokenObj}`,
    },
    body: JSON.stringify(order),
  };

  return fetch(`${URL_BASE}/api/orders`, payload);
};
// const forgotPassword = (email) => {};

const getUserOrdersByUserId = (userId) => {
  const accessTokenObj = localStorage.getItem('token');

  const payload = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessTokenObj}`,
    },
  };

  return fetch(`${URL_BASE}/api/orders/user/${userId}`, payload);
};

const patchUserOrder = (order) => {
  const accessTokenObj = localStorage.getItem('token');
  // eslint-disable-next-line no-underscore-dangle
  const orderId = order._id;
  const payload = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessTokenObj}`,
    },
    body: JSON.stringify(order),
  };

  return fetch(`${URL_BASE}/api/orders/${orderId}`, payload);
};

const getOrderById = (orderId) => {
  const accessTokenObj = localStorage.getItem('token');

  const payload = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessTokenObj}`,
    },
  };
  return fetch(`${URL_BASE}/api/orders/${orderId}`, payload);
};

const review = {
  getAllOrders,
  postOrder,
  getUserOrdersByUserId,
  patchUserOrder,
  getOrderById,
  // forgotPassword,
};

export default review;
