/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable radix */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col } from 'react-grid-system';
import { Link } from 'react-router-dom';
import { deleteUser } from '../Navbar/deleteUser';
import Chat from './Chat';

const DetailsPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const currentHospital = useSelector((state) => state.currentHospital);
  const currentUser = useSelector((state) => state.currentUser);

  useEffect(() => {
    console.log('ok');
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
            <div style={{ margin: '12px' }}>
              <div style={{ width: '100%', overflowX: 'scroll' }}>
                <div style={{ display: 'flex' }}>
                  <img
                    alt="example"
                    src={currentHospital.custom_json.photo ? currentHospital.custom_json.photo.google_url : 'https://www.sanpablo.com.pe/wp-content/uploads/2018/09/FACHADA-SURCO-chica-clara-e1538239135354-1404x1024.jpg'}
                    style={{ width: '100%', height: '320px', objectFit: 'cover' }}
                  />
                </div>
              </div>
              <h1>{currentHospital.username}</h1>
              <h5>
                Rating:
                {' '}
                {currentHospital.custom_json.rating}
              </h5>
              <h5>
                Address:
                {currentHospital.custom_json.vicinity}
              </h5>
              <p style={{ maxWidth: '325px' }}>{currentHospital.custom_json.vicinity}</p>
              <Link to="/chat">
                <button type="button" style={{ padding: '11px' }}>
                  Back
                </button>
              </Link>
              {
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
              }
            </div>
          </Col>
          {
              isOpen
              && (
              <Col xs={12} md={6} className="p-0" style={{ height: 'calc(100vh - 64px)', border: '1px solid #bae7ff' }}>
                <Chat seller={currentHospital} />
              </Col>
              )
          }
        </Row>
        )}
    </div>
  );
};

export default DetailsPage;
