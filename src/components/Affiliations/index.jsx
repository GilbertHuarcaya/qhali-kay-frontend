/* eslint-disable no-nested-ternary */
/* eslint-disable no-console */
import { useEffect, useMemo, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Marker, Popup } from 'react-map-gl';
import Pin from './pin';
import DetailCard from '../DetailCard';
import { getAllHospitalsFromDB } from '../../store/actions';
import Loader from '../Loader';
import AffiliationsMap from '../AffiliationsMap';

const Services = () => {
  const dispatch = useDispatch();
  const lastestHospitals = useSelector((state) => state.lastestHospitals);
  useEffect(() => {
    if (lastestHospitals.length < 1) {
      getAllHospitalsFromDB(dispatch);
    }
  }, [lastestHospitals]);

  const [popupInfo, setPopupInfo] = useState(null);

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
                <Col xs={12} sm={12} md={12} lg={6} xl={4} key={`${index + 1}service`} className="pb-3">
                  <DetailCard
                    title={i.hospitalName}
                    subtitle={i.custom_json.vicinity}
                    tag={i.custom_json.opening_hours ? (i.custom_json.opening_hours?.open_now ? 'open' : 'closed') : ''}
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
        </Col>
        <Col xs={12} sm={12} md={6} lg={6} xl={6} className="my-3">
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
        </Col>
      </Row>
    </div>
  );
};

export default Services;
