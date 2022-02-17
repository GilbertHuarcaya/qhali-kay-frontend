/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-expressions */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'react-grid-system';
import { setCurrentHospital, setCurrentUsers, createChatHospital } from '../../../store/actions';
import DetailCard from '../../DetailCard';

const ListingsPage = () => {
  const hospitals = useSelector((state) => state.hospitals);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const createAndNavigate = async (value) => {
    const users = await setCurrentUsers(dispatch);

    const existingHospital = await users.find((u) => value.username === u.username);
    if (existingHospital === undefined) {
      const newHospital = await createChatHospital(value, dispatch);

      return navigate(`/med-center/${newHospital.id}`);
    }
    await setCurrentHospital(existingHospital, dispatch);
    return navigate(`/med-center/${existingHospital.id}`);
  };

  function renderhospitals() {
    return hospitals.map((hospital, index) => (
      <Col
        key={`hospital-${index + 1}`}
        xs={12}
        sm={6}
        md={4}
        lg={3}
        className="p-0 my-2"
      >
        <div onClick={() => { createAndNavigate(hospital); }} style={{ margin: '12px', cursor: 'pointer' }}>
          <DetailCard
            title={hospital.username}
            subtitle={hospital.vicinity}
            iconName="fas fa-heart"
            btnIcon="fas fa-arrow-right"
            bgPhoto={hospital.photo ? hospital.photo.google_url : 'https://www.sanpablo.com.pe/wp-content/uploads/2018/09/FACHADA-SURCO-chica-clara-e1538239135354-1404x1024.jpg'}
            secondTitle={hospital.custom_json.opening_hours ? 'OPEN' : 'CLOSED'}
            totalReviews={30}
            ratingAverage={hospital.rating}
            contHeight="20rem"
          />
        </div>
      </Col>
    ));
  }

  return (
    <Row className="w-100 m-0">
      { hospitals ? renderhospitals() : <h1>Nada</h1> }
    </Row>
  );
};

export default ListingsPage;
