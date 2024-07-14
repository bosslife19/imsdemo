import React, { useContext, useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Inventory.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import ConditionalSideNavigation from "../../../components/Navigations/ConditionalSideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import Filter from "../../../components/Filter/Filter";
import { LoadingPropagate } from "../../../components/Loading/Loading";
import InventoryItemContext from "../../../context/Item/InventoryItemContext";

function GenerateInventory() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [buttonClick, setButtonClick] = useState(false);
  const [buttonText, setButtonText] = useState("Generate Report");
  const [format, setFormat] = useState("");

  const {
    generateReport,
    createReportResponse,
    createReportIsLoading,
    createReportError,
    setCreateReportError,
    setCreateReportResponse,
  } = useContext(InventoryItemContext);

  const filterOption = useMemo(
    () => [
      {
        pk: 1,
        type: "pdf",
      },
      
      {
        pk: 2,
        type: "excel",
      },
    ],
    []
  );

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (!createReportIsLoading && createReportResponse) {
      setButtonClick(false);
      console.log(createReportResponse);
      setButtonText("Report Generated →");
      setCreateReportResponse(null);
    }
  }, [createReportIsLoading, createReportResponse]);

  useEffect(() => {
    if (!createReportIsLoading && createReportError) {
      setButtonClick(false);
      console.log(createReportError);
      setButtonText("Error X");
      setCreateReportError(null);
    }
  }, [createReportIsLoading, createReportError]);

  const handleLoadingClick = () => {
    if (
      createReportIsLoading ||
      (!createReportIsLoading && !createReportError && !createReportError)
    ) {
      setButtonClick(true);
    } else {
      setButtonClick(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!format) {
      alert('Select a format')
      return;
    }
    generateReport(format);
    handleLoadingClick();
  };

  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <ConditionalSideNavigation isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Container className="reportContainer">
          <div className="d-flex">
            <BackButtonIcon />
            <TitleHeader text={"Generate Report"} />
          </div>
          <Row className="mb-3">
            <Col lg={12} md={12} xl={6} sm={12} xs={12} className="mb-3">
              <Row>
                <Col lg={6} md={6} xl={6} sm={6} xs={6} className="">
                <p style={{marginLeft:10}}>from</p>
                <Form.Control
                    type="date"
                    placeholder="Minimum Stock Level"
                    className="pushNotificationTitle"
                  />
                  {/* <Filter defult={"24th Aug. 2023"} optionTitle={"From-"} /> */}
                </Col>
                <Col lg={6} md={6} xl={6} sm={6} xs={6}>
                  {/* <Filter defult={"24th Aug. 2023"} optionTitle={"To-"} /> */}
                  <p style={{marginLeft:10}}>to</p>
                  <Form.Control
                    type="date"
                    placeholder="Minimum Stock Level"
                    className="pushNotificationTitle"
                  />
                </Col>
              </Row>
            </Col>
            <Col lg={12} md={12} xl={6} sm={12} xs={12}>
              <Row>
                <Col lg={12} md={12} xl={6} sm={12} xs={12} className="mb-3">
                  <Filter
                    defult={"Aisle 2, Shelf C1"}
                    optionTitle={"LGA"}
                  />
                </Col>
                <Col lg={12} md={12} xl={6} sm={12} xs={12}>
                  <Filter defult={"Office Supplies"} optionTitle={"item Category"} />
                </Col>
              </Row>
            </Col>
          </Row>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="notificationTitle">
              <Row>
                <Col
                  lg={4}
                  md={12}
                  xl={4}
                  sm={12}
                  xs={12}
                  className="d-lg-none mb-3"
                >
                  <Filter
                    defult={"None"}
                    optionTitle={"Report Format"}
                    options={filterOption}
                    onSelect={(value) => setFormat(value)}
                  />
                </Col>
                <Col lg={8} md={12} xl={8} sm={12} xs={12}>
                  <Form.Control
                    type="text"
                    placeholder="Minimum Stock Level"
                    className="pushNotificationTitle"
                  />
                </Col>
                <Col
                  lg={4}
                  md={12}
                  xl={4}
                  sm={12}
                  xs={12}
                  className="d-none d-lg-block"
                >
                  <Filter
                    defult={"None"}
                    optionTitle={"Report Format"}
                    options={filterOption}
                    onSelect={(value) => setFormat(value)}
                  />
                </Col>
              </Row>
            </Form.Group>

            <Row>
              <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                <Form.Group className="mb-3" controlId="InventoryMessage">
                  <Form.Control
                    as="textarea"
                    rows={6}
                    placeholder="Comment..."
                    className="pushNotificationTextArea"
                  />
                </Form.Group>
              </Col>
            </Row>
            {!buttonClick ? (
              <Button variant="success" className="w-100 p-2" type="submit">
                {buttonText}
              </Button>
            ) : (
              <Button variant="success" className="w-100 p-2" type="submit">
                <LoadingPropagate loading={buttonClick} />
              </Button>
            )}
          </Form>
        </Container>
      </div>
    </div>
  );
}



export default GenerateInventory;
