import React, { useMemo, useState } from "react";
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
import BackButtonIcon from "../../../components/Button/BackButtonIcon";

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
          <BackButtonIcon/>
          <TitleHeader text={"Reports & Analytics"} />
          <Row className="mb-3">
            <Col className="mb-3" lg={6} xl={7} md={7} sm={10} xs={12}>
              <Search
                Searchstyle={"seachContentBar"}
                searchText={"Search Users..."}
              />
            </Col>
            {/* <Col lg={3} md={3} xl={2} sm={6} xs={6}>
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
            </Col> */}
            {/* <Row className="mb-3 mt-3"> */}
           {/* <div className="d-flex"> */}
           {/* <Col lg={3} md={3} xl={2} sm={6} xs={6} style={{marginRight:"22px"}}> */}
              {/* <div className="d-flex justify-content-between"> */}
                 {/* <Filter
                  optionTitle={"School Type"}
                  options={filterOptionForType}
                  defult={"All"}
                />
                 </Col>
                  <Col lg={3} md={3} xl={2} sm={6} xs={6}>
                 <Filter
                  optionTitle={"LGA"}
                  options={filterOptionforLGA}
                  defult={"All"}
                />
                </Col> */}
           {/* </div> */}
              {/* </div> */}
              {/* <div className=" d-lg-none d-flex justify-content-end ">
                <Filter
                  optionTitle={"School Type"}
                  options={filterOptionForType}
                  defult={"All"}
                />
                 <Filter
                  optionTitle={"LGA"}
                  options={filterOptionforLGA}
                  defult={"All"}
                />
              </div> */}
           
          {/* </Row> */}
          </Row>
          <Row>
            <Col md={6} className="p-3 grid-container mb-5">
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
                    <h5 className="fs-6 pt-3 boxtext">Material Usage</h5>
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
            <Col md={6} className="reportContentAppear mt-5">
              {renderContent()}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default ReportAnalytics;