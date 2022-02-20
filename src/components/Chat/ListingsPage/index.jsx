/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-expressions */
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import { Marker, Popup } from 'react-map-gl';
import Pin from './pin';
import { setCurrentHospital, setCurrentUsers, createChatHospital, getNextPageHospitalsFromGoogle } from '../../../store/actions';
import DetailCard from '../../DetailCard';
import AffiliationsMap from '../../AffiliationsMap';
import './styles.scss';

const ListingsPage = () => {
  const hospitals = useSelector((state) => state.hospitals);
  const nextPage = useSelector((state) => state.nextPage);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // choose the screen size
  const handleResize = () => {
    if (window.innerWidth < 720) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    handleResize();
  }, []);

  const createAndNavigate = async (value) => {
    const users = await setCurrentUsers(dispatch);

    const existingHospital = await users.find((u) => value.email === u.email);
    if (existingHospital === undefined) {
      const newHospital = await createChatHospital({ ...value, secret: value.email }, dispatch);

      return navigate(`/med-center/${newHospital.id}`);
    }
    await setCurrentHospital(existingHospital, dispatch);
    return navigate(`/med-center/${existingHospital.id}`);
  };

  const onClickNextPage = () => {
    if (nextPage) {
      getNextPageHospitalsFromGoogle(nextPage, dispatch);
    }
  };

  const [popupInfo, setPopupInfo] = useState(null);

  const pins = useMemo(
    () => hospitals.map((h, index) => (
      <Marker
        key={`marker-${index + 1}`}
        longitude={h.location.lng}
        latitude={h.location.lat}
        anchor="bottom"
      >
        <Pin onClick={() => setPopupInfo(h)} />
      </Marker>
    )),
    [hospitals],
  );

  function renderhospitals() {
    return hospitals.map((hospital, index) => (
      <Col
        key={`hospital-${index + 1}`}
        xs={12}
        sm={6}
        md={12}
        lg={6}
        xl={6}
        className="p-0"
      >
        <div onClick={() => { createAndNavigate(hospital); }} style={{ margin: '12px', cursor: 'pointer' }}>
          <DetailCard
            title={hospital.username}
            subtitle={hospital.vicinity}
            tag={hospital.custom_json.opening_hours ? (hospital.custom_json.opening_hours?.open_now ? 'open' : 'closed') : ''}
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

  function mapWPopus() {
    return (
      <AffiliationsMap>
        { pins }
        {popupInfo && (
        <Popup
          anchor="top"
          longitude={Number(popupInfo.location.lng)}
          latitude={Number(popupInfo.location.lat)}
          closeOnClick={false}
          onClose={() => setPopupInfo(null)}
        >
          <div className="d-flex justify-content-between align-items-center">
            <p className="m-0">
              {popupInfo.username}
              |
              {popupInfo.custom_json.opening_hours ? (popupInfo.custom_json.opening_hours?.open_now ? 'open' : 'closed') : ''}
              |
            </p>
            <button type="button" className="btn btn-qhali font-size-5" onClick={() => { createAndNavigate(popupInfo); }} style={{ cursor: 'pointer' }}>
              Chat
            </button>
            {/* <a
                  target="_new"
                  href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.hospitalName}, ${popupInfo.state}`}
                >
                  Wikipedia
                </a> */}
          </div>
          <img width="100%" src={popupInfo.custom_json.photo ? popupInfo.custom_json.photo.google_url : 'https://www.sanpablo.com.pe/wp-content/uploads/2018/09/FACHADA-SURCO-chica-clara-e1538239135354-1404x1024.jpg'} alt={popupInfo.hospitalName} />
        </Popup>
        )}
      </AffiliationsMap>
    );
  }

  function renderMapMobile() {
    return (
      <Modal show={show} fullscreen="md-down" onHide={() => setShow(false)}>
        <Modal.Header closeButton />
        <Modal.Body>
          {' '}
          {mapWPopus()}
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <div className="px-4 w-100">
      <Row>
        <h1 className="text-center py-5 fw-bold w-100">
          Near
          {' '}
          <span className="text-qhali">Hospitals</span>

        </h1>
        <Col xs={12} sm={12} md={6} lg={6} xl={6} className="pb-3">
          <Row>
            { hospitals?.length > 0 ? renderhospitals() : <img src="https://cdn.dribbble.com/users/107759/screenshots/4231691/radar.gif" alt="radar-loader" className="w-100 h-100 " /> }
            {nextPage
              ? <button type="button" className="btn btn-qhali w-100 " onClick={onClickNextPage}>More Hospitals</button> : null}
          </Row>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6} className="my-3 p-0" hidden={isMobile}>
          {mapWPopus()}
        </Col>
      </Row>
      {renderMapMobile()}
      <Button className="btn btn-dark button__modal-map" onClick={() => setShow(true)}>
        Map
      </Button>
    </div>
  );
};

export default ListingsPage;
