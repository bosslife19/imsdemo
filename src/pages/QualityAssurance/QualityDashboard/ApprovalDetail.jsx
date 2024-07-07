import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./QualityDashboard.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import QualityNavigation from "../../../pages/QualityAssurance/QualityNavigation/QualityNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";

function ApprovalDetail() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);

  };
  return (
    <div>
            <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <QualityNavigation isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Container className="reportContainer">
          <div className="d-flex">
            <BackButtonIcon />
            <TitleHeader text={"Approval Details"} />
          </div>
          <Row>
            <TitleHeader text={"Overview"} headerTextStyle={'headerTextStyle'}/>
            <Form>
              <Form.Group className="mb-3" controlId="notificationTitle">
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="Add New Item"
                      className="DiscrepancyInput"
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control type="text" placeholder="John Doe" className="DiscrepancyInput" />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control type="text" placeholder="10:50 AM" className="DiscrepancyInput" />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="Pending Approval"
                      className="DiscrepancyInput"
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </Row>
          <Row>
            <TitleHeader text={"Action Details"} headerTextStyle={'headerTextStyle'}/>
            <Form>
              <Form.Group className="mb-3" controlId="notificationTitle">
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="Tables"
                      className="DiscrepancyInput"
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control type="text" placeholder="Office Material" className="DiscrepancyInput" />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control type="text" placeholder="Furniture" className="DiscrepancyInput" />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control type="text" placeholder="3,567" className="DiscrepancyInput" />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control type="text" placeholder="AVX Holdings" className="DiscrepancyInput" />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="#8,000"
                      className="DiscrepancyInput"
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          </Row>
          <Row>
            <TitleHeader text={"Additional Information"} headerTextStyle={'headerTextStyle'}/>
            <Form>
              <Form.Group className="mb-3" controlId="notificationTitle">
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder=""
                      className="DiscrepancyTextArea"
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Row>
                <Col xl={4} lg={4} md={4} sm={12} xs={12} className="mb-2">
                  <Button variant="outline-warning" className="w-100 p-2"> Query </Button>
                </Col>
                <Col xl={4} lg={4} md={4} sm={12} xs={12} className="mb-2">
                  <Button variant="success" className="w-100 p-2"> Approve </Button>
                </Col>
                <Col xl={4} lg={4} md={4} sm={12} xs={12} className="mb-2">
                  <Button variant="danger" className="w-100 p-2"> Deny </Button>
                </Col>
              </Row>
            </Form>
          </Row>
          </Container>
        </div>
    </div>
  )
}

export default ApprovalDetail