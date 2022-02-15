/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ServiceHome = ({ item }) => {
  const data = [{
    serviceName: 'hola',
    serviceDesc: 'muchos',
    serviceImage: 'https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049_1280.png',

  },
  {
    serviceName: 'hola',
    serviceDesc: 'muchos',
    serviceImage: 'https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049_1280.png',

  }, {
    serviceName: 'hola',
    serviceDesc: 'muchos',
    serviceImage: 'https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049_1280.png',

  },
  {
    serviceName: 'hola',
    serviceDesc: 'muchos',
    serviceImage: 'https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049_1280.png',

  }, {
    serviceName: 'hola',
    serviceDesc: 'muchos',
    serviceImage: 'https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049_1280.png',

  },
  {
    serviceName: 'hola',
    serviceDesc: 'muchos',
    serviceImage: 'https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049_1280.png',

  }, {
    serviceName: 'hola',
    serviceDesc: 'muchos',
    serviceImage: 'https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049_1280.png',

  }];
  const [services] = useState(data.slice(0, item));

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
          services.map((i, index) => (
            <Col lg={4} key={`${index + 1}hola`} className="my-3 text-center">
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
