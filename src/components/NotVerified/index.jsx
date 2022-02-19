import {
  Modal,
  Button,
} from 'react-bootstrap';
import { useState } from 'react';

const NotVerified = () => {
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Important</Modal.Title>
      </Modal.Header>
      <Modal.Body>This account needs verification, please check your messages</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NotVerified;
