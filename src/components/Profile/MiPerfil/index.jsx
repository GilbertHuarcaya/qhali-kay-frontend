import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { patchUserData } from '../../../store/actions';
import useForm from '../../../hooks/useForm';

const MiPerfil = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const prefilledForm = {
    direccion: user.direccion,
    telefono: user.telefono,
  };
  const { form, handleChange } = useForm(prefilledForm);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await patchUserData(dispatch, {
      id: user.id,
      direccion: form.direccion,
      telefono: form.telefono,
    });
  };
  return (
    <form className="card card-profile pt-3">
      <h5 className="card__form__h5">
        You can see you own information:
      </h5>
      <div className="card__form__group w-75">
        <p className="card__form__titulo">
          FullName
          {' '}
          <small> - No edit</small>
        </p>
        <input
          type="text"
          id="nombre"
          name="fullname"
          className="card__form__input"
          defaultValue={user.fullname}
          disabled
        />
      </div>
      <div className="card__form__group w-75">
        <p className="card__form__titulo">NickName</p>
        <input
          type="text"
          id="userName"
          name="userName"
          className="card__form__input"
          onChange={handleChange}
          defaultValue={user.userName}
        />
      </div>
      <div className="card__form__group w-75">
        <p className="card__form__titulo">Teléfono</p>
        <input
          type="tel"
          id="telefono"
          name="telefono"
          className="card__form__input"
          onChange={handleChange}
          defaultValue={user.telefono}
        />
      </div>
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
