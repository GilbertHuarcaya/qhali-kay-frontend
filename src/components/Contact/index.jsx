import React from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';

const Contact = () => {
  document.title = 'Contact us';
  return (
    <Container>
      <Row>
        <Col md={6} className="mx-auto border p-5 rounded">
          <h3 className="text-center mt-3 text-qhali text-bold">Contact us</h3>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label className="fw-bold">Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                required
                name="name"
              />
              <Form.Text className="text-muted"> </Form.Text>
            </Form.Group>
            {' '}
            <br />
            <Form.Group controlId="formBasicEmail">
              <Form.Label className="fw-bold">Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                required
                name="email"
              />
              <Form.Text className="text-muted"> </Form.Text>
            </Form.Group>
            {' '}
            <br />
            <Form.Group controlId="formBasicTextarea">
              <Form.Label className="fw-bold">Message</Form.Label>
              <textarea
                className="form-control"
                rows="5"
                placeholder="Enter comment"
                required
                name="message"
              />
            </Form.Group>
            <button
              className="btn btn-qhali w-100 mt-2 fw-bold text-white"
              type="submit"
            >
              Submit
            </button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
