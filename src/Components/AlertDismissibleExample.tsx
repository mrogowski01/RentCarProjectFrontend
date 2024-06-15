import { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';

function AlertDismissibleExample({ message, onClose }) {
  const [show, setShow] = useState(true);

  const handleClose = () => {
    setShow(false);
    if (onClose) {
      onClose();
    }
  };

  if (show && message) {
    return (
      <Alert variant="danger" onClose={handleClose} dismissible>
        <p>{message}</p>
      </Alert>
    );
  }
  return null;
}

export default AlertDismissibleExample;
