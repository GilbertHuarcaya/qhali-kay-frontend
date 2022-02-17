import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginHospital, setCurrentUsers, setCurrentUser } from '../../store/actions';
import useForm from '../../hooks/useForm';

import './LoginForm.scss';
import logo from '../../images/logo.png';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { form, handleChange } = useForm({});
  const [formOk, setFormOk] = useState(0);
  const [formData, setFormData] = useState();

  useEffect(() => {
    const validateForm = () => {
      try {
        if (form?.password !== undefined) {
          const data = form?.password.length > 5;
          setFormOk(data);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    };
    validateForm();
  }, [handleChange]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = await loginHospital(dispatch, form);
    setFormData(data);
    setTimeout(() => {
      setFormData(null);
    }, 2500);
  };

  useEffect(() => {
    const validateLogin = async () => {
      if (user) {
        const users = await setCurrentUsers(dispatch);
        await setCurrentUser(user, users, dispatch);
        navigate('/');
      }
    };
    validateLogin();
  }, [handleSubmit]);

  return (
    <>
      <form className="form_login" onSubmit={handleSubmit}>
        <div className="form_login__logo">
          <Link to="/">
            <img
              className="form_login__logo__img"
              src={logo}
              alt="clens-logo"
            />
          </Link>
          <p className="form_login__logo__text">
            El mejor servicio, al mejor precio
          </p>
        </div>
        <div className="form_login__item">
          <input
            className="login-input_email"
            data-cy="login-input_email"
            name="email"
            type="email"
            placeholder="correo"
            value={undefined}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form_login__item">
          <input
            className="login-input_password"
            data-cy="login-input_password"
            name="password"
            type="password"
            value={undefined}
            placeholder="contraseña"
            onChange={handleChange}
            required
          />
        </div>
        <button
          className="form_login__button__login"
          data-cy="login-btn_login"
          type="submit"
          disabled={!formOk}
        >
          Ingresa
        </button>
        <p className="form_login__text">o Ingresa con:</p>
        <div className="form_login__logos_login">
          <Link to="/">
            <i className="bi bi-google me-2" />
          </Link>
        </div>
        <div className="to_register">
          <p className="form_login__text">¿Aún no tienes una cuenta?</p>
          <Link className="form_login__button__p" to="/register">
            Regístrate
          </Link>
        </div>
        <div className="to_recover">
          <p className="form_login__text">¿Olvidaste tu contraseña?</p>
          <Link className="form_login__button__p" to="/forgot-password">
            Recuperala
          </Link>
        </div>
      </form>
      {formData ? <p className="alert">{formData.message}</p> : null}
    </>
  );
};

export default Login;
