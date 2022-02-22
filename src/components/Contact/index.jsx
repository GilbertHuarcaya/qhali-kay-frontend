import React, { useState, useEffect } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { sendContactUsEmail } from '../../store/actions';
import useForm from '../../hooks/useForm';
import ActionSuccess from '../ActionSuccess';
import PaymentSuccess from '../PaymentSuccess';

const Contact = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState();
  const [loadingMessage, setLoadingMessage] = useState(false);

  const { form, setForm, handleChange } = useForm();
  useEffect(() => {
    if (user) {
      const data = {
        fullname: user.fullname,
        email: user.email,
        message: '',
      };
      setForm(data);
    }
  }, [user]);

  const onSubmitFiles = async (e) => {
    e.preventDefault();
    setLoadingMessage(true);
    const response = await sendContactUsEmail(dispatch, form);
    setFormData(response);
    if (response.status === 200) {
      setLoadingMessage(false);
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setFormData(null);
  };

  const sendMessage = () => {
    if (formData?.status === 200) {
      return (
        <PaymentSuccess
          title="Message Sent"
          message="Thank you for your Message!!"
          visible={success}
        />
      );
    }
    if (formData !== null && formData !== undefined) {
      return (
        <ActionSuccess
          title="Error"
          message={formData?.message || 'Please try again...'}
          redirect="/"
          button="Home"
          visible
          handleClose={handleClose}
        />
      );
    }
    return null;
  };

  return (
    <Container>
      <Row>
        <Col md={6} className="mx-auto border p-5 rounded">
          <h3 className="text-center mt-3 text-qhali text-bold">Contact us</h3>
          <Form onSubmit={onSubmitFiles}>
            <Form.Group controlId="formBasicName">
              <Form.Label className="fw-bold">Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                required
                name="fullname"
                onChange={handleChange}
                defaultValue={user?.fullname || ''}
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
                onChange={handleChange}
                defaultValue={user?.email || ''}
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
                onChange={handleChange}
              />
            </Form.Group>
            <button
              className="btn btn-qhali w-100 mt-2 fw-bold text-white"
              type="submit"
            >
              Submit
            </button>
          </Form>
          {loadingMessage ? (
            <ActionSuccess
              title="Sending"
              message="In progress..."
              visible
              handleClose={handleClose}
            />
          ) : null}
          {sendMessage()}
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
