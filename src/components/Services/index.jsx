/* eslint-disable no-console */
import React, { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Services = () => {
  const data = [{
    serviceName: 'hola',
    serviceDesc: 'muchos',
    serviceImage: 'google.com',

  },
  {
    serviceName: 'hola',
    serviceDesc: 'muchos',
    serviceImage: 'google.com',

  }, {
    serviceName: 'hola',
    serviceDesc: 'muchos',
    serviceImage: 'google.com',

  },
  {
    serviceName: 'hola',
    serviceDesc: 'muchos',
    serviceImage: 'google.com',

  }, {
    serviceName: 'hola',
    serviceDesc: 'muchos',
    serviceImage: 'google.com',

  },
  {
    serviceName: 'hola',
    serviceDesc: 'muchos',
    serviceImage: 'google.com',

  }, {
    serviceName: 'hola',
    serviceDesc: 'muchos',
    serviceImage: 'google.com',

  }];
  const [services] = useState(data);

  return (
    <Container>
      <Row>
        <h1 className="text-center py-5 fw-bold">
          Our
          {' '}
          <span className="text-qhali">Services</span>
        </h1>
        {!services ? (
          <div className="spinner-border text-qhali mx-auto   " role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          services.map((service, index) => (
            <Col lg={4} key={`${index + 1}service`} className="my-3 text-center">
              <Card className="shadow-effect">
                <Card.Img variant="top" src={service.serviceImage} />
                <Card.Body>
                  <Card.Title className="fw-bold">
                    {service.serviceName}
                  </Card.Title>
                  <Card.Text className="text">{service.serviceDesc}</Card.Text>
                  <Link
                    to={`/service-details/${service.serviceName}/${service.serviceDesc}`}
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
    </Container>
  );
};

export default Services;
