/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postUserReview } from '../../store/actions';
/* import './Postula.scss'; */
import useForm from '../../hooks/useForm';
import ActionSuccess from '../ActionSuccess';
import PaymentSuccess from '../PaymentSuccess';

const Contact = ({ md = 6 }) => {
  const user = useSelector((state) => state.user);
  const currentHospital = useSelector((state) => state.currentHospital);
  const [reviewRating, setReviewRating] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState();
  const [loadingPayment, setLoadingPayment] = useState(false);
  const { form, setForm, handleChange } = useForm();
  const [formOk, setFormOk] = useState(false);

  useEffect(() => {
    if (user) {
      const data = {
        userId: user.id,
        userName: user.userName,
        userPhoto: user.photo.url || 'https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049_1280.png',
        hospitalEmail: currentHospital?.email,
        message: '',
      };
      setForm(data);
    }
  }, [user]);

  useEffect(() => {
    const validateForm = () => {
      if (form.message && form.message?.length > 10) {
        setFormOk(true);
      } else {
        setFormOk(false);
      }
    };
    validateForm();
  }, [handleChange]);

  const onSubmitFiles = async (e) => {
    e.preventDefault();
    setLoadingPayment(true);
    const response = await postUserReview(dispatch, { ...form, rating: reviewRating });
    setFormData(response);
    if (response.status === 201) {
      setLoadingPayment(false);
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

  const handleRating = (rate) => {
    setReviewRating(rate);
    // other logic
  };

  const paymentMessage = () => {
    if (formData?.status === 201) {
      return (
        <PaymentSuccess
          title="Completed"
          message="Thank you for your Feedback!!"
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
        <Col md={md} className="mx-auto border p-5 rounded">
          <h3 className="text-center mt-3 text-qhali text-bold">Feedback</h3>
          <Form onSubmit={onSubmitFiles}>
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
            <br />
            <Form.Group controlId="formBasicTextarea">
              <Form.Label className="fw-bold">Rating</Form.Label>
              <Rating
                onClick={handleRating}
                ratingValue={reviewRating}
              />
            </Form.Group>
            <button
              className="btn btn-qhali w-100 mt-2 fw-bold text-white"
              type="submit"
              disabled={!formOk}
            >
              Submit
            </button>
          </Form>
          {loadingPayment ? (
            <ActionSuccess
              title="Sending"
              message="In progress..."
              visible
              handleClose={handleClose}
            />
          ) : null}
          {paymentMessage()}
        </Col>
      </Row>
    </Container>
  );
};

export default Contact;
