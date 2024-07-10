import React from 'react'
import { Container } from 'react-bootstrap'
import Filter from '../../components/Filter/Filter'
import TitleHeader from '../../components/Headers/TitleHeader'
import { Row, Col, Card } from "react-bootstrap";

export const UserBox = () => {
    const filterData = [
        {
          pk: 1,
          type: "Date",
        },
      ];
      const activities = [
        {
          id: 1,
          name: "JOHN DIGGLE",
          action: "Viewed stock items",
          description: "Books sent to ABC Academy",
          date: "10th Feb, 2022",
          time: "3:56pm",
        },
        {
          id: 2,
          name: "JOHN DIGGLE",
          action: "Viewed stock items",
          description: "Books sent to ABC Academy",
          date: "10th Feb, 2022",
          time: "3:56pm",
        },
        {
          id: 3,
          name: "JOHN DIGGLE",
          action: "Viewed stock items",
          description: "Books sent to ABC Academy",
          date: "10th Feb, 2022",
          time: "3:56pm",
        },
        {
          id: 4,
          name: "JOHN DIGGLE",
          action: "Viewed stock items",
          description: "Books sent to ABC Academy",
          date: "10th Feb, 2022",
          time: "3:56pm",
        },
        {
          id: 5,
          name: "JOHN DIGGLE",
          action: "Viewed stock items",
          description: "Books sent to ABC Academy",
          date: "10th Feb, 2022",
          time: "3:56pm",
        },
      ];
  return (
    <div>
        <Container>
        {/* <Row className="mb-3 mt-5">
            <Col lg={12} md={12} xl={12} sm={12} xs={12}>
              <div className="d-flex justify-content-between ">
                <TitleHeader
                  text={"Recent User Activity"}
                  headerTextStyle={"headerTextStyle"}
                />
                <Filter
                  optionTitle={"User Role"}
                  options={filterData}
                  defult={"All"}
                  Filterstyle={"d-none d-lg-block"}
                />
              </div>
              <div className=" d-lg-none d-flex justify-content-end ">
                <Filter
                  optionTitle={"User Role"}
                  options={filterData}
                  defult={"All"}
                />
              </div>
            </Col>
          </Row> */}

          <Row>
            <Col lg={12} md={12} xl={12} sm={12} xs={12} className="">
              <Card className="AdminRecentUserCardBodys">
                <div className="AdminRecentUserActivtyScrolls">
                  <Card.Title className="CardTiTle fw-bold m-3">
                    Admin
                  </Card.Title>
                  <Card.Body className="AdminRecentUser m-3 rounded">
                    {activities.map((activity) => (
                      <Row
                      style={{fontSize:"12px"}}
                        key={activity.id}
                        className="align-items-center mb-2 py-1 "
                      >
                        <Col xs={4} lg={2} sm={4} md={4}>
                          <span className="" >{activity.name}</span>
                        </Col>
                        <Col xs={4} lg={2} sm={4} md={4}>
                          <div
                            className="text-decoration-none text-success"
                          >
                            {activity.action}
                          </div>
                        </Col>
                        <Col xs={4} lg={4} className="d-none d-lg-flex">
                          {activity.description}
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
                  <Card.Title className="CardTiTle fw-bold m-3">
                    Warehouse Staff
                  </Card.Title>

                  <Card.Body className="AdminRecentUser m-4 rounded">
                    {activities.map((activity) => (
                      <Row
                      style={{fontSize:"12px"}}
                        key={activity.id}
                        className="align-items-center mb-2 py-2 " 
                      >
                        <Col xs={4} lg={2} sm={4} md={4}>
                          <span className="">{activity.name}</span>
                        </Col>
                        <Col xs={4} lg={2} sm={4} md={4}>
                          <a
                            href="/"
                            className="text-decoration-none text-success"
                          >
                            {activity.action}
                          </a>
                        </Col>
                        <Col xs={4} lg={4} className="d-none d-lg-flex">
                          {activity.description}
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
                  <Card.Title className="CardTiTle fw-bold m-3">
                    Head Teacher
                  </Card.Title>

                  <Card.Body className="AdminRecentUser m-4 rounded">
                    {activities.map((activity) => (
                      <Row
                      style={{fontSize:"12px"}}
                        key={activity.id}
                        className="align-items-center mb-2 py-2 "
                      >
                        <Col xs={4} lg={2} sm={4} md={4}>
                          <span className="" >{activity.name}</span>
                        </Col>
                        <Col xs={4} lg={2} sm={4} md={4}>
                          <a
                            href="/"
                            className="text-decoration-none text-success"
                          >
                            {activity.action}
                          </a>
                        </Col>
                        <Col xs={4} lg={4} className="d-none d-lg-flex">
                          {activity.description}
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
