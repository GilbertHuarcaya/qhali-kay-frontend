import React from 'react';
import { Carousel } from 'react-bootstrap';
import slide1 from '../../images/slide1.jpeg';
import slide2 from '../../images/slide2.jpeg';
import slide3 from '../../images/slide3.jpeg';
import './styles.scss';

const slides = [{ slide: slide1, info: 'Find the best Medical Center near you' }, { slide: slide2, info: 'Find the best Medical Center near you' }, { slide: slide3, info: 'Find the best Medical Center near you' }];

const Slide = () => (
  <Carousel interval={3000} className="nav-carousel ">
    {slides.map((slide) => (
      <Carousel.Item className="bannerCarousel">
        <div
          className="carouselImage"
          style={{
            background: `url(${slide.slide})`,
            'background-repeat': 'no-repeat',
            'background-size': 'cover',
            'background-position': 'center',
          }}
        />
        <div className="carousel-background" />
        <Carousel.Caption className="nav-carousel-caption">
          <h4 className=" fw-bolder text-light">QHALIKAY</h4>
          <h1 className="display-2 fw-bolder text-light">
            {slide.info}
          </h1>
        </Carousel.Caption>
      </Carousel.Item>
    ))}
  </Carousel>
);

export default Slide;
