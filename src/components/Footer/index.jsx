import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';

const Footer = () => (
  <footer className="container-fluid mt-5 ">
    <Row className="py-5">
      <Col md={3}>
        <Link to="/">
          <img src={logo} alt="logo" id="logo" />
        </Link>
        <p className="mt-3 lh-base">
          This is the best healthcare service provider in Perú. To get any
          update connect with us.
        </p>
      </Col>
      <Col md={3} className="px-5">
        <h4 className="fw-bold text-black">Useful Links</h4>
        <ul className="list-group list-group-flush">
          <li className="btn text-start">Home</li>
          <li className="btn text-start">Doctors</li>
          <li className="btn text-start">Services</li>
          <li className="btn text-start">Contact us</li>
        </ul>
      </Col>
      <Col md={3}>
        <h4 className="fw-bold text-black">Subscribe</h4>
        <form>
          <div className="mb-3">
            <label id="exampleInputEmail1" htmlFor="exampleInputEmail1">
              Email address
              <input
                type="email"
                name="exampleInputEmail1"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                required
              />
            </label>
          </div>
          <button type="submit" className="btn btn-dark">
            Subscribe
          </button>
        </form>
      </Col>
      <Col md={3} />
    </Row>
    <p className="text-center mb-0">&copy; 2022 Copyright: QhaliKay - Gilbert Huarcaya</p>
  </footer>
);

export default Footer;
