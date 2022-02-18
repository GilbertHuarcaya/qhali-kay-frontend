/* eslint-disable no-nested-ternary */
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
import Feedback from '../../Feedback';

const DetailsPage = () => {
  const currentHospital = useSelector((state) => state.currentHospital);
  const currentUser = useSelector((state) => state.currentUser);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setIsOpen(true);
    }
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
              tag={currentHospital.custom_json.opening_hours && currentHospital.custom_json.opening_hours?.open_now ? 'open' : 'closed'}
              tagBg={currentHospital.custom_json.opening_hours && currentHospital.custom_json.opening_hours?.open_now ? '#b1ffe6' : '#b8b3be'}
              bgPhoto={currentHospital.custom_json.photo ? currentHospital.custom_json.photo.google_url : 'https://www.sanpablo.com.pe/wp-content/uploads/2018/09/FACHADA-SURCO-chica-clara-e1538239135354-1404x1024.jpg'}
              totalReviews={currentHospital.custom_json.user_ratings_total}
              ratingAverage={currentHospital.custom_json.rating}
              contHeight="30rem"
            />
            <div className="d-flex justify-content-between pt-2">
              <Link to="/near-med-center">
                <button type="button" className="btn btn-white" style={{ padding: '11px' }}>
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
                  style={{ color: 'white', backgroundColor: '#90d7ff', padding: '12px', border: '1px solid #90d7ff', borderRadius: '3px' }}
                >
                  {isOpen && 'Close'}
                  {' '}
                  Chat!
                </button>
                )
                ) : <LoginBtn />}
            </div>
          </Col>
          {currentUser
            ? (
              isOpen ? (
                <Col xs={12} md={6} className="p-0 h-100" style={{ height: 'calc(100vh - 64px)', border: '1px solid #90d7ff' }}>
                  <Chat seller={currentHospital} />
                </Col>
              ) : (
                <Col xs={12} md={6} className="p-0 h-100" style={{ height: 'calc(100vh - 64px)' }}>
                  <Feedback md={10} />
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
