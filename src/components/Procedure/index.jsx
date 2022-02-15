import React from 'react';
import { Card, Col, Container, Row, Button } from 'react-bootstrap';

const Procedure = () => {
  const procedure = [
    {
      title: 'Search Best Medical Center Near You',
      des: 'Search on Medical Centers Page and Login',
      step: 1,
      key: 12,
    },
    {
      title: 'Get Instant Response',
      des: 'If you need an appoinment, start a chat from our website with the Medical Canter.',
      step: 2,
      key: 13,
    },
    {
      title: 'Leave Your Feedback',
      des: 'After completing appointments please give us feedback.',
      step: 3,
      key: 14,
    },
  ];
  return (
    <Container className="py-5">
      <h1 className="text-center my-5">
        How it
        {' '}
        <span className="text-qhali fw-bold">Works?</span>
      </h1>
      <Row>
        {procedure.map((step) => (
          <Col md={12} lg={4} key={step.key}>
            <Card className="my-2">
              <Card.Body className="text-center">
                <Card.Title className="fw-bold">{step.title}</Card.Title>
                <Card.Text>{step.des}</Card.Text>
                <Button className="btn-qhali text-white text-center">
                  Step
                  {' '}
                  {step.step}
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Procedure;
