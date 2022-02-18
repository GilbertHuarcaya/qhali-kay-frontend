import React, { useEffect } from 'react';
import { Carousel, Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Rating } from 'react-simple-star-rating';
import { getReviewsFromDB } from '../../store/actions';

const Review = () => {
  const reviews = useSelector((state) => state.reviews);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!reviews) {
      getReviewsFromDB(dispatch);
    }
  }, [reviews]);
  return (
    <Container>
      <Row style={{ minHeight: '10rem' }}>
        <h1 className="text-center py-5 fw-bold">
          <span className="text-qhali">Clients</span>
          {' '}
          Review
        </h1>
        <Carousel>
          {!reviews ? (
            <div className="spinner-border text-qhali mx-auto text-center">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            reviews.map((el) => (
              <Carousel.Item
                id="testimonial-carousel-item"
                key={Math.random()}
                interval={2500}
              >
                <Carousel.Caption>
                  <img
                    className=" review__image m-auto mt-5 rounded-circle z-index-2"
                    src={el.userPhoto}
                    alt={el.userName}
                  />
                  <h3 className="text-dark fw-bold py-2">{el.userName}</h3>
                  <p className="text-dark m-0">{el.message}</p>
                  <Rating size="1rem" ratingValue={el.rating} readonly />
                </Carousel.Caption>
              </Carousel.Item>
            ))
          )}
        </Carousel>
      </Row>
    </Container>
  );
};

export default Review;
