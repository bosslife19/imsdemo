import React, { useContext, useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "../../Admin/Inventory/Inventory.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import ConditionalSideNavigation from "../../../components/Navigations/ConditionalSideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import Filter from "../../../components/Filter/Filter";
import { LoadingPropagate } from "../../../components/Loading/Loading";
import InventoryItemContext from "../../../context/Item/InventoryItemContext";
import DataInventory from "./InventoryData";

function PeriodicInventory() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [buttonClick, setButtonClick] = useState(false);
  const [buttonText, setButtonText] = useState("Download Report");
  const [format, setFormat] = useState("");
  const [lga, setLga] = useState('');
  const [schoolType, setSchoolType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [presetRange, setPresetRange] = useState('custom');

  const {
    generateReport,
    createReportResponse,
    createReportIsLoading,
    createReportError,
    setCreateReportError,
    setCreateReportResponse,
  } = useContext(InventoryItemContext);

  const filterOption = useMemo(() => [
    { pk: 1, type: "pdf" },
    { pk: 2, type: "excel" },
  ], []);

  const filterOptionforLGA = useMemo(() => [
    { pk: 2, type: "AKOKO EDO" },
    { pk: 3, type: "EGOR" },
    { pk: 4, type: "ESAN CENTRAL" },
    { pk: 5, type: "ESAN NORTH EAST" },
    { pk: 6, type: "ESAN SOUTH EAST" },
    { pk: 7, type: "ESAN WEST" },
    { pk: 8, type: "ETSAKO CENTRAL" },
    { pk: 9, type: "ETSAKO EAST" },
    { pk: 10, type: "ETSAKO WEST" },
    { pk: 11, type: "IGUEBEN" },
    { pk: 12, type: "IKPOBA OKHA" },
    { pk: 13, type: "OREDO" },
    { pk: 14, type: "ORHIONMWON" },
    { pk: 15, type: "OVIA NORTH EAST" },
    { pk: 16, type: "OVIA SOUTH WEST" },
    { pk: 17, type: "OWAN EAST" },
    { pk: 18, type: "OWAN WEST" },
    { pk: 19, type: "UHUNMWODE" },
  ], []);

  const filterOptionForType = useMemo(() => [
    { pk: 1, type: 'School Type' },
    { pk: 2, type: 'JSS' },
    { pk: 3, type: 'Primary' },
    { pk: 4, type: 'Progressive' },
  ], []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Calculate min and max date limits
  const today = new Date();
  const maxDate = new Date();
  const minDate = new Date(today.setMonth(today.getMonth() - 6));
  const minRangeDate = new Date(today.setDate(today.getDate() - 1)).toISOString().split('T')[0]; // 1 day ago
  const maxDateStr = new Date().toISOString().split('T')[0]; // Today's date
  const minDateStr = minDate.toISOString().split('T')[0]; // 6 months ago

  const setDateRange = (range) => {
    const today = new Date();
    let start, end;

    switch (range) {
      case 'last1Month':
        start = new Date(today.setMonth(today.getMonth() - 1));
        end = new Date();
        break;
      case 'last3Months':
        start = new Date(today.setMonth(today.getMonth() - 3));
        end = new Date();
        break;
      case 'last6Months':
        start = new Date(today.setMonth(today.getMonth() - 6));
        end = new Date();
        break;
      case 'custom':
      default:
        start = end = '';
        break;
    }

    setStartDate(start ? start.toISOString().split('T')[0] : '');
    setEndDate(end ? end.toISOString().split('T')[0] : '');
  };

  useEffect(() => {
    if (!createReportIsLoading && createReportResponse) {
      setButtonClick(false);
      console.log(createReportResponse);
      setButtonText("Download Report→");
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
    setButtonClick(createReportIsLoading);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!format) {
      alert('Select a format');
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 1 || diffDays > 183) { 
      alert('The date range must be between 1 day and 6 months.');
      return;
    }

    generateReport(format, lga, schoolType, startDate, endDate);
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
            <TitleHeader text={"Periodic Report"} />
          </div>
          <Row>
            <DataInventory/>
          </Row>
          <Row className="mb-3">
            <Col lg={12} md={12} xl={6} sm={12} xs={12} className="mb-3">
              <Row>
                <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                  <Form.Group>
                    <Form.Label>Select Date Range</Form.Label>
                    <Form.Control as="select" value={presetRange} onChange={(e) => {
                      const selectedRange = e.target.value;
                      setPresetRange(selectedRange);
                      setDateRange(selectedRange);
                    }}>
                      <option value="custom">Custom Range</option>
                      <option value="last1Month">Last 1 Month</option>
                      <option value="last3Months">Last 3 Months</option>
                      <option value="last6Months">Last 6 Months</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col lg={6} md={6} xl={6} sm={6} xs={6} className="">
                  <p style={{marginLeft:10}}>From</p>
                  <Form.Control
                    type="date"
                    placeholder="Select start date"
                    className="pushNotificationTitle"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    min={minDateStr}
                    max={maxDateStr}
                    disabled={presetRange !== 'custom'}
                  />
                </Col>
                <Col lg={6} md={6} xl={6} sm={6} xs={6}>
                  <p style={{marginLeft:10}}>To</p>
                  <Form.Control
                    type="date"
                    placeholder="Select end date"
                    className="pushNotificationTitle"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    min={minDateStr}
                    max={maxDateStr}
                    disabled={presetRange !== 'custom'}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="notificationTitle">
              <Row>
                <Col lg={4} md={12} xl={4} sm={12} xs={12} className="d-lg-none mb-3">
                  <Filter
                    defult={"None"}
                    optionTitle={"Report Format"}
                    options={filterOption}
                    onSelect={(value) => setFormat(value)}
                  />
                </Col>
                <Col lg={4} md={12} xl={4} sm={12} xs={12} className="d-none d-lg-block">
                  <Filter
                    defult={"None"}
                    optionTitle={"Report Format"}
                    options={filterOption}
                    onSelect={(value) => setFormat(value)}
                  />
                </Col>
              </Row>
            </Form.Group>
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

export default PeriodicInventory;
