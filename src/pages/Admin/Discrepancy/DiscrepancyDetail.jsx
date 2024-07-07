import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import "./Discrepancy.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import SideNavigation from "../../../components/Navigations/SideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import { useParams } from "react-router-dom";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import Loading from "../../../components/Loading/Loading";
import DiscrepancyContext from "../../../context/Discrepancy/DiscrepancyContext";
import { convertDate } from "../../../utils/HelperFunc";
import NonAvaliable from "../../../components/NonAvaliable/NonAvaliable";

function DiscrepancyDetail() {
  let { pk } = useParams();

  const {
    getDiscrepancyData,
    getDiscrepancyIsLoading,
    getDiscrepancy,
  } = useContext(DiscrepancyContext);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    getDiscrepancy(pk);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <SideNavigation isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Container className="reportContainer">
          <div className="d-flex">
            <BackButtonIcon />
            <TitleHeader text={"View Discrepancy Details"} />
          </div>
          {getDiscrepancyIsLoading ? (
            <Container className="d-flex justify-content-center align-items-center vh-100">
              <Loading loading={getDiscrepancyIsLoading} />
            </Container>
          ) : getDiscrepancyData ? (
            <div>
              <Row>
                <TitleHeader
                  text={"Report Information"}
                  headerTextStyle={"headerTextStyle"}
                />
                <Form>
                  <Form.Group className="mb-3" controlId="notificationTitle">
                    <Row className="mb-3">
                      <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                        <Form.Control
                          type="text"
                          className="DiscrepancyInput"
                          value={getDiscrepancyData.report_id}
                          readOnly
                        />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                        <Form.Control
                          type="text"
                          className="DiscrepancyInput"
                          value={getDiscrepancyData.date}
                          readOnly
                        />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                        <Form.Control
                          type="text"
                          value={getDiscrepancyData.reporter}
                          readOnly
                          className="DiscrepancyInput"
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                </Form>
              </Row>
              <Row>
                <TitleHeader
                  text={"Discrepancy Details"}
                  headerTextStyle={"headerTextStyle"}
                />
                <Form>
                  <Form.Group className="mb-3" controlId="notificationTitle">
                    <Row className="mb-3">
                      <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                        <Form.Control
                          type="text"
                          value={getDiscrepancyData.item_name}
                          readOnly
                          className="DiscrepancyInput"
                        />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                        <Form.Control
                          type="text"
                          value={getDiscrepancyData.supplier}
                          readOnly
                          className="DiscrepancyInput"
                        />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                        <Form.Control
                          type="text"
                          value={getDiscrepancyData.expected_quantity}
                          readOnly
                          className="DiscrepancyInput"
                        />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                        <Form.Control
                          type="text"
                          value={getDiscrepancyData.actual_quantity}
                          readOnly
                          className="DiscrepancyInput"
                        />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                        <Form.Control
                          type="text"
                          value={getDiscrepancyData.discrepancy_type}
                          readOnly
                          className="DiscrepancyInput"
                        />
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                        <Form.Control
                          as="textarea"
                          rows={4}
                          value={getDiscrepancyData.description}
                          readOnly
                          className="DiscrepancyTextArea"
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                </Form>
              </Row>
            </div>
                 ) : (
                  <NonAvaliable
                    textMessage={"Sorry, Discrepancy not available"}
                    imageWidth={"300px"}
                  />
                )}
        </Container>
      </div>
    </div>
  );
}

export default DiscrepancyDetail;
