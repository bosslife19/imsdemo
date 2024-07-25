import React from 'react'
import { Container } from 'react-bootstrap'

import { Row, Col, Card } from "react-bootstrap";

export const UserBox = ({items}) => {
    
      
  return (
    <div>
        <Container>
      
          <Row>
            <Col lg={12} md={12} xl={12} sm={12} xs={12} className="">
              <Card className="AdminRecentUserCardBodys">
                <div className="AdminRecentUserActivtyScrolls">
                  <Card.Title className="CardTiTle fw-bold m-3">
                    Low Stock Items
                  </Card.Title>
                  <Card.Body className="AdminRecentUser m-1 rounded">
                    {items.map((item, index) => (
                      <Row
                      style={{fontSize:"12px"}}
                        key={index}
                        className="align-items-center mb-2 py-1 "
                      >
                        <Col xs={4} lg={2} sm={4} md={4}>
                          <span className="" >{item.item_name}</span>
                        </Col>
                        <Col xs={4} lg={2} sm={4} md={4}>
                          <div
                            className="text-decoration-none text-success"
                          >
                            {item.item_code}
                          </div>
                        </Col>
                        <Col xs={4} lg={4} className="d-none d-lg-flex">
                          {item.barcode_id}
                        </Col>
                        <Col
                          xs={2}
                          lg={2}
                          className="text-muted d-none d-lg-flex"
                        >
                          {item.subject_category}
                        </Col>
                        <Col xs={4} lg={2} sm={4} md={4} className="text-muted">
                          {item.quantity}
                        </Col>
                      </Row>
                    ))}
                  </Card.Body>
                 
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
    </div>
  )
}
