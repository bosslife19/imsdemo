import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { Modal, Container, Row, Col, Card } from 'react-bootstrap';

export const NotificationHistory = ({ show, handleClose }) => {
  const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
const [history, setHistory] = useState([])
  const getHistory = async()=>{
    try {
      const res =  await axios.get(`${baseUrl}/api/notification-history`);
     
      setHistory(res.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getHistory()
  }, [])
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
                              <span className="">Title</span>
                            </Col>
                            <Col xs={4} lg={2} sm={4} md={4}>
                              <div className="text-decoration-none text-success">
                                Message
                              </div>
                            </Col>
                            <Col xs={4} lg={2} sm={4} md={4}>
                              <div className="text-decoration-none text-success">
                                Time
                              </div>
                            </Col>
                            
                            
                            
                          </Row>
                          <Row className='align-items-center mb-2 py-1'>
                            {
                              history && history.map(item=>(
                                <>
                                <Col xs={4} lg={2} sm={4} md={4}>
                              <span className="">{item.title}</span>
                            </Col>
                            <Col xs={4} lg={2} sm={4} md={4}>
                            <span className="">{item.message}</span>
                          </Col>
                          <Col xs={4} lg={2} sm={4} md={4}>
                              <div className="text-decoration-none text-success">
                                {item.created_at}
                              </div>
                            </Col>
                                </>
                                
                              ))
                            }
                         
                           
                            
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
