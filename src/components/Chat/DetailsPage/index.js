/* eslint-disable no-console */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable radix */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import { deleteUser } from '../Navbar/deleteUser';
import Chat from './Chat';
import LoginBtn from '../../LoginBtn';
import DetailCard from '../../DetailCard';

const DetailsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentHospital = useSelector((state) => state.currentHospital);
  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    console.log('Chat created');
    return () => {
      deleteUser(currentHospital.id);
    };
  }, []);

  return (
    <div>
      {currentHospital
        && (
        <Row className="w-100 m-0">
          <Col xs={12} md={6}>
            <DetailCard
              title={currentHospital.username}
              subtitle={currentHospital.custom_json.vicinity}
              tag="Perú"
              centerIconName="fas fa-play-circle"
              bottomIconName="fas fa-ellipsis-h"
              bgPhoto={currentHospital.custom_json.photo ? currentHospital.custom_json.photo.google_url : 'https://www.sanpablo.com.pe/wp-content/uploads/2018/09/FACHADA-SURCO-chica-clara-e1538239135354-1404x1024.jpg'}
              totalReviews={30}
              ratingAverage={currentHospital.custom_json.rating}
              contHeight="35rem"
            />

            <Link to="/near-med-center">
              <button type="button" style={{ padding: '11px' }}>
                Back
              </button>
            </Link>
            {currentUser
              ? (
                currentHospital.username !== currentUser.username
                && (
                <button
                  type="button"
                  onClick={() => setIsOpen(!isOpen)}
                  style={{ color: 'white', backgroundColor: '#1890ff', padding: '12px', border: '1px solid rgb(24, 144, 255)', borderRadius: '3px' }}
                >
                  {isOpen && 'Close'}
                  {' '}
                  Chat with me!
                </button>
                )
              ) : <LoginBtn />}

          </Col>
          {currentUser
            ? (
              isOpen
              && (
              <Col xs={12} md={6} className="p-0 h-100" style={{ height: 'calc(100vh - 64px)', border: '1px solid #bae7ff' }}>
                <Chat seller={currentHospital} />
              </Col>
              )
            )
            : null}
        </Row>
        )}
    </div>
  );
};

export default DetailsPage;
