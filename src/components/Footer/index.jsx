import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';

const Footer = () => (
  <footer className="container-fluid mt-5 ">
    <Row className="py-5">
      <Col md={6} className=" px-5 d-flex flex-column align-items-center justify-content-center">
        <Link to="/">
          <img src={logo} alt="logo" id="logo" />
        </Link>
        <p className="mt-3 lh-base text-justify">
          This is the best healthcare service provider in Perú. To get any
          update connect with us.
        </p>
      </Col>
      <Col md={6} className="px-5 d-flex flex-column align-items-center justify-content-center">
        <h4 className="fw-bold text-black">QhaliKay</h4>
        <ul className="list-group list-group-flush">
          <li className="btn text-start"><Link to="/" className="btn text-start">Home</Link></li>
          <li className="btn text-start"><Link to="/affiliations" className="btn text-start">Afiliations</Link></li>
          <li className="btn text-start"><Link to="/near-med-center" className="btn text-start">Near Hospitals</Link></li>
          <li className="btn text-start"><Link to="/contact-us" className="btn text-start">Contact Us</Link></li>
        </ul>
      </Col>
      {/* <Col md={4} className="px-5 d-flex flex-column align-items-center justify-content-center">
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
      </Col> */}
    </Row>
    <p className="text-center mb-0">&copy; 2022 Copyright: QhaliKay - Gilbert Huarcaya</p>
  </footer>
);

export default Footer;
