/* eslint-disable no-console */
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import DetailCard from '../DetailCard';
import { getAllHospitalsFromDB } from '../../store/actions';
import Loader from '../Loader';

const Services = () => {
  const dispatch = useDispatch();
  const lastestHospitals = useSelector((state) => state.lastestHospitals);
  useEffect(() => {
    if (!lastestHospitals) {
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
          <>
            <br />
            <br />
            <Loader />
          </>
        ) : (
          lastestHospitals.map((i, index) => (
            <Col xs={12} sm={6} md={4} lg={3} xl={2} key={`${index + 1}service`} className="my-3">
              <DetailCard
                title={i.hospitalName}
                subtitle={i.custom_json.vicinity}
                tag={i.custom_json.opening_hours && i.custom_json.opening_hours?.open_now ? 'open' : ''}
                tagBg={i.custom_json.opening_hours && i.custom_json.opening_hours?.open_now ? '#b1ffe6' : '#b8b3be'}
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
    </Container>
  );
};

export default Services;
