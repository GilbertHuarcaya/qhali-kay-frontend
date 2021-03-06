/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { getAllHospitalsFromDB } from '../../store/actions';
import DetailCard from '../DetailCard';

const ServiceHome = ({ item }) => {
  const dispatch = useDispatch();
  const lastestHospitals = useSelector((state) => state.lastestHospitals);
  useEffect(() => {
    if (lastestHospitals.length < 1) {
      getAllHospitalsFromDB(dispatch);
    }
  }, [lastestHospitals]);

  return (
    <Container>
      <Row>
        <h1 className="text-center py-5 fw-bold">
          Our
          {' '}
          <span className="text-qhali">Affiliations</span>
        </h1>
        {!lastestHospitals ? (
          <div className="spinner-border text-qhali mx-auto   " role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          lastestHospitals.slice(0, item).map((i, index) => (
            <Col xs={12} sm={6} md={4} lg={3} xl={2} key={`${index + 1}hola`} className="my-3">
              <DetailCard
                title={i.hospitalName}
                subtitle={i.custom_json.vicinity}
                centerIconName="fas fa-play-circle"
                bottomIconName="fas fa-ellipsis-h"
                bgPhoto={i.custom_json.photo ? i.custom_json.photo.google_url : 'https://www.sanpablo.com.pe/wp-content/uploads/2018/09/FACHADA-SURCO-chica-clara-e1538239135354-1404x1024.jpg'}
                totalReviews={i.totalRatings || 'No'}
                ratingAverage={i.rating}
                contHeight="25rem"
              />
            </Col>
          ))
        )}
      </Row>
      <Row>
        <Col className="text-center mt-3">
          <Link
            className="mx-auto btn btn-qhali fw-bold text-white"
            to="/affiliations"
          >
            See more affiliations
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default ServiceHome;
