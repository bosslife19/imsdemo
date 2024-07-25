import React, { useState, useContext, useEffect } from "react";
import { Container, Form, Row, Col } from "react-bootstrap";
import "./Setting.css";
import NavigationHeader from "../../components/Navigations/NavigationHeader";
import TitleHeader from "../../components/Headers/TitleHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLanguage,
  faCalendarAlt,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import SettingContext from "../../context/Setting/SettingContext";
import Loading from "../../components/Loading/Loading";
import ConditionalSideNavigation from "../../components/Navigations/ConditionalSideNavigation";

// Custom option component to render flag emoji
const FlagOption = ({ value, label }) => (
  <option value={value}>
    {label} {value === "en" && "🇺🇸"} {/* Render flag emoji only for English */}
  </option>
);

function Setting() {
  const {
    getSetting,
    getSettingIsLoading,
    seteditedFormData,
    editedFormData,
    debouncedUpdateSettings,
  } = useContext(SettingContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const [editedFormDatas, setEditedFormDatas] = useState({
    date_format: '',
  });

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setEditedFormDatas({
      ...editedFormDatas,
      [name]: value,
    });
  };

  useEffect(() => {
    // Function to get current date and time in YYYY-MM-DD format
    const getCurrentDate = () => {
      const now = new Date();
      const year = now.getFullYear();
      let month = now.getMonth() + 1;
      let day = now.getDate();

      // Ensure month and day are two digits
      if (month < 10) month = '0' + month;
      if (day < 10) day = '0' + day;

      return `${year}-${month}-${day}`;
    };

    // Set current date initially and update every second
    const intervalId = setInterval(() => {
      const currentDate = getCurrentDate();
      setEditedFormDatas({
        ...editedFormDatas,
        date_format: currentDate,
      });
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

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
                        style={{ outline: 'none', border: 'none', boxShadow: 'none' }}
                        onChange={handleChange}
                        name="language"
                      >
                        <option value="" hidden>
                          Select Language
                        </option>
                        <FlagOption value="en" label="English" />
                      </Form.Select>
                    </div>
                  </Col>
                </Row>
                {/* Other settings options */}
                <Row className="mb-3">
                  <Col>
                    <div className={"formBarContainer"}>
                      <FontAwesomeIcon
                        icon={faCalendarAlt}
                        className="sideNavSearchIcon"
                      />
                      <Form.Select
                        className="DiscrepancyInput border-0 p-0"
                        onChange={handleChanges}
                        style={{ outline: 'none', border: 'none', boxShadow: 'none' }}
                        name="date_format"
                      >
                        <option value="" hidden>
                          Select Date Format
                        </option>
                        <option value={editedFormDatas.date_format}>
        <FontAwesomeIcon icon={faCalendarAlt} style={{ marginRight: '5px' }} /> {editedFormDatas.date_format}
      </option>
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
                            className="sideNavButtonToggle"
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
