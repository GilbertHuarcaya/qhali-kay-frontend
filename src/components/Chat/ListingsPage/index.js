/* eslint-disable no-unused-expressions */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col } from 'react-grid-system';
import { Card } from 'antd';
import { setCurrentHospital, setCurrentUsers, createChatHospital } from '../../../store/actions';

const { Meta } = Card;

const ListingsPage = () => {
  const hospitals = useSelector((state) => state.hospitals);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const createAndNavigate = async (value) => {
    const users = await setCurrentUsers(dispatch);

    const existingHospital = await users.find((u) => value.username === u.username);
    if (existingHospital === undefined) {
      const newHospital = await createChatHospital(value, dispatch);

      return navigate(`/product/${newHospital.id}`);
    }
    await setCurrentHospital(existingHospital, dispatch);
    return navigate(`/product/${existingHospital.id}`);
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
        <div style={{ margin: '12px' }}>
          <Card
            hoverable
            onClick={() => { createAndNavigate(hospital); }}
            style={{ maxWidth: '100%' }}
            cover={(
              <img
                alt="example"
                src={hospital.photo ? hospital.photo.google_url : 'https://www.sanpablo.com.pe/wp-content/uploads/2018/09/FACHADA-SURCO-chica-clara-e1538239135354-1404x1024.jpg'}
                style={{ width: '100%', height: '320px', objectFit: 'cover' }}
              />
                )}
          >
            <Meta
              title={hospital.rating}
              description={`${hospital.vicinity} - ${hospital.first_name} ${hospital.last_name}`}
            />
          </Card>
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
