import React, { useState, useEffect, useRef, useContext } from "react";
import { Container, Row, Col, Image, Form, Button } from "react-bootstrap";
import "./Setting.css";
import NavigationHeader from "../../components/Navigations/NavigationHeader";
import TitleHeader from "../../components/Headers/TitleHeader";
import CustomFileInput from "../../components/CustomFileInput/CustomFileInput";
import { faUpload } from "@fortawesome/free-solid-svg-icons/faUpload";
import AuthenticationContext from "../../context/Authentication/AuthenticationContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ComfirmationPop from "../../components/ComfirmationPopUp/ComfirmationPop";
import Loading from "../../components/Loading/Loading";
import { scrollToTop } from "../../utils/HelperFunc";
import ProfileContext from "../../context/Profile/ProfileContext";
import ConditionalSideNavigation from "../../components/Navigations/ConditionalSideNavigation";
import BackButtonIcon from "../../components/Button/BackButtonIcon";

function Profile() {
  const fileInputRef = useRef(null);

  const { userData, setUserData } = useContext(AuthenticationContext);

  const {
    handleEditUser,
    seteditedFormData,
    editedFormData,
    editUserIsLoading,
    editUserError,
    editUserResponse,
    editUserData,
    seteditUserError,
    seteditUserResponse,
    getSingleUser,
    getSingleUserIsLoading,
    getSingleUserData,
  } = useContext(ProfileContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [comfirmationAction, setComfirmationAction] = useState(false);
  const [message, setmessage] = useState("");
  const [messageColor, setmessageColor] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    getSingleUser();
  }, [userData]);

  useEffect(() => {
    if (!editUserIsLoading && editUserResponse) {
      scrollToTop();
      handleComfirmationPopUps("Profile Updated", "bg-success");
      setUserData(editUserData); // Update userData with edited user data
      sessionStorage.setItem("edoUserData", JSON.stringify(editUserData));
      setButtonLoading(false);
      seteditUserResponse(null);
      getSingleUser();
    }
  }, [editUserIsLoading, editUserResponse, editUserData, setUserData]);

  useEffect(() => {
    if (!editUserIsLoading && editUserError) {
      scrollToTop();
      handleComfirmationPopUps(editUserError, "bg-danger");
      setButtonLoading(false);
      seteditUserError(null);
    }
  }, [editUserIsLoading, editUserError]);

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
      editUserIsLoading ||
      (!editUserIsLoading && !editUserError && !editUserResponse)
    ) {
      setButtonLoading(true);
    } else {
      setButtonLoading(false);
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    handleEditUser(e);
    handleLoadingClick();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    seteditedFormData({
      ...editedFormData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const fileName = file ? file.name : "Choose a file";

    seteditedFormData({
      ...editedFormData,
      image: file.name,
    });

    document.getElementById("fileLabel").innerText = fileName;
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} userData={userData} />
      <div className="d-flex justify-content-between">
        <ConditionalSideNavigation
          isSidebarOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <Container className="reportContainer">
        <BackButtonIcon/>
          <TitleHeader text={"Profile"} />
          {message ? (
            comfirmationAction && (
              <ComfirmationPop
                message={message}
                ComfirmationContainerStyle={`${messageColor} d-flex mb-2`}
              />
            )
          ) : null}
          {getSingleUserIsLoading ? (
            <Container className="d-flex justify-content-center align-items-center vh-100">
              <Loading loading={getSingleUserIsLoading} />
            </Container>
          ) : (
            <Row>
              <Form onSubmit={handleEditSubmit}>
                <Row className="align-items-end mb-5">
                  <Col
                    sm={12}
                    xm={12}
                    xl={4}
                    md={12}
                    lg={12}
                    className="mb-2 d-flex align-items-center justify-content-center"
                  >
                    <Image
                      src={getSingleUserData.image}
                      width={300}
                      height={300}
                      className="justify-content-center rounded rounded-4 border border-3 border-success"
                    />
                  </Col>
                  <Col className="" sm={12} xm={12} xl={3} md={12} lg={12}>
                    <Form.Control
                      type="file"
                      id="profilefileInput"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                      name="image"
                    />
                    <CustomFileInput
                      fieldName={"profilefileInput"}
                      title={"Upload a New Profile Picture"}
                      CustomFileInputicon={faUpload}
                    />
                  </Col>
                </Row>
                <Form.Group className="mb-3" controlId="notificationTitle">
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        type="text"
                        placeholder="Uche Darlington"
                        className="DiscrepancyInput"
                        value={editedFormData.name}
                        onChange={handleChange}
                        name="name"
                        required
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        type="text"
                        placeholder="OracleID"
                        className="DiscrepancyInput"
                        name="oracle_id"
                        value={getSingleUserData.oracle_id}
                        readOnly
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        type="email"
                        placeholder="uchedarlington@xyz.abc"
                        className="DiscrepancyInput"
                        name="email"
                        value={getSingleUserData.email}
                        readOnly
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        type="text"
                        placeholder="+1234567890"
                        className="DiscrepancyInput"
                        name="phone_number"
                        value={editedFormData.phone_number}
                        onChange={handleChange}
                        required
                      />
                    </Col>
                  </Row>
                </Form.Group>
                <Row>
                  <Col>
                    {" "}
                    <Button
                      variant="success"
                      className="w-100 p-2"
                      type="submit"
                    >
                      {buttonLoading ? (
                        <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </Col>
                  <Col>
                    {" "}
                    <Button
                      variant="outline-success"
                      className="w-100 p-2"
                      type="reset"
                      onClick={getSingleUser}
                    >
                      {" "}
                      Reset
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Row>
          )}
        </Container>
      </div>
    </div>
  );
}

export default Profile;
