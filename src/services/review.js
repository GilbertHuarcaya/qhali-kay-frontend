const URL_BASE = process.env.REACT_APP_API_URL_BASE;

const getReviews = () => {
  const payload = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return fetch(`${URL_BASE}/api/reviews`, payload);
};

// const registerAccount = (user) => {};
const postReview = (reviewForm) => {
  const token = localStorage.getItem('token');
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reviewForm),
  };

  return fetch(`${URL_BASE}/api/reviews`, payload);
};
// const forgotPassword = (email) => {};

const review = {
  getReviews,
  postReview,
  // forgotPassword,
};

export default review;
