import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from 'react-bootstrap';

const Doctor = () => {
  const [doctor, setDoctor] = useState([]);

  useEffect(() => {
    document.title = 'Our doctors';
    fetch('./services.json')
      .then((res) => res.json())
      .then((data) => setDoctor(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Container>
      <Row>
        <h1 className="text-center py-5 fw-bold">
          Meet Our
          {' '}
          <span className="text-qhali">Doctors</span>
        </h1>
        {!doctor ? (
          <div className="spinner-border text-qhali mx-auto   " role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          doctor.slice(0, 6).map((item, key) => (
            <Col lg={4} key={`A-${key + 1}-hola`} className="my-3 text-center">
              <Card>
                <Card.Img variant="top" src={item.doctorImage} />
                <Card.Body>
                  <Card.Title className="fw-bold">{item.doctorName}</Card.Title>
                  <Card.Text>{item.specialist}</Card.Text>
                  <button type="button" className="btn btn-qhali text-white">
                    For More Details
                  </button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
};

export default Doctor;
