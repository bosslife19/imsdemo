import React from 'react'
import { Modal, Container, Row, Col, Card } from 'react-bootstrap';

export const NotificationHistory = ({ show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>NotificationHistory</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row>
                <Col lg={12} md={12} xl={12} sm={12} xs={12} className="">
                  <Card className="AdminRecentUserCardBodys">
                    <div className="AdminRecentUserActivtyScrolls">
                      <Card.Title className="CardTiTle fw-bold m-3">
                      NotificationHistory
                      </Card.Title>
                      <Card.Body className="AdminRecentUser m-1 rounded">
                        
                        
                          <Row
                            style={{ fontSize: "12px" }}
                             className="align-items-center mb-2 py-1"
                          >
                            <Col xs={4} lg={2} sm={4} md={4}>
                              <span className="">name</span>
                            </Col>
                            <Col xs={4} lg={2} sm={4} md={4}>
                              <div className="text-decoration-none text-success">
                                code
                              </div>
                            </Col>
                            <Col xs={4} lg={4} className="d-none d-lg-flex">
                              barcode
                            </Col>
                            <Col xs={2} lg={2} className="text-muted d-none d-lg-flex">
                              dhdj
                            </Col>
                            <Col xs={4} lg={2} sm={4} md={4} className="text-muted">
                             jdhdghgj
                            </Col>
                          </Row>
                       </Card.Body>
                     
                    </div>
                  </Card>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
        </Modal>
      );
}
