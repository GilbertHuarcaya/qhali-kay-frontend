import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Navigation from '../Navigation';
import errorPage from '../../images/404.jpg';
import Footer from '../Footer';

const NotFound = () => (
  <div className=" d-flex flex-column justify-content-between" style={{ minHeight: '100vh' }}>
    <Navigation slide={false} />
    <Container className=" h-100 mx-auto d-flex align-items-center justify-content-center" style={{ flexGrow: '1' }}>
      <Row>
        <Col className=" mx-auto " md={9}>
          <img className="img-fluid" src={errorPage} alt="Error Page" />
        </Col>
      </Row>
    </Container>
    <Footer />
  </div>
);

export default NotFound;
