import React from 'react';
import "./Button.css";
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function PrimaryButton({Primaryicon, text, Primarystyle, clickEvent}) {
  return (
    <Button className={`p-2 primaryMainButton ${Primarystyle}`} onClick={() => clickEvent()}>
        {Primaryicon? <FontAwesomeIcon icon={ Primaryicon } className='px-2'/> : null}
        {text}
    </Button>
  )
}

export default PrimaryButton