import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { changePassword } from '../../../store/actions';
import useForm from '../../../hooks/useForm';

const eye = <FontAwesomeIcon icon={faEye} />;

const NewPassword = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const prefilledForm = {
    email: user.email,
  };
  const prefilledHospitalForm = {
    email: user.email,
    hospitalName: user.hospitalName,
  };
  const { form, handleChange } = useForm(user.hospitalName ? prefilledHospitalForm : prefilledForm);
  const [actualPasswordShown, setActualPasswordShown] = useState(false);
  const toggleActualPasswordVisiblity = () => {
    setActualPasswordShown(!actualPasswordShown);
  };

  const onKeyDownActual = (e) => {
    if (e.keyCode === 13 || e.keyCode === 32) {
      setActualPasswordShown(!actualPasswordShown);
    }
  };

  const [newPasswordShown, setNewPasswordShown] = useState(false);
  const toggleNewPasswordVisiblity = () => {
    setNewPasswordShown(!newPasswordShown);
  };

  const onKeyDownNew = (e) => {
    if (e.keyCode === 13 || e.keyCode === 32) {
      setNewPasswordShown(!newPasswordShown);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    changePassword(dispatch, form);
    navigate('/');
  };

  return (
    <form className="card card-profile" onSubmit={handleSubmit}>
      <h4 className="card__form__h4">Change Password</h4>
      <div className="card__form__group w-75">
        <p className="card__form__titulo">Current Password</p>
        <div className="pass-eye">
          <input
            name="password"
            type={actualPasswordShown ? 'text' : 'password'}
            onChange={handleChange}
            className="card__form__input"
            id="old-password"
          />
          <button
            type="button"
            className="password-btn"
            tabIndex="0"
            onKeyDown={onKeyDownActual}
            onClick={toggleActualPasswordVisiblity}
          >
            {eye}
          </button>
        </div>
      </div>
      <div className="card__form__group w-75">
        <p className="card__form__titulo">New Password</p>
        <div className="pass-eye">
          <input
            name="newPassword"
            type={newPasswordShown ? 'text' : 'password'}
            onChange={handleChange}
            className="card__form__input"
            id="new-password"
          />
          <button
            type="button"
            className="password-btn"
            tabIndex="0"
            onKeyDown={onKeyDownNew}
            onClick={toggleNewPasswordVisiblity}
          >
            {eye}
          </button>
        </div>
      </div>
      <button type="submit" className="btn btn-dark mt-5">
        Change
      </button>

      <p className="card__form__link">
        <Link to="/profile">Back</Link>
      </p>
    </form>
  );
};

export default NewPassword;
