/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-debugger */
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

import {
  LOGIN_USER,
  LOGOUT_USER,
  SET_LOADING,
  GET_USER_FROM_LOCALSTORAGE,
  GET_ALL_REVIEWS,
  GET_ALL_ORDERS,
  GET_ORDERS_FROM_USER,
  GET_ORDER_FORM,
  POST_USER_REVIEW,
  POST_USER_ORDER,
  GET_ORDER_BY_ID,
  GET_PENDING_ORDER,
  PATCH_USER_ORDER,
  GET_PENDING_REVIEW,
  UPLOAD_FILE,
  FORGOT_PASSWORD,
  USER_CREATE_VALIDATION,
  POST_CARD_TOKEN,
  POST_CUSTOMER_TOKEN,
  POST_PAYMENT,
  GET_ROLE_PERSONAL,
  ASIGN_PERSONAL_TO_ORDER,
  POST_POSTULA_PERSONAL,
  GET_GOOGLE_HOSPITALS,
  SET_CURRENT_HOSPITAL,
  SET_CURRENT_USERS,
  SET_CURRENT_USER,
  LOGIN_HOSPITAL,
  GET_ALL_HOSPITALS,
  SET_QUERY,
} from './constants';

import authService from '../services/auth';
import reviewService from '../services/review';
import orderService from '../services/order';
import uploadService from '../services/upload';
import userService from '../services/user';
import hospitalService from '../services/hospital';
import orderPayment from '../services/payment';
import chatService from '../services/chat';

export const setQuery = (query, dispatch) => {
  dispatch({ type: SET_QUERY, payload: query });
};

export const getAllHospitalsFromDB = async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await hospitalService.getAllHospitals();
    const data = await response.json();

    if (response.ok) {
      dispatch({ type: GET_ALL_HOSPITALS, payload: data });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const setCurrentUsers = async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await chatService.getUsers();
    if (response.status === 200) {
      const parsed = response.data.map((e) => ({ ...e, custom_json: JSON.parse(e.custom_json) }));
      dispatch({ type: SET_CURRENT_USERS, payload: parsed });
      return parsed;
    }
    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    return console.error(error);
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const loginHospital = async (dispatch, hospital) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await hospitalService.loginAccount(hospital);

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      const decoded = jwt_decode(data.token);
      dispatch({ type: LOGIN_HOSPITAL, payload: decoded });
    }
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    return console.error(error);
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const setCurrentUser = async (user, users, dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const existingUser = users.find(
      (u) => user.userName === u.username || user.hospitalName === u.username,
    );
    if (!existingUser) {
      const currentUser = await chatService.createUser({
        first_name: user.fullname || user.hospitalName,
        last_name: user.fullname || user.hospitalName,
        username: user.userName || user.hospitalName,
        secret: user.email,
        email: user.email,
      });
      return dispatch({ type: SET_CURRENT_USER, payload: currentUser });
    }

    return dispatch({ type: SET_CURRENT_USER, payload: existingUser });
  } catch (error) {
    // eslint-disable-next-line no-console
    return console.error(error);
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const createChat = async (header, data, dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const currentUser = await chatService.getOrCreateChat({
      header, data,
    });

    dispatch({ type: SET_CURRENT_USER, payload: null });
    return currentUser;
  } catch (error) {
    // eslint-disable-next-line no-console
    return console.error(error);
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const createChatHospital = async (hospital, dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await chatService.createUser(hospital);

    if (response) {
      const parsed = { ...response, custom_json: JSON.parse(response.custom_json) };
      dispatch({ type: SET_CURRENT_HOSPITAL, payload: parsed });
      return parsed;
    }
    return null;
  } catch (error) {
    // eslint-disable-next-line no-console
    return console.error(error);
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const setCurrentHospital = (hospital, dispatch) => {
  dispatch({ type: SET_CURRENT_HOSPITAL, payload: hospital });
  return hospital;
};

export const getHospitalsFromGoogle = async (location, dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await hospitalService.getNearHospitals(location);
    const data = await response.json();

    if (response.ok) {
      dispatch({ type: GET_GOOGLE_HOSPITALS, payload: data });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const getNextPageHospitalsFromGoogle = async (nextPageToken, dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await hospitalService.getNearNextPageHospitals(nextPageToken);
    const data = await response.json();

    if (response.ok) {
      dispatch({ type: GET_GOOGLE_HOSPITALS, payload: data });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const postUserCardToken = async (dispatch, form) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await orderPayment.postCardToken(form);
    const data = await response.json();

    if (response.ok) {
      dispatch({ type: POST_CARD_TOKEN, payload: {} });
    }
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    return error;
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const postUserCustomerToken = async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await orderPayment.postCustomerToken();
    const data = await response.json();

    if (response.ok) {
      dispatch({ type: POST_CUSTOMER_TOKEN, payload: {} });
    }
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    return error;
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const postUserPayment = async (dispatch, form) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await orderPayment.postPayment(form);
    const data = await response.json();

    if (response.ok) {
      dispatch({ type: POST_PAYMENT, payload: {} });
    }
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    return error;
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const getUserFromLocalStorage = async (dispatch) => {
  const token = localStorage.getItem('token');

  if (token) {
    const decoded = jwt_decode(token);
    const response = decoded.hospitalName
      ? await hospitalService.revalidateHospitalToken(decoded.email)
      : await authService.revalidateToken(decoded.email);
    const data = await response.json();

    if (response.status === 401) {
      localStorage.removeItem('token');
      dispatch({ type: LOGOUT_USER, payload: null });
      return 'Your sesion expired, please sign in again';
    }

    if (response.status === 200) {
      localStorage.setItem('token', data);
      const decoded2 = jwt_decode(data);
      dispatch({ type: LOGIN_USER, payload: decoded2 });
    }

    return dispatch({ type: GET_USER_FROM_LOCALSTORAGE, payload: decoded });
  }
  return dispatch({ type: LOGOUT_USER, payload: null });
};

export const loginUser = async (dispatch, user) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await authService.loginAccount(user);

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      const decoded = jwt_decode(data.token);
      dispatch({ type: LOGIN_USER, payload: decoded });
    }
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    return console.error(error);
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const registerUser = async (dispatch, newUser) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await authService.registerAccount(newUser);
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('userToken', data.serverToken);
      const decoded = jwt_decode(data.token);
      dispatch({ type: LOGIN_USER, payload: decoded });
    }
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    return console.error(error);
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const logoutUser = (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('userToken');

  dispatch({ type: LOGOUT_USER, payload: null });
};

export const getReviewsFromDB = async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await reviewService.getReviews();

    const data = await response.json();

    if (response.ok) {
      dispatch({ type: GET_ALL_REVIEWS, payload: data });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const getOrderForm = (dispatch, form) => {
  dispatch({ type: GET_ORDER_FORM, payload: form });
};

export const getUserOrdersFromDB = async (dispatch, userid) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await orderService.getUserOrdersByUserId(userid);

    const data = await response.json();

    if (response.ok) {
      dispatch({ type: GET_ORDERS_FROM_USER, payload: data });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const postUserReview = async (dispatch, form) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await reviewService.postReview(form);
    if (response.ok) {
      dispatch({ type: POST_USER_REVIEW, payload: null });
      return response;
    }
    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    return console.error(error);
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const postUserOrder = async (dispatch, form) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await orderService.postOrder(form);

    if (response.ok) {
      dispatch({ type: POST_USER_ORDER, payload: {} });
      return response;
    }
    return 'Orden no enviada, porfavor contacte al administrador';
  } catch (error) {
    // eslint-disable-next-line no-console
    return console.error(error);
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const getPendingOrderFromOrders = async (dispatch, orders) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    if (orders.length > 0) {
      const pendingOrder = await orders.filter((e) => e.completed === false);
      if (pendingOrder.length > 0) {
        dispatch({ type: GET_PENDING_ORDER, payload: pendingOrder });
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const patchUserOrder = async (dispatch, order) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await orderService.patchUserOrder(order);

    if (response.ok) {
      dispatch({ type: PATCH_USER_ORDER, payload: [] });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const getPendingReviewFromOrders = async (dispatch, orders) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    if (orders.length > 0) {
      const pendingReview = await orders;
      if (pendingReview.length > 0) {
        dispatch({ type: GET_PENDING_REVIEW, payload: pendingReview });
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const getOrderById = async (dispatch, orderid) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await orderService.getOrderById(orderid);

    const data = await response.json();

    if (response.ok) {
      dispatch({ type: GET_ORDER_BY_ID, payload: data });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const postUploadFile = async (dispatch, file, user) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await uploadService.postFile(file);

    if (response.status === 200) {
      const newData = {
        ...user,
        photo: response.data,
      };
      const userResponse = user.hospitalName
        ? await hospitalService.patchHospital(newData)
        : await userService.patchUser(newData);

      const userData = await userResponse.json();

      if (userResponse.ok) {
        localStorage.setItem('token', userData.token);
        const decoded = jwt_decode(userData.token);
        dispatch({ type: UPLOAD_FILE, payload: decoded });
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const postUploadFiles = async (dispatch, files) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await uploadService.postFiles(files);
    if (response.status === 200) {
      dispatch({ type: POST_POSTULA_PERSONAL, payload: response });
    }
  } catch (error) {
    throw new Error(error);
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const changePassword = async (dispatch, form) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = form.hospitalName
      ? await authService.setNewHospitalPassword(form)
      : await authService.setNewPassword(form);

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      const decoded = jwt_decode(data.token);
      dispatch({ type: FORGOT_PASSWORD, payload: decoded });
    }
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    return console.error(error);
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const validateUser = async (dispatch, userToken) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const decoded = jwt_decode(userToken);

    const response = await authService.userCreateValidation(
      userToken,
      decoded.id,
    );
    const data = await response.json();

    if (response.ok) {
      dispatch({ type: USER_CREATE_VALIDATION });
    }
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    return console.error(error);
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const sendUserEmailResetPassword = async (dispatch, form) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await userService.sendUserEmail(form);
    const data = await response.json();
    if (!response.ok) {
      return data;
    }
    return response;
  } catch (error) {
    // eslint-disable-next-line no-console
    return console.log(error);
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const sendContactUsEmail = async (dispatch, form) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await userService.contactUs(form);
    return response;
  } catch (error) {
    throw new Error(error);
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const resetPassword = async (dispatch, form) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await authService.resetPassword(form);
    const data = await response.json();
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    return console.error(error);
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const getAllOrders = async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await orderService.getAllOrders();
    const data = await response.json();

    if (response.ok) {
      dispatch({ type: GET_ALL_ORDERS, payload: data });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const patchPersonalDisponibility = async (dispatch, form) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await userService.patchUser({
      id: form.userId,
      disponibility: form,
    });
    const data = await response.json();

    if (response.ok) {
      return response;
    }
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    return console.error(error);
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const getAllRolePersonal = async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await userService.getAllRolePersonalService();
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: GET_ROLE_PERSONAL, payload: data });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const patchUserData = async (dispatch, form) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = form.hospitalName
      ? await hospitalService.patchHospital(form)
      : await userService.patchUser(form);
    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      const decoded = jwt_decode(data.token);
      dispatch({ type: LOGIN_USER, payload: decoded });
    }
    return data;
  } catch (error) {
    // eslint-disable-next-line no-console
    return console.error(error);
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const asignPersonalToOrder = async (dispatch, order) => {
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const response = await orderService.patchUserOrder(order);

    if (response.ok) {
      dispatch({ type: ASIGN_PERSONAL_TO_ORDER, payload: null });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};
