import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { Col, Row } from 'react-bootstrap';
import { postUploadFile } from '../../store/actions';

import './styles.scss';
import Loader from '../Loader';

const CLOUD = process.env.REACT_APP_CLOUD_NAME;

const Profile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [toggleClassBtnUser, setToggleCLassBtnUser] = useState('false');
  const [file, setFile] = useState(null);
  const [blocked, setBlocked] = useState(true);
  const cld = new Cloudinary({
    cloud: {
      cloudName: CLOUD,
    },
  });

  const onChangeFile = (e) => {
    setFile(e.target.files[0]);

    setBlocked(!true);
  };

  const handlerUserPhoto = () => {
    if (!toggleClassBtnUser) {
      return setToggleCLassBtnUser(true);
    }
    return setToggleCLassBtnUser(false);
  };
  const onSubmitFoto = async (e) => {
    e.preventDefault();
    await postUploadFile(dispatch, file, user);
    handlerUserPhoto();
  };
  return (
    <div className="card--desktop">
      <Row className="justify-content-center w-100">
        <Col xs={11} sm={3} md={3} lg={4} className="d-flex flex-column align-items-end px-0">
          <div className="card card-principal h-100 justify-content-start">
            <h1 className="card__form__h2">Profile</h1>
            <button
              type="button"
              className="card__user-img"
              onClick={handlerUserPhoto}
            >
              {user ? <AdvancedImage cldImg={cld.image(user.photo.id || 'cld-sample')} /> : <Loader />}
            </button>
            <Row className="d-flex align-items-center justify-content-center">
              <Col><Link to="/profile" className="nav-link text-center">Personal</Link></Col>
              <Col>
                <Link to="/profile/change-password" className="nav-link text-center">
                  Password
                </Link>
              </Col>
            </Row>
          </div>
        </Col>
        <Col xs={11} sm={9} md={6} className="d-flex flex-column align-items-left justify-content-center px-0">{user ? <Outlet /> : <Loader />}</Col>
      </Row>

      <div
        className={
          toggleClassBtnUser
            ? 'card__form__change-photo'
            : 'card__form__change-photo is-active-change-photo'
        }
        id="menu-perfil"
      >
        <form className="card__form">
          <h4 className="card__form__h4">Cambie su foto</h4>
          <button
            type="button"
            className="card__form__close"
            onClick={handlerUserPhoto}
          >
            &times;
          </button>
          <div className="card__form__group">
            <p className="card__form__titulo">Foto</p>
            <input
              type="file"
              name="file"
              id="file"
              onChange={onChangeFile}
              accept="image/*"
              className="card__form__input"
            />
            <button
              className="i-btn"
              type="submit"
              tabIndex="0"
              disabled={blocked}
            >
              {blocked ? null : '✔'}
            </button>
          </div>
          <button
            type="button"
            onClick={onSubmitFoto}
            className="card__form__btn"
          >
            Actualizar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
