/* eslint-disable no-unused-expressions */
import React, { useContext, useEffect, useState } from 'react';

import { Row, Col } from 'react-grid-system';
import { Card } from 'antd';
import Navbar from '../Navbar';

import { Context } from '../data/context';

const { Meta } = Card;

const ListingsPage = () => {
  const { users } = useContext(Context);
  const [parsedUsers, setParsedUsers] = useState();
  useEffect(() => {
    if (users) {
      setParsedUsers(users.map((e) => ({ ...e, custom_json: JSON.parse(e.custom_json) })));
    }
  }, [users]);
  console.log(parsedUsers);
  function renderSellers() {
    return parsedUsers.map((seller, index) => (
      <Col
        key={`product-${index + 1}`}
        xs={12}
        sm={6}
        md={4}
        lg={3}
      >
        <div style={{ margin: '12px' }}>
          <a href={`/product/${seller.id}`}>
            <Card
              hoverable
              style={{ 'max-width': '100%' }}
              cover={(
                <img
                  alt="example"
                  src={seller.custom_json.photos[0]}
                  style={{ width: '100%', height: '320px', objectFit: 'cover' }}
                />
                                  )}
            >
              <Meta
                title={seller.custom_json.product}
                description={`${seller.custom_json.price} - ${seller.first_name} ${seller.last_name}`}
              />
            </Card>
          </a>
        </div>
      </Col>
    ));
  }

  return (
    <Row className="w-100">
      <Navbar />
      { parsedUsers ? renderSellers() : <h1>Nada</h1> }
    </Row>
  );
};

export default ListingsPage;
