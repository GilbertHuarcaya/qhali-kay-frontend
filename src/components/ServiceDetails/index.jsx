import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import HospitalCard from '../HospitalCard';

const ServiceDetails = () => {
  const { name, description } = useParams();
  return (
    <Container>
      <Row
        className="d-flex justify-content-center align-items-center"
      >
        <Col md={6} className="mx-auto">
          <HospitalCard
            title={name}
            subtitle={description}
            iconName="fas fa-heart"
            btnIcon="fas fa-arrow-right"
            bgPhoto="https://picsum.photos/740/420/?random"
            secondTitle="OPEN"
            totalReviews={30}
            ratingAverage={4.5}
          />
          {/* <Card className="p-5 shadow">
            <Card.Body>
              <Card.Title>{name}</Card.Title>
              <Card.Text className="text">{description}</Card.Text>
            </Card.Body>
          </Card> */}
        </Col>
      </Row>
    </Container>
  );
};

export default ServiceDetails;
