import React from 'react';
import { Carousel } from 'react-bootstrap';
import slide1 from '../../images/slide1.jpeg';
import slide2 from '../../images/slide2.jpeg';
import slide3 from '../../images/slide3.jpeg';
import './styles.scss';

const Slide = () => (
  <Carousel interval={3000} className="nav-carousel ">
    <Carousel.Item className="bannerCarousel">
      <img
        className="d-block w-100 carouselImage mx-auto"
        src={slide1}
        alt="First slide"
      />
      <div className="carousel-background" />
      <Carousel.Caption className="nav-carousel-caption">
        <h4 className=" fw-bolder text-light">QHALIKAY</h4>
        <h1 className="display-2 fw-bolder text-light">
          Find the best Medical Center near you
        </h1>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item className="bannerCarousel">
      <img
        className="d-block w-100 carouselImage mx-auto"
        src={slide2}
        alt="Second slide"
      />
      <div className="carousel-background" />
      <Carousel.Caption className="nav-carousel-caption">
        <h4 className=" fw-bolder text-light">QHALIKAY</h4>
        <h1 className="display-2 fw-bolder text-light">
          Find the best Medical Center near you
        </h1>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item className="bannerCarousel">
      <img
        className="d-block w-100 carouselImage mx-auto"
        src={slide3}
        alt="Third slide"
      />
      <div className="carousel-background" />
      <Carousel.Caption className="nav-carousel-caption">
        <h4 className=" fw-bolder text-light">QHALIKAY</h4>
        <h1 className="display-2 fw-bolder text-light">
          Find the best Medical Center near you
        </h1>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
);

export default Slide;
