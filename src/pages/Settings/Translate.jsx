import React, { useState, useContext } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./Setting.css";
import NavigationHeader from "../../components/Navigations/NavigationHeader";
import TitleHeader from "../../components/Headers/TitleHeader";
import translateList from "../../assets/bigIcon/translateList.png";
import ConditionalSideNavigation from "../../components/Navigations/ConditionalSideNavigation";

function Translate() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const countrys = [
    {
      id: 1,
      langeuage: "English",
    },
    {
      id: 2,
      langeuage: "English",
    },
    {
      id: 3,
      langeuage: "English",
    },
    {
      id: 4,
      langeuage: "English",
    },
    {
      id: 5,
      langeuage: "English",
    },
    {
      id: 6,
      langeuage: "English",
    },
    {
      id: 7,
      langeuage: "English",
    },
    {
      id: 8,
      langeuage: "English",
    },
    {
      id: 9,
      langeuage: "English",
    },
  ];

  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
      <ConditionalSideNavigation isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Container className="reportContainer">
          <TitleHeader text={"Translate"} />
          <Row className="mb-5">
            <TitleHeader
              text={"Current language"}
              headerTextStyle={"headerTextStyle"}
            />
            <Row>
              <Col>
                <div className={"formBarContainer"}>
                  <Image src={translateList} className="sideNavSearchIcon" />

                  <div className="settingEmail d-flex justify-content-between align-items-center w-100">
                    <h6 className="settingTexts">English</h6>
                  </div>
                </div>
              </Col>
            </Row>
          </Row>
          <Row>
            <TitleHeader
              text={"Choose a language"}
              headerTextStyle={"headerTextStyle"}
            />
            <Container className="ListContainer">
              {countrys.map((country) => (
                <Row key={country.id} className="mb-2 ">
                  <Col>
                    <div className={"formBarContainer"}>
                      <Image
                        src={translateList}
                        className="sideNavSearchIcon"
                      />

                      <div className="settingEmail d-flex justify-content-between align-items-center w-100">
                        <h6 className="settingTexts">{country.langeuage}</h6>
                      </div>
                    </div>
                  </Col>
                </Row>
              ))}
            </Container>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Translate;
