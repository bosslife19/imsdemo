import React, { useState } from "react";
import { Container, Row, Col, Form, Button, InputGroup } from "react-bootstrap";
import "./ScanMaterial.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import WareHouseSideNavigation from "../Navigation/WareHouseSideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { useNavigate } from "react-router-dom";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";

function ScanMaterial() {
  const navigate = useNavigate();
  const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [idNumber, setIdNumber] = useState("");
  const [stockCount, setStockCount] = useState(0);
  const [item, setItem] = useState(null);
  const [numOfTimes, setNumberOftimes] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleScanClick = async() => {
    // Handle scan button click
    setIsLoading(true);
    setError('');
    try {
      const res = await axios.post(`${baseUrl}/api/item/scan`, {barcode_id:idNumber});
    setIsLoading(false)
    setItem(res.data.item);

    setStockCount(res.data.item.quantity)
    setNumberOftimes((prev)=>prev + 1);
    } catch (error) {
      setIsLoading(false);
      if(error.response.data){
        setError(error.response.data.message)
      }else{
        setError('There is a network connection issue. Check your network')
      }
      console.log(error)
    }
    
    
  };

  

  const handleEnterDatabaseClick = () => {
    // Handle enter item into database button click
  };
  const handleViewItem = (pk) => {
  
  if(item){
    navigate(`/ItemDetail/${item.item_code}`)
  }else{
    return;
  }
    
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <WareHouseSideNavigation
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <Container className="reportContainer">
          <BackButtonIcon/>
          <TitleHeader text={"Scan Materials"} />
          <Row className="justify-content-center">
            <Col xs={12} lg={12} className="text-center mb-3">
              <div className="scanArea ">
                <FontAwesomeIcon
                  className="text-muted"
                  icon={faExpand}
                  size="4x"
                />
                <p className="mt-2 text-muted">Please connect your Scanner!</p>
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center mb-4">
            <Col xs={12} lg={12} className="text-center ">
              <hr />
              <span>OR</span>
              <hr />
            </Col>
          </Row>
          <Row className="justify-content-center mb-4">
            {error&& <p style={{color:'red', marginLeft:10}}>{error}</p>}
            <Col xs={12} lg={12}>
              <Form.Control
                type="text"
                placeholder="Enter ID number"
                value={idNumber}
                onChange={(e) => setIdNumber(e.target.value)}
                className="DiscrepancyInput"
              />
            </Col>
          </Row>
          <Row className="justify-content-center mb-4">
            <Col xs={12} lg={12}>
              <Button
                variant="success"
                className="w-100 p-3"
                onClick={handleScanClick}
              >
                {isLoading? <FontAwesomeIcon icon={faSpinner} spin size="2x" />: 'Scan'}
                
              </Button>
            </Col>
          </Row>

          <Row className="d-flex justify-content-between mb-4">
            <Col xs={12} lg={5} sm={12} xl={4} className="text-center mb-2">
              <div className="border rounded rounded-4 p-2">
                <span className=" text-muted">
                  Number of Items Scanned: <b>{numOfTimes}</b>
                </span>
              </div>
            </Col>
            <Col xs={12} lg={5} sm={12} xl={4} className="text-center ">
              <PrimaryButton
                text={"View"}
                Primarystyle={"schoolViewButton w-100"}
                clickEvent={() => handleViewItem()}

              />
            </Col>
          </Row>

          <Row className="mb-3">
            <Col xs={12} sm={12} md={12} lg={12} xl={2} className="text-center">
              <Form.Group className="d-flex justify-content-between align-items-center">
                <Form.Label className=" w-100">Stock Count</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    className="scanStockCountInput p-3 rounded rounded-4 mx-1"
                    type="number"
                    value={stockCount}
                    onChange={(e) => setStockCount(Number(e.target.value))}
                  />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row className="justify-content-center mb-3">
            <Col xs={12} lg={12}>
              {/* <Button
                variant="outline-success"
                className="w-100 p-3"
                onClick={handleEnterDatabaseClick}
              >
                Enter Item Into Database
              </Button> */}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default ScanMaterial;
