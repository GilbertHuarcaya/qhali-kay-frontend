import React from 'react';
import Review from '../Review';
import Footer from '../Footer';
import Header from '../Last';
import Navigation from '../Navigation';
import ServiceHome from '../ServiceHome';
import Procedure from '../Procedure';

const Home = () => {
  document.title = 'QHALIKAY';
  return (
    <>
      <Header />
      <Navigation color="" slide />
      <ServiceHome item={6} />
      <Procedure />
      <Review />
      <Footer />
    </>
  );
};

export default Home;
