import React from 'react';
import Review from '../../components/Review';
import ServiceHome from '../../components/ServiceHome';
import Procedure from '../../components/Procedure';

const Home = () => {
  document.title = 'QhaliKay';
  return (
    <>
      <ServiceHome item={6} />
      <Procedure />
      <Review />
    </>
  );
};

export default Home;
