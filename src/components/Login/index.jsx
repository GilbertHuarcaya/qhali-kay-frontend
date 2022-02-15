import React, { useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import swal from 'sweetalert';
import { Link /* , useHistory, useLocation  */ } from 'react-router-dom';
import logo from '../../images/logo.png';
import './styles.scss';

const Login = () => {
  /* const history = useHistory(); */
  /* const location = useLocation(); */
  /* const { from } = location.state || { from: { pathname: "/" } }; */
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '',
    success: false,
  });
  /* const [loggedInUser, setLoggedInUser] = useContext(UserContext); */

  const handleBlur = (event) => {
    let isFieldValid = true;
    if (event.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
    }
    if (event.target.name === 'password' && event.target.value !== '') {
      isFieldValid = event.target.value.length > 6 && /\d{1}/.test(event.target.value);
      if (!isFieldValid && newUser) {
        swal(
          'Authentication Problem!',
          'Password is too short and using numbers and letters',
          'error',
        );
      }
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  };

  const checkPassword = () => {
    const formBasicPassword = document.getElementById('formBasicPassword').value;
    const formBasicConfirmPassword = document.getElementById(
      'formBasicConfirmPassword',
    ).value;
    if (
      formBasicPassword !== formBasicConfirmPassword
      && formBasicPassword !== ''
    ) {
      swal('Authentication Problem!', 'Password not match', 'error');
    }
  };

  document.title = newUser ? 'Create Your account' : 'Login Page';

  return (
    <Container className="d-flex align-items-center login">
      <Row className="w-100 mx-auto">
        <Col md={12} className="border px-3 py-5">
          <Container className="d-flex justify-content-center">
            <Link to="/">
              <img
                src={logo}
                alt="logo"
                className=" p-2 rounded mb-3"
                style={{ width: '150px' }}
              />
            </Link>
          </Container>
          {newUser ? (
            <h3 className="mt-0 text-center ">Create an account</h3>
          ) : (
            <h3 className="mt-0 text-center">Login</h3>
          )}
          <Form>
            {newUser && (
              <Form.Group controlId="formBasicName">
                <Form.Control
                  className="my-3"
                  type="text"
                  placeholder="Enter Name"
                  name="name"
                  onBlur={handleBlur}
                  required
                />
              </Form.Group>
            )}
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                className="my-3"
                type="email"
                placeholder="Enter Email"
                name="email"
                onBlur={handleBlur}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Control
                className="my-3"
                type="password"
                placeholder="Enter Password"
                name="password"
                onBlur={handleBlur}
                required
              />
            </Form.Group>
            {newUser && (
              <Form.Group controlId="formBasicConfirmPassword">
                <Form.Control
                  className="my-3"
                  type="password"
                  placeholder="Confirm Password"
                  name="ConfirmPassword"
                  onBlur={checkPassword}
                  required
                />
              </Form.Group>
            )}
            {newUser ? (
              <button type="submit" className="btn btn-qhali w-100">
                Create an account
              </button>
            ) : (
              <button type="submit" className="btn btn-qhali w-100">
                Login
              </button>
            )}

            <button type="button" className="text-center mt-2" onClick={() => setNewUser(!newUser)}>
              <span className="me-2">{newUser ? 'login?' : 'Create an account?'}</span>
            </button>
          </Form>
          <Col md={12} className="mt-3 text-center">
            {!newUser && (
              <button className="btn border signInBtn" type="button">
                <i className="bi bi-google me-2" />
                Continue with Google
              </button>
            )}
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
