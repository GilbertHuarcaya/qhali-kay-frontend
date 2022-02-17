import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ProcedureItem from '../ProcedureItem';

const Procedure = () => {
  const procedure = [
    {
      title: 'Search Best Medical Center Near You',
      des: 'Fin near Medical Centers and Login to start chat',
      step: 1,
      key: 12,
      url: '/near-med-center',
      image: 'https://www.torontohomecareassistance.ca/wp-content/uploads/2020/03/Senior-with-Doctor.jpg',
    },
    {
      title: 'Get Instant Response',
      des: 'If you need an appoinment, start a chat from our website with a Medical Canter.',
      step: 2,
      key: 13,
      url: '/near-med-center',
      image: 'https://img.europapress.es/fotoweb/fotonoticia_20170103110958_420.jpg',
    },
    {
      title: 'Leave Your Feedback',
      des: 'After completing appointments please give us feedback.',
      step: 3,
      key: 14,
      url: '/feedback',
      image: 'https://previews.123rf.com/images/olegdudko/olegdudko1908/olegdudko190801388/128531568-empleado-cara-retroalimentaci%C3%B3n-satisfacci%C3%B3n-encuesta-fondo-mejor.jpg',
    },
  ];
  return (
    <Container className="py-5">
      <h1 className="text-center my-5">
        How it
        {' '}
        <span className="text-qhali fw-bold">Works?</span>
      </h1>
      <Row>
        {procedure.map((step) => (
          <Col md={12} lg={4} key={step.key}>
            <ProcedureItem
              bgPhoto={step.image}
              tag="Peru"
              title={step.title}
              subtitle={step.des}
              cta={`Step ${step.step}`}
              contHeight="15rem"
              url={step.url}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Procedure;
