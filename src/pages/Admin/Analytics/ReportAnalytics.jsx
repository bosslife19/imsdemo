import React, { useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import SideNavigation from "../../../components/Navigations/SideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import Search from "../../../components/Search/Search";
import Filter from "../../../components/Filter/Filter";
import InventoryIcon from "../../../assets/bigIcon/Shape1.png";
import UserIcon from "../../../assets/bigIcon/Shape2.png";
import ExpireIcon from "../../../assets/bigIcon/Shape5.png";
import "./Analytics.css";
import { InventoryBox } from "../../BoxDisplaysections/InventoryBox";
import { UserBox } from "../../BoxDisplaysections/UserBox";

function ReportAnalytics() {
  const [selectedBox, setSelectedBox] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleBoxClick = (boxName) => {
    if (selectedBox === boxName) {
      setSelectedBox(null); // Deselect the box if already selected
    } else {
      setSelectedBox(boxName); // Select the box
    }
  };

  const renderContent = () => {
    switch (selectedBox) {
      case "inventoryBox":
        return (
          <div>
          <InventoryBox/>
          </div>
        );
      case "userBox1":
        return (
          <div>
           <UserBox/>
          </div>
        );
      default:
        return (
          <p className="reportContentAppearText">
            Selected Report Card content will appear here...
          </p>
        );
    }
  };

  const filterData = [
    {
      pk: 1,
      type: "Date",
    },
  ];

  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <SideNavigation isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Container className="reportContainer">
          <TitleHeader text={"Reports & Analytics"} />
          <Row className="mb-3">
            <Col className="mb-3" lg={6} xl={8} md={12} sm={12} xs={12}>
              <Search
                Searchstyle={"seachContentBar"}
                searchText={"Search Users..."}
              />
            </Col>
            <Col lg={3} md={3} xl={2} sm={6} xs={6}>
              <Filter
                optionTitle={"Filter by"}
                options={filterData}
                default={"Random"} // Corrected typo here from "Ramdom" to "Random"
              />
            </Col>
            <Col lg={3} md={3} xl={2} sm={6} xs={6}>
              <Filter
                optionTitle={"Sort by"}
                options={filterData}
                default={"Random"} // Corrected typo here from "Ramdom" to "Random"
              />
            </Col>
          </Row>
          <Row>
            <Col md={6} className="p-3 grid-container">
              <Row className="rowContainer">
                <Col
                   style={{cursor:"pointer"}}
                  md={5}
                  lg={5}
                  className={`boxCol inventoryBox ${selectedBox === "inventoryBox" ? "selected" : ""}`}
                  onClick={() => handleBoxClick("inventoryBox")}
                >
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="float-end boxCheckBox"
                  />
                  <div className="text-center m-0 p-0">
                    <Image src={InventoryIcon} className="boxImage" />
                  </div>
                  <div className="desktopBoxTextWarper">
                    <h5 className="fs-6 pt-3 boxtext">
                      Inventory <br /> Management Reports
                    </h5>
                    <p className="fs-6 boxParagraph">
                      Track and analyze inventory levels, material usage, and
                      stock distribution across schools.
                    </p>
                  </div>
                  <div className="mobileBoxTextWarper">
                    <h5 className="fs-6 pt-3 boxtext">Inventory</h5>
                    <p className="boxMobileParagraph">
                      Track and analyze inventory levels, material usage, and
                      stock distribution across schools.
                    </p>
                  </div>
                </Col>
                <Col
                style={{cursor:"pointer"}}
                  md={5}
                  lg={5}
                  className={`boxCol userBox1 ${selectedBox === "userBox1" ? "selected" : ""}`}
                  onClick={() => handleBoxClick("userBox1")}
                >
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="float-end boxCheckBox"
                  />
                  <div className="text-center m-0 p-0">
                    <Image src={UserIcon} className="boxImage" />
                  </div>
                  <div className="desktopBoxTextWarper">
                    <h5 className="fs-6 pt-3 boxtext">
                      User <br /> Activity Reports 1
                    </h5>
                    <p className="fs-6 boxParagraph">
                      Track and analyze user activity, engagement, and interactions
                      across the platform.
                    </p>
                  </div>
                  <div className="mobileBoxTextWarper">
                    <h5 className="fs-6 pt-3 boxtext">User</h5>
                    <p className="boxMobileParagraph">
                      Track and analyze user activity, engagement, and interactions
                      across the platform.
                    </p>
                  </div>
                </Col>
              </Row>

              
              <Row className="rowContainer">
                <Col
                  md={5}
                  lg={5}
                  className={`boxCol expiryBox ${selectedBox === "expiryBox" ? "selected" : ""}`}
                  onClick={() => handleBoxClick("expiryBox")}
                >
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="float-end boxCheckBox"
                  />
                  <div className="text-center m-0 p-0">
                    <Image src={ExpireIcon} className="boxImage" />
                  </div>
                  <div className="desktopBoxTextWarper">
                    <h5 className="fs-6 pt-3 boxtext">Expiry Reports</h5>
                    <p className="fs-6 boxParagraph">
                      Monitor and manage expiration dates for various items or resources
                      within the organization.
                    </p>
                  </div>
                  <div className="mobileBoxTextWarper">
                    <h5 className="fs-6 pt-3 boxtext">Expiry</h5>
                    <p className="boxMobileParagraph">
                      Monitor and manage expiration dates for various items or resources
                      within the organization.
                    </p>
                  </div>
                </Col>
                <Col md={5} lg={5} className="boxCol emptyBox"></Col>
              </Row>
            </Col>
            <Col md={6} className="reportContentAppear">
              {renderContent()}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default ReportAnalytics;
