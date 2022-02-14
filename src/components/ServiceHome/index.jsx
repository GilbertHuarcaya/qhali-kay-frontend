/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ServiceHome = ({ item }) => {
  const [service, setService] = useState([]);

  useEffect(() => {
    fetch('./services.json')
      .then((res) => res.json())
      .then((data) => {
        setService(data.slice(0, item));
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Container>
      <Row>
        <h1 className="text-center py-5 fw-bold">
          Our
          {' '}
          <span className="text-qhali">Services</span>
        </h1>
        {!service ? (
          <div className="spinner-border text-qhali mx-auto   " role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          service.map((i, key) => (
            <Col lg={4} key={`${key + 1}hola`} className="my-3 text-center">
              <Card className="shadow-effect">
                <Card.Img variant="top" src={i.serviceImage} />
                <Card.Body>
                  <Card.Title className="fw-bold">{i.serviceName}</Card.Title>
                  <Card.Text className="text">{i.serviceDesc}</Card.Text>
                  <Link
                    to={`/service-details/${i.serviceName}/${i.serviceDesc}`}
                    className="btn btn-qhali text-white fw-bold"
                  >
                    Click For Details
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
      <Row>
        <Link
          className="w-25 mx-auto btn btn-qhali fw-bold text-white"
          to="/services"
        >
          See more services
        </Link>
      </Row>
    </Container>
  );
};

export default ServiceHome;
