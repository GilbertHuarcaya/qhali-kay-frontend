/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import {
  Nav,
  Navbar,
  Offcanvas,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';
import { useEffect, useState, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser, getUserFromLocalStorage, getHospitalsFromGoogle, setCurrentUsers, setCurrentUser, getAllHospitalsFromDB } from '../../store/actions';
import Slide from '../Slide';
import logo from '../../images/logo.png';
import './styles.scss';
import LoginBtn from '../LoginBtn';
import LogoutBtn from '../LogoutBtn';

const Navigation = ({ slide, color }) => {
  const location = useLocation();
  const qhaliUser = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { user } = useAuth0();
  const [navBackground, setNavBackground] = useState(false);
  const navRef = useRef();
  navRef.current = navBackground;
  const hospitals = useSelector((state) => state.hospitals);
  const currentUsers = useSelector((state) => state.currentUsers);
  const currentUser = useSelector((state) => state.currentUser);

  const [lat, setLat] = useState();
  const [lng, setLng] = useState();

  useEffect(() => {
    const getCoords = async () => {
      await navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      });
    };
    getCoords();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (lat && lng && hospitals.length === 0) {
        getHospitalsFromGoogle({ lat, lng }, dispatch);
      }
    };
    fetchData();
  }, [lat, lng]);

  useEffect(() => {
    if (hospitals && qhaliUser) {
      setCurrentUsers(dispatch);
      if (currentUsers) {
        setCurrentUser(qhaliUser, currentUsers, dispatch);
      }
      /* syncUsers(); */
    }
  }, [hospitals]);

  useEffect(() => {
    if (hospitals && qhaliUser && !currentUser) {
      setCurrentUser(qhaliUser, currentUsers, dispatch);
      getAllHospitalsFromDB(dispatch);
    }
  }, [currentUsers]);

  useEffect(() => {
    const handleScroll = () => {
      const trasnparent = window.scrollY > 50;
      if (navRef.current !== trasnparent) {
        setNavBackground(trasnparent);
      }
    };
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const register = async () => {
      await registerUser(dispatch, user);
    };
    if (user !== undefined) {
      register();
    }
  }, [user]);

  useEffect(() => {
    const autoLoginUser = async () => {
      await getUserFromLocalStorage(dispatch);
    };
    if (qhaliUser === null) {
      autoLoginUser();
    }
  }, []);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  return (
    <>
      <Navbar expand="false" fixed="top" className={navBackground ? 'py-0 pr-0' : 'py-0 pr-0 content-dark'} style={{ zIndex: location.pathname === '/chats' || location.pathname.split('/').includes('med-center') ? '1' : '999', transition: '1s ease', backgroundColor: navBackground ? color : 'transparent' }}>
        <Link className="navbar__logo mx-2 text-qhali" to="/">
          <img src={logo} alt="logo" id="logo" />
        </Link>
        <div className="d-flex align-items-center">
          <div className="navbar__options align-items-center">
            {/* <NavLink className="nav-link  text-qhali" to="/">
              Home
            </NavLink> */}
            <NavLink className="nav-link  text-qhali" to="/services">
              Affiliations
            </NavLink>

            <NavLink className="nav-link  text-qhali" to="/near-med-center">
              Near Hospitals
            </NavLink>
            <NavLink className="nav-link  text-qhali" to="/contact-us">
              Contact Us
            </NavLink>
            {qhaliUser?.hospitalName ? (
              <NavLink className="nav-link  text-qhali" to="/chats">
                Chats
              </NavLink>
            ) : null}
            {qhaliUser?.userName ? (
              <NavDropdown title={qhaliUser.userName.length > 8 ? `${qhaliUser.userName.slice(0, 8)}...` : qhaliUser.userName} id="offcanvasNavbarDropdown" className="btn m-0 p-0 text-white bg-auth text-center rounded my-0">
                <NavLink className="nav-link mx-2" to="/profile">
                  Profile
                </NavLink>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  <LogoutBtn />
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              ''
            )}
            {qhaliUser?.hospitalName ? (
              <NavDropdown title={qhaliUser.hospitalName.length > 8 ? `${qhaliUser.hospitalName.slice(0, 8)}...` : qhaliUser.hospitalName} id="offcanvasNavbarDropdown" className="btn m-0 p-0 text-white bg-auth text-center rounded my-0">
                <NavLink className="nav-link mx-2" to="/profile">
                  Med Profile
                </NavLink>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  <LogoutBtn />
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              ''
            )}
            {!qhaliUser ? <LoginBtn /> : null}
          </div>
          <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={toggleShow} className="mx-2" />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
            show={show}
            onHide={handleClose}
          >
            <Offcanvas.Header closeButton>

              <Link className="navbar__logo mx-2 text-qhali" to="/">
                <img src={logo} alt="logo" id="logo" />
              </Link>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav
                className="justify-content-end flex-grow-1 pe-3"
                collapseOnSelect
              >
                <NavLink
                  className="nav-link mx-2"
                  to="/services"
                  onClick={handleClose}
                >
                  Affiliations
                </NavLink>
                <NavLink
                  className="nav-link mx-2"
                  to="/contact-us"
                  onClick={handleClose}
                >
                  Contact Us
                </NavLink>
                <NavLink className="nav-link mx-2" to="/near-med-center" onClick={handleClose}>
                  Near Hospitals
                </NavLink>
                <Form className="d-flex">
                  <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2 m-0 p-0"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form>
                <br />
                {!qhaliUser ? <LoginBtn /> : null}
                {qhaliUser?.userName ? (
                  <NavDropdown title={qhaliUser.userName.length > 8 ? `${qhaliUser.userName.slice(0, 8)}...` : qhaliUser.userName} id="offcanvasNavbarDropdown" className="btn m-0 p-0 text-white bg-auth text-center rounded my-0">
                    <NavLink className="nav-link mx-2" to="/profile">
                      Profile
                    </NavLink>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      <LogoutBtn />
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  ''
                )}
                {qhaliUser?.hospitalName ? (
                  <NavDropdown title={qhaliUser.hospitalName.length > 8 ? `${qhaliUser.hospitalName.slice(0, 8)}...` : qhaliUser.hospitalName} id="offcanvasNavbarDropdown" className="btn m-0 p-0 text-white bg-auth text-center rounded my-0">
                    <NavLink className="nav-link mx-2" to="/profile">
                      Med Profile
                    </NavLink>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      <LogoutBtn />
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  ''
                )}
              </Nav>
              {user?.photo ? (
                <img src={user.picture} alt={user.userName} />
              ) : null}
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </div>
      </Navbar>

      {slide && <Slide />}
    </>
  );
};

export default Navigation;
