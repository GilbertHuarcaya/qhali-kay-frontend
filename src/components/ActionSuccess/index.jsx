/* eslint-disable react/prop-types */
import React from 'react';
import './styles.scss';
import { Link } from 'react-router-dom';

const ActionSuccess = ({
  title,
  message = '',
  redirect = '/',
  button,
  visible = false,
  handleClose,
}) => (
  <div className={`action-success ${visible ? 'qhali-modal' : 'qhali-modal-hidden'}`}>
    <div className="qhali-modal-content">
      <button type="button" className="close" onClick={handleClose}>
        &times;
      </button>
      {title ? <h2 className="action-success--title">{title}</h2> : null}
      <article className="action-success__wrapper">
        <p className="action-success__wrapper--message">{message}</p>
        {button ? (
          <Link
            className="action-success__wrapper--button"
            onClick={handleClose}
            to={redirect}
          >
            {button}
          </Link>
        ) : null}
      </article>
    </div>
  </div>
);

export default ActionSuccess;
