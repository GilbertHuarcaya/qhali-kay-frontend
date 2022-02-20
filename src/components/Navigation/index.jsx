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
} from 'react-bootstrap';
import { useEffect, useState, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useSelector, useDispatch } from 'react-redux';
import { registerUser, getUserFromLocalStorage, getHospitalsFromGoogle, setCurrentUsers, setCurrentUser, setQuery } from '../../store/actions';
import Slide from '../Slide';
import logo from '../../images/logo.png';
import './styles.scss';
import LoginBtn from '../LoginBtn';
import LogoutBtn from '../LogoutBtn';
import Loader from '../Loader';
import NotVerified from '../NotVerified';

const Navigation = ({ slide, color }) => {
  const location = useLocation();
  const navigate = useNavigate();
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

  const [isMobile, setIsMobile] = useState(false);
  const [isLaptop, setIsLaptop] = useState(false);

  // choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 760) {
      setIsMobile(true);
      setIsLaptop(true);
    } else if (window.innerWidth > 760 && window.innerWidth < 1500) {
      setIsLaptop(true);
      setIsMobile(false);
    } else {
      setIsMobile(false);
      setIsLaptop(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
  }, []);

  useEffect(() => {
    const getCoords = async () => {
      if (location.pathname.split('/').includes('near-med-center')) {
        await navigator.geolocation.getCurrentPosition((position) => {
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);
        });
      }
    };
    getCoords();
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      if (lat && lng && hospitals.length === 0) {
        getHospitalsFromGoogle({ lat, lng }, dispatch);
      }
    };
    fetchData();
  }, [lat, lng]);

  useEffect(() => {
    if (qhaliUser) {
      setCurrentUsers(dispatch);
      if (currentUsers) {
        setCurrentUser(qhaliUser, currentUsers, dispatch);
      }
      /* syncUsers(); */
    }
  }, [qhaliUser]);

  useEffect(() => {
    if (currentUsers && qhaliUser && !currentUser) {
      setCurrentUser(qhaliUser, currentUsers, dispatch);
    }
  }, [currentUsers]);

  /*   useEffect(() => {
    if (!lastestHospitals) {
      getAllHospitalsFromDB(dispatch);
    }
  }, [lastestHospitals]); */

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

  const handleQuery = (e) => {
    e.preventDefault();
    navigate('/affiliations');
    handleClose();
  };

  return (
    <>
      <Navbar expand="false" fixed="top" className={navBackground ? 'py-0 pr-0' : 'py-0 pr-0 content-dark'} style={{ zIndex: location.pathname === '/chats' || location.pathname.split('/').includes('med-center') ? '1' : '999', transition: '1s ease', backgroundColor: navBackground ? color : 'transparent' }}>
        <Link className="navbar__logo mx-2 text-qhali" to="/">
          <img src={logo} alt="logo" id="logo" />
        </Link>
        <div hidden={isMobile}>
          <Form className="d-flex" onSubmit={(e) => handleQuery(e)}>
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2 m-0 px-3"
              aria-label="Search"
              onChange={(event) => setQuery(event.currentTarget.value, dispatch)}
            />
            <button type="submit" className="input-group-text border-0" id="search-addon">
              <i className="fas fa-search" />
            </button>
          </Form>
        </div>
        <div className="d-flex align-items-center">
          <div className="navbar__options align-items-center" hidden={isLaptop}>
            {/* <NavLink className="nav-link  text-qhali" to="/">
              Home
            </NavLink> */}
            <NavLink className="nav-link  text-qhali" to="/affiliations">
              Affiliations
            </NavLink>

            <NavLink className="nav-link  text-qhali" to="/near-med-center">
              Near Hospitals
            </NavLink>
            <NavLink className="nav-link  text-qhali" to="/contact-us">
              Contact Us
            </NavLink>
            {!qhaliUser ? (
              <NavLink className="nav-link  text-qhali" to="/login">
                For Hospitals
              </NavLink>
            ) : null}
            {qhaliUser?.hospitalName ? (
              <NavLink className="nav-link  text-qhali" to="/chats">
                Hospital Chats
              </NavLink>
            ) : null}
          </div>
          <div hidden={isMobile}>
            {!qhaliUser && localStorage.token ? <Loader /> : null}
            {qhaliUser?.userName && localStorage.token ? (
              <NavDropdown title={qhaliUser.userName.length > 11 ? `${qhaliUser.userName.slice(0, 11)}...` : qhaliUser.userName} id="offcanvasNavbarDropdown" className="btn m-0 p-0 text-white bg-auth text-center rounded my-0">
                <NavLink className="nav-link mx-2" to="/profile">
                  Profile
                </NavLink>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  <LogoutBtn />
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              null
            )}
            {qhaliUser?.hospitalName && localStorage.token ? (
              <NavDropdown title={qhaliUser.hospitalName.length > 11 ? `${qhaliUser.hospitalName.slice(0, 11)}...` : qhaliUser.hospitalName} id="offcanvasNavbarDropdown" className="btn m-0 p-0 text-white bg-auth text-center rounded my-0">
                <NavLink className="nav-link mx-2" to="/profile">
                  Med Profile
                </NavLink>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  <LogoutBtn />
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              null
            )}
            {!qhaliUser && !localStorage.token ? <LoginBtn /> : null}
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
                  to="/"
                  onClick={handleClose}
                >
                  Home
                </NavLink>
                <NavLink
                  className="nav-link mx-2"
                  to="/affiliations"
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
                <br />
                <h4 className="text-center"><small> Looking for a Hospital? </small></h4>
                <Form className="d-flex" onSubmit={(e) => handleQuery(e)}>
                  <FormControl
                    type="search"
                    placeholder="Search"
                    className="me-2 m-0 px-3"
                    aria-label="Search"
                    onChange={(event) => setQuery(event.currentTarget.value, dispatch)}
                  />
                  <button type="submit" className="input-group-text border-0" id="search-addon">
                    <i className="fas fa-search" />
                  </button>
                </Form>
                <br />
                {qhaliUser?.hospitalName ? (
                  <>
                    <h4 className="text-center">For Hospitals</h4>
                    <NavLink className="nav-link mx-2" onClick={handleClose} to="/chats">
                      Hospital Chats
                    </NavLink>
                  </>
                ) : null}
                {!qhaliUser && localStorage.token ? <Loader /> : null}
                {qhaliUser?.userName && localStorage.token ? (
                  <NavDropdown title={qhaliUser.userName.length > 10 ? `${qhaliUser.userName.slice(0, 10)}...` : qhaliUser.userName} id="offcanvasNavbarDropdown" className="btn m-0 p-0 text-white bg-auth text-center rounded my-0">

                    <NavLink className="nav-link text-center" to="/profile" onClick={handleClose}>
                      {qhaliUser?.photo?.url ? (
                        <img className="rounded-circle p-3 mx-auto" src={qhaliUser.photo.url} alt={qhaliUser.userName} style={{ width: '5rem' }} />
                      ) : null}
                      Profile
                    </NavLink>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5" onClick={handleClose}>
                      <LogoutBtn />
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  null
                )}
                {qhaliUser?.hospitalName && localStorage.token ? (
                  <NavDropdown title={qhaliUser.hospitalName.length > 10 ? `${qhaliUser.hospitalName.slice(0, 10)}...` : qhaliUser.hospitalName} id="offcanvasNavbarDropdown" className="btn m-0 p-0 text-white bg-auth text-center rounded my-0">
                    <NavLink className="nav-link mx-2" to="/profile" onClick={handleClose}>
                      Med Profile
                    </NavLink>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5" onClick={handleClose}>
                      <LogoutBtn />
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  null
                )}
                {!qhaliUser && !localStorage.token ? <LoginBtn /> : null}
                {!qhaliUser ? (
                  <NavLink className="btn btn-auth px-3 text-qhali sticky-bottom mt-5" onClick={handleClose} to="/login">
                    For Hospitals
                  </NavLink>
                ) : null}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </div>
      </Navbar>
      {user && !user?.email_verified ? <NotVerified /> : null}
      {slide && <Slide />}
    </>
  );
};

export default Navigation;
