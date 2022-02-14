const URL_BASE = process.env.REACT_APP_API_URL_BASE;

const postCardToken = (cardInfo) => {
  const accessTokenObj = localStorage.getItem('token');

  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessTokenObj}`,
    },
    body: JSON.stringify(cardInfo),
  };

  return fetch(`${URL_BASE}/api/payments/card-token`, payload);
};

const postCustomerToken = (customerInfo) => {
  const accessTokenObj = localStorage.getItem('token');

  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessTokenObj}`,
    },
    body: JSON.stringify(customerInfo),
  };

  return fetch(`${URL_BASE}/api/payments/customer`, payload);
};

const postPayment = (payment) => {
  const accessTokenObj = localStorage.getItem('token');

  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessTokenObj}`,
    },
    body: JSON.stringify(payment),
  };

  return fetch(`${URL_BASE}/api/payments/make-payment`, payload);
};

const review = {
  postCardToken,
  postCustomerToken,
  postPayment,
};

export default review;
