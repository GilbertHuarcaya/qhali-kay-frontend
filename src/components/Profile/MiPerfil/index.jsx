import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { patchUserData } from '../../../store/actions';
import useForm from '../../../hooks/useForm';

const MiPerfil = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  /*   const prefilledForm = {
    firstName: user.firstName,
    lastName: user.lastName,
    userName: user.userName,
    hospitalName: user.hospitalName,
  }; */
  const { form, handleChange } = useForm({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    await patchUserData(dispatch, {
      ...form, id: user.id,
    });
  };
  return (
    <form className="card card-profile pt-3">
      <h5 className="card__form__h5">
        You can see you own information:
      </h5>

      <div className=" d-flex w-75">
        {user?.firstName ? (
          <div className="card__form__group w-50">
            <p className="card__form__titulo">
              firstName
            </p>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="card__form__input"
              defaultValue={user.firstName}
            />
          </div>
        ) : null}

        {user?.lastName ? (
          <div className="card__form__group w-50">
            <p className="card__form__titulo">
              lastName
            </p>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="card__form__input"
              defaultValue={user.lastName}
            />
          </div>

        ) : null}
      </div>
      {user?.userName ? (
        <div className="card__form__group w-75">
          <p className="card__form__titulo">userName</p>
          <input
            type="text"
            id="userName"
            name="userName"
            className="card__form__input"
            onChange={handleChange}
            defaultValue={user.userName}
          />
        </div>
      ) : null}

      {user?.hospitalName ? (
        <div className="card__form__group w-75">
          <p className="card__form__titulo">hospitalName</p>
          <input
            type="text"
            id="hospitalName"
            name="hospitalName"
            className="card__form__input"
            onChange={handleChange}
            defaultValue={user.hospitalName}
          />
        </div>
      ) : null}

      <h4 className="card__form__h4">Login information:</h4>
      <div className="card__form__group w-75">
        <p className="card__form__titulo">
          Email
          {' '}
          <small> - No edit</small>
        </p>
        <input
          name="email"
          type="email"
          onChange={handleChange}
          className="card__form__input"
          defaultValue={user.email}
          disabled
        />
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        className="btn btn-dark mt-5"
      >
        Update
      </button>
      <p className="card__form__link">
        <Link to="/profile/change-password">
          Change Password
        </Link>
      </p>
    </form>
  );
};

export default MiPerfil;
