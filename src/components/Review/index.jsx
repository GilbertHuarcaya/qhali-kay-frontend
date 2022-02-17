import React, { useEffect, useState } from 'react';
import { Carousel, Container, Row } from 'react-bootstrap';

const Review = () => {
  const [review, setReview] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = [{ userName: 'gilbert', userImage: 'https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049_1280.png', userId: '122', body: 'Muy buen servicio para encontrar clinicas cerca y empezar un tramite' }, { userName: 'gilbert', userImage: 'https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049_1280.png', userId: '123', body: 'Muy buen servicio para encontrar clinicas cerca y empezar un tramite' }, { userName: 'gilbert', userImage: 'https://cdn.pixabay.com/photo/2018/11/13/21/43/instagram-3814049_1280.png', userId: '124', body: 'Muy buen servicio para encontrar clinicas cerca y empezar un tramite' }];
    setReview(data);
    setLoading(false);
  }, []);

  return (
    <Container>
      <Row style={{ minHeight: '10rem' }}>
        <h1 className="text-center py-5 fw-bold">
          <span className="text-qhali">Clients</span>
          {' '}
          Review
        </h1>
        <Carousel>
          {loading ? (
            <div className="spinner-border text-qhali mx-auto" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          ) : (
            review.map((el) => (
              <Carousel.Item
                id="testimonial-carousel-item"
                key={el.userId}
                interval={2500}
              >
                <Carousel.Caption>
                  <img
                    className=" review__image m-auto mt-5 rounded-circle z-index-2"
                    src={el.userImage}
                    alt={el.userName}
                  />
                  <h3 className="text-dark fw-bold py-2">{el.userName}</h3>
                  <p className="text-dark">{el.body}</p>
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
