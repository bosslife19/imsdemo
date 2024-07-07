import React, { useState, useContext, useEffect, useCallback } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import "./Setting.css";
import NavigationHeader from "../../components/Navigations/NavigationHeader";
import TitleHeader from "../../components/Headers/TitleHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLanguage,
  faGlobe,
  faCalendarAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import SettingContext from "../../context/Setting/SettingContext";
import Loading from "../../components/Loading/Loading";
import ConditionalSideNavigation from "../../components/Navigations/ConditionalSideNavigation";

function Setting() {
  const {
    getSetting,
    getSettingIsLoading,
    seteditedFormData,
    editedFormData,
    debouncedUpdateSettings,
  } = useContext(SettingContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOn, setIsOn] = useState(null);

  useEffect(() => {
    getSetting();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    seteditedFormData((prevSettings) => {
      const newSettings = { ...prevSettings, [name]: value };
      debouncedUpdateSettings(newSettings);
      return newSettings;
    });
  };

  const handleToggle = (e) => {
    setIsOn((prevState) => !prevState);
    const { name, checked } = e.target;
    seteditedFormData((prevSettings) => {
      const newSettings = {
        ...prevSettings,
        [name]: checked ? 1 : 0,
      };
      debouncedUpdateSettings(newSettings);
      return newSettings;
    });
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
          <TitleHeader text={"Settings"} />
          {getSettingIsLoading ? (
            <Container className="d-flex justify-content-center align-items-center vh-100">
              <Loading loading={getSettingIsLoading} />
            </Container>
          ) : (
            <div>
              <Row className="mb-3">
                <TitleHeader
                  text={"General Settings"}
                  headerTextStyle={"headerTextStyle"}
                />
                <Row className="mb-3">
                  <Col>
                    <div className={"formBarContainer"}>
                      <FontAwesomeIcon
                        icon={faLanguage}
                        className="sideNavSearchIcon"
                      />
                      <Form.Select
                        className="DiscrepancyInput border-0 p-0"
                        value={editedFormData.language}
                        onChange={handleChange}
                        name="language"
                      >
                        <option value="" hidden>
                          Language
                        </option>
                        <option value="en">English</option>
                      </Form.Select>
                    </div>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <div className={"formBarContainer"}>
                      <FontAwesomeIcon
                        icon={faGlobe}
                        className="sideNavSearchIcon "
                      />
                      <Form.Select
                        className="DiscrepancyInput border-0 p-0"
                        value={editedFormData.timezone}
                        onChange={handleChange}
                        name="timezone"
                      >
                        <option value="" hidden>
                          Time Zone
                        </option>
                        <option value="Africa/Lagos">Africa/Lagos</option>
                      </Form.Select>
                    </div>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col>
                    <div className={"formBarContainer"}>
                      <FontAwesomeIcon
                        icon={faCalendarAlt}
                        className="sideNavSearchIcon"
                      />
                      <Form.Select
                        className="DiscrepancyInput border-0 p-0"
                        value={editedFormData.date_format}
                        onChange={handleChange}
                        name="date_format"
                      >
                        <option value="" hidden>
                          Date Format
                        </option>
                        <option value="Y-m-d h:i:s">YYYY-MM-DD</option>
                      </Form.Select>
                    </div>
                  </Col>
                </Row>
              </Row>
              <Row>
                <TitleHeader
                  text={"Notification Settings"}
                  headerTextStyle={"headerTextStyle"}
                />
                <Row>
                  <Col>
                    <div className={"formBarContainer"}>
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="sideNavSearchIcon"
                      />

                      <div className="settingEmail d-flex justify-content-between align-items-center w-100">
                        <h6 className="settingTexts">Email Notifications</h6>
                        <Form>
                          <Form.Check
                            type="switch"
                            id="custom-switch"
                            name="email_notification"
                            checked={editedFormData.email_notification === 1}
                            onChange={handleToggle}
                            className="sideNavButtonToggle "
                          />
                        </Form>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Row>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
}

export default Setting;
