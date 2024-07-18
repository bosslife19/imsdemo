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
  const [lga, setLga] = useState('');
  const [schoolType, setSchoolType] = useState('');

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
  const filterOptionforLGA = useMemo(() => [
    
    {
      pk: 2,
      type: "AKOKO EDO",
    },
    {
      pk: 3,
      type: "EGOR",
    },
    {
      pk: 4,
      type: "ESAN CENTRAL",
    },
    {
      pk: 5,
      type: "ESAN NORTH EAST",
    },
    {
      pk: 6,
      type: "ESAN SOUTH EAST",
    },
    {
      pk: 7,
      type: "ESAN WEST",
    },
    {
      pk: 8,
      type: "ETSAKO CENTRAL",
    },
    {
      pk: 9,
      type: "ETSAKO EAST",
    },
    {
      pk: 10,
      type: "ETSAKO WEST",
    },
    {
      pk: 11,
      type: "IGUEBEN",
    },
    {
      pk: 12,
      type: "IKPOBA OKHA",
    },
    {
      pk: 13,
      type: "OREDO",
    },
    {
      pk: 14,
      type: "ORHIONMWON",
    },
    {
      pk: 15,
      type: "OVIA NORTH EAST",
    },
    {
      pk: 16,
      type: "OVIA SOUTH WEST",
    },
    {
      pk: 17,
      type: "OWAN EAST",
    },
    {
      pk: 18,
      type: "OWAN WEST",
    },
    {
      pk: 19,
      type: "UHUNMWODE",
    },

  ], []);

  const filterOptionForType = useMemo(()=>[
    {
      pk: 1,
      type: 'School Type'
    },
    {
      pk: 2,
      type: 'JSS'
    },
    {
      pk: 3,
      type: 'Primary'
    },
    {
      pk: 4,
      type: 'Progressive'
    }
  ])

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
    generateReport(format, lga, schoolType);
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
                <Col lg={12} md={12} xl={6} sm={12} xs={12} className="mb-3" style={{marginTop:'5%'}}>
                  <Filter
                    defult={"All"}
                    options={filterOptionforLGA}
                    optionTitle={"LGA"}
                    onSelect={(value) => setLga(value)}
                  />
                </Col>
                <Col lg={12} md={12} xl={6} sm={12} xs={12} style={{marginTop:'5%'}}>
                  <Filter defult={"All"} optionTitle={"School Type"} options={filterOptionForType} 
                  onSelect={(value)=>setSchoolType(value)}/>
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



<<<<<<< HEAD
export default GenerateInventory;
=======
export default GenerateInventory;
>>>>>>> 780830d8b64f267695da08aee11b2f60caeac71e
