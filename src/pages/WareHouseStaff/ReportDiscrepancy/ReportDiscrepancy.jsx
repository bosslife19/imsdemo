import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./ReportDiscrepancy.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import TitleHeader from "../../../components/Headers/TitleHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ComfirmationPop from "../../../components/ComfirmationPopUp/ComfirmationPop";
import { scrollToTop } from "../../../utils/HelperFunc";
import DiscrepancyContext from "../../../context/Discrepancy/DiscrepancyContext";
import AuthenticationContext from "../../../context/Authentication/AuthenticationContext";
import ConditionalSideNavigation from "../../../components/Navigations/ConditionalSideNavigation";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";

function ReportDiscrepancy() {
  const {
    addDiscrepancyResponse,
    addDiscrepancyIsLoading,
    addDiscrepancyError,
    setAddDiscrepancyResponse,
    setAddDiscrepancyError,
    handleAddDiscrepancy,
    formData: formData,
    setFormData: setFormData,
  } = useContext(DiscrepancyContext);

  const { userData } = useContext(AuthenticationContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [comfirmationAction, setComfirmationAction] = useState(false);
  const [message, setmessage] = useState("");
  const [messageColor, setmessageColor] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  const initialFormData = {
    report_id: '',
    reporter: userData.name,
    item_name: '',
    supplier: '',
    expected_quantity: 0,
    actual_quantity: 0,
    discrepancy_type: '',
    description: '',
    date: '',
  };

  useEffect(() => {
    setFormData(initialFormData)
  }, [])

  useEffect(() => {
    if (!addDiscrepancyIsLoading && addDiscrepancyResponse) {
      scrollToTop();
      handleComfirmationPopUps('Report created successfully!', "bg-success");
      setButtonLoading(false);
      setAddDiscrepancyResponse(null);
      setFormData(initialFormData)
    }
  }, [addDiscrepancyIsLoading, addDiscrepancyResponse]);

  useEffect(() => {
    if (!addDiscrepancyIsLoading && addDiscrepancyError) {
      scrollToTop();
      handleComfirmationPopUps(addDiscrepancyError, "bg-danger");
      setButtonLoading(false);
    }
    setAddDiscrepancyError(null);
  }, [addDiscrepancyIsLoading, addDiscrepancyError]);

  const handleComfirmationPopUps = (messageInfo, messageBgColor) => {
    setmessage(messageInfo);
    setmessageColor(messageBgColor);
    setComfirmationAction(true);
    setTimeout(() => {
      setComfirmationAction(false);
    }, 4000);
  };

  const handleLoadingClick = () => {
    if (
      addDiscrepancyIsLoading ||
      (!addDiscrepancyIsLoading && !addDiscrepancyError && !addDiscrepancyResponse)
    ) {
      setButtonLoading(true);
    } else {
      setButtonLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    handleAddDiscrepancy(e);
    handleLoadingClick();
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
      <ConditionalSideNavigation isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
     
        <Container className="reportContainer">
        <BackButtonIcon/>
          <TitleHeader text={"Report Discrepancy"} />
          {message
            ? comfirmationAction && (
                <ComfirmationPop
                  message={message}
                  ComfirmationContainerStyle={`${messageColor} d-flex mb-2`}
                />
              )
            : null}
          <Form onSubmit={handleSubmit}>
            <Row>
              <TitleHeader
                text={"Report Information"}
                headerTextStyle={"headerTextStyle"}
              />
              <Form.Group className="mb-3" controlId="notificationTitle">
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      value={formData.report_id}
                      onChange={handleChange}
                      placeholder="Report ID"
                      className="DiscrepancyInput"
                      name="report_id"
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="DiscrepancyInput"
                      name="date"
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      value={formData.reporter}
                      onChange={handleChange}
                      className="DiscrepancyInput"
                      name="reporter"
                      readOnly
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Row>

            <Row>
              <TitleHeader
                text={"Discrepancy Details"}
                headerTextStyle={"headerTextStyle"}
              />
              <Form.Group className="mb-3" controlId="notificationTitle">
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      value={formData.item_name}
                      onChange={handleChange}
                      placeholder="Item Name"
                      className="DiscrepancyInput"
                      name="item_name"
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      value={formData.supplier}
                      onChange={handleChange}
                      placeholder="Supplier"
                      className="DiscrepancyInput"
                      name="supplier"
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="number"
                      value={formData.expected_quantity}
                      onChange={handleChange}
                      placeholder="Expected Quantity"
                      className="DiscrepancyInput"
                      name="expected_quantity"
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="number"
                      value={formData.actual_quantity}
                      onChange={handleChange}
                      placeholder="Actual Quantity"
                      className="DiscrepancyInput"
                      name="actual_quantity"
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      value={formData.discrepancy_type}
                      onChange={handleChange}
                      placeholder="Discrepancy Type"
                      className="DiscrepancyInput"
                      name="discrepancy_type"
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                      required
                      placeholder="Description..."
                      className="DiscrepancyTextArea"
                      name="description"
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Button variant="success" className="w-100 p-2" type="submit">
                {buttonLoading ? (
                    <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                  ) : (
                    "Report Discrepancy"
                  )}
              </Button>
            </Row>
          </Form>
        </Container>
      </div>
    </div>
  );
}

export default ReportDiscrepancy;
