// NotificationBtn.js
import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NotificationBtn = ({ Primaryicon, onClick, text, Primarystyle }) => {
  return (
    <Button variant="primary" onClick={onClick} className={Primarystyle}>
      <FontAwesomeIcon icon={Primaryicon} className="me-2" />
      {text}
    </Button>
  );
};

export default NotificationBtn;
