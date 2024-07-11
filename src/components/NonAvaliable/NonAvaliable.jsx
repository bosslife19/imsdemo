import React from "react";
import { Container, Row, Image } from "react-bootstrap";
import NoNotification from "../../assets/bigIcon/NoNotification.png";

function NonAvaliable({textMessage, imageWidth}) {
  return (
    <Row className="">
      <Container className="d-flex flex-column align-items-center justify-content-center">
        <Image src={NoNotification} className="" width={imageWidth} />
        <h6 className="LogoutComfirmText text-center">
          {textMessage}
        </h6>
      </Container>
    </Row>
  );
}

export default NonAvaliable;
