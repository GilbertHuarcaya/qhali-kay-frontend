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
      const newHospital = await createChatHospital({ ...value, secret: value.email }, dispatch);

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
        className="p-0"
      >
        <div onClick={() => { createAndNavigate(hospital); }} style={{ margin: '12px', cursor: 'pointer' }}>
          <DetailCard
            title={hospital.username}
            subtitle={hospital.vicinity}
            tag={hospital.custom_json.opening_hours && hospital.custom_json.opening_hours?.open_now ? 'open' : ''}
            tagBg={hospital.custom_json.opening_hours && hospital.custom_json.opening_hours?.open_now ? '#b1ffe6' : '#b8b3be'}
            iconName="fas fa-heart"
            btnIcon="fas fa-ellipsis-h"
            bottomIconName="fas fa-comment"
            bgPhoto={hospital.photo ? hospital.photo.google_url : 'https://www.sanpablo.com.pe/wp-content/uploads/2018/09/FACHADA-SURCO-chica-clara-e1538239135354-1404x1024.jpg'}
            secondTitle={hospital.custom_json.opening_hours ? 'OPEN' : 'CLOSED'}
            totalReviews={hospital.totalRatings || 'No'}
            ratingAverage={hospital.rating}
            contHeight="20rem"
          />
        </div>
      </Col>
    ));
  }

  return (
    <Row className="w-100 m-0">
      { hospitals?.length > 0 ? renderhospitals() : <img src="https://cdn.dribbble.com/users/107759/screenshots/4231691/radar.gif" alt="radar-loader" className="w-100 h-100 " /> }
    </Row>
  );
};

export default ListingsPage;
