/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Col, Row, Modal, Button } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Marker, Popup } from 'react-map-gl';
import Pin from './pin';
import DetailCard from '../DetailCard';
import { getAllHospitalsFromDB, setCurrentHospital, setCurrentUsers, createChatHospital } from '../../store/actions';
import Loader from '../Loader';
import AffiliationsMap from '../AffiliationsMap';

const Services = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lastestHospitals = useSelector((state) => state.lastestHospitals);
  useEffect(() => {
    if (lastestHospitals.length < 1) {
      getAllHospitalsFromDB(dispatch);
    }
  }, [lastestHospitals]);

  const [popupInfo, setPopupInfo] = useState(null);
  const [show, setShow] = useState(false);

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

  const pins = useMemo(
    () => lastestHospitals.map((h, index) => (
      <Marker
        key={`marker-${index + 1}`}
        longitude={h.location.lng}
        latitude={h.location.lat}
        anchor="bottom"
      >
        <Pin onClick={() => setPopupInfo(h)} />
      </Marker>
    )),
    [lastestHospitals],
  );

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
          <div>
            {popupInfo.hospitalName}
            ,
            {popupInfo.custom_json.opening_hours ? (popupInfo.custom_json.opening_hours?.open_now ? 'open' : 'closed') : ''}
            |
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
    <div className="px-4 w-100 d-flex">
      <Row>
        <h1 className="text-center py-5 fw-bold">
          Our
          {' '}
          <span className="text-qhali">Affiliations</span>
        </h1>
        <Col xs={12} sm={12} md={6} lg={6} xl={6} className="my-3">
          <Row>
            {lastestHospitals.length < 1 ? (
              <>
                <br />
                <br />
                <Loader />
              </>
            ) : (
              lastestHospitals.map((i, index) => (
                <Col xs={12} sm={6} md={12} lg={6} xl={4} key={`${index + 1}service`} className="pb-3">
                  <div onClick={() => { createAndNavigate({ ...i, username: i.hospitalName }); }} style={{ cursor: 'pointer' }}>
                    <DetailCard
                      title={i.hospitalName}
                      subtitle={i.custom_json.vicinity}
                      tag={i.custom_json.opening_hours ? (i.custom_json.opening_hours?.open_now ? 'open' : 'closed') : ''}
                      tagBg={i.custom_json.opening_hours && i.custom_json.opening_hours?.open_now ? '#b1ffe6' : '#b8b3be'}
                      centerIconName="fas fa-play-circle"
                      bottomIconName="fas fa-comment"
                      bgPhoto={i.custom_json.photo ? i.custom_json.photo.google_url : 'https://www.sanpablo.com.pe/wp-content/uploads/2018/09/FACHADA-SURCO-chica-clara-e1538239135354-1404x1024.jpg'}
                      totalReviews={i.totalRatings || 'No'}
                      ratingAverage={i.rating}
                      contHeight="20rem"
                    />
                  </div>
                </Col>
              ))
            )}
          </Row>
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6} className="my-3 p-0">
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

export default Services;
