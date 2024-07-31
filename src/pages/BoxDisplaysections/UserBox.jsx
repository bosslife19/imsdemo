import React, {useState, useEffect} from 'react'
import { Container } from 'react-bootstrap'

import axios from 'axios'
import { Row, Col, Card } from "react-bootstrap";

export const UserBox = () => {
    const filterData = [
        {
          pk: 1,
          type: "Date",
        },
      ];
const [logs, setLogs] = useState([])
      const getLogs = async()=>{
        const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
        try {
          const response = await axios.get(`${baseUrl}/api/get-logs`);
          
          setLogs(response.data)
        } catch (error) {
          console.log(error)
        }
       
      }
    
      useEffect(()=>{
        getLogs()
      }, [])
      const activities = [
        {
          id: 1,
          name: "JOHN DIGGLE",
          action: "Viewed stock items",
          description: "Books sent to EdoSUBEB",
          date: "10th Feb, 2022",
          time: "3:56pm",
        },
        {
          id: 2,
          name: "JOHN DIGGLE",
          action: "Viewed stock items",
          description: "Books sent to EdoSUBEB",
          date: "10th Feb, 2022",
          time: "3:56pm",
        },
        {
          id: 3,
          name: "JOHN DIGGLE",
          action: "Viewed stock items",
          description: "Books sent to EdoSUBEB",
          date: "10th Feb, 2022",
          time: "3:56pm",
        },
        {
          id: 4,
          name: "JOHN DIGGLE",
          action: "Viewed stock items",
          description: "Books sent to EdoSUBEB",
          date: "10th Feb, 2022",
          time: "3:56pm",
        },
        {
          id: 5,
          name: "JOHN DIGGLE",
          action: "Viewed stock items",
          description: "Books sent to EdoSUBEB",
          date: "10th Feb, 2022",
          time: "3:56pm",
        },
      ];
  return (
    <div>
        <Container>
      
          <Row>
            <Col lg={12} md={12} xl={12} sm={12} xs={12} className="">
              <Card className="AdminRecentUserCardBodys">
                <div className="AdminRecentUserActivtyScrolls">
                  <Card.Title className="CardTiTle fw-bold m-3">
                    User Activity Reports
                  </Card.Title>
                  <Card.Body className="AdminRecentUser m-1 rounded">
                  
                    {logs.map((activity) => (
                      <Row
                      style={{fontSize:"12px"}}
                        key={activity.id}
                        className="align-items-center mb-2 py-1 "
                      >
                        <Col xs={4} lg={2} sm={4} md={4}>
                          <span className="" >{activity.email}</span>
                        </Col>
                        <Col xs={4} lg={2} sm={4} md={4}>
                          <div
                            className="text-decoration-none text-success"
                          >
                            {activity.category}
                          </div>
                        </Col>
                        <Col xs={4} lg={4} className="d-none d-lg-flex">
                          {activity["log-details"]}
                        </Col>
                        <Col
                          xs={2}
                          lg={2}
                          className="text-muted d-none d-lg-flex"
                        >
                          {activity.date}
                        </Col>
                        <Col xs={4} lg={2} sm={4} md={4} className="text-muted">
                          {activity.time}
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
