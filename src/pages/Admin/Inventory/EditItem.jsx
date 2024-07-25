import React, { useContext, useEffect, useState, useRef } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Inventory.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import TitleHeader from "../../../components/Headers/TitleHeader";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import CustomFileInput from "../../../components/CustomFileInput/CustomFileInput";
import { faUpload } from "@fortawesome/free-solid-svg-icons/faUpload";
import InventoryItemContext from "../../../context/Item/InventoryItemContext";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import ComfirmationPop from "../../../components/ComfirmationPopUp/ComfirmationPop";
import { scrollToTop } from "../../../utils/HelperFunc";
import ConditionalSideNavigation from "../../../components/Navigations/ConditionalSideNavigation";
import MessageContext from "../../../context/Message/MessageContext";
import Loading from "../../../components/Loading/Loading";

function EditItem() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  let { pk } = useParams();

  const {
    getInventorySingleItem,
    getSingleItemIsLoading,
    handleEditItem,
    seteditItemError,
    seteditItemResponse,
    seteditedFormData,
    editedFormData,
    editItemIsLoading,
    editItemError,
    editItemResponse,
  } = useContext(InventoryItemContext);

  const { setnavigationMessages } = useContext(MessageContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [comfirmationAction, setComfirmationAction] = useState(false);
  const [message, setmessage] = useState("");
  const [messageColor, setmessageColor] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);


  useEffect(() => {
    getInventorySingleItem(pk);
  }, []);

  useEffect(() => {
    if (!editItemIsLoading && editItemResponse) {
      setnavigationMessages("Edit successful!" )
      navigate(-1);
      seteditItemResponse(null);
    }
  }, [editItemIsLoading, editItemResponse, navigate]);

  useEffect(() => {
    if (!editItemIsLoading && editItemError) {
      scrollToTop();
      handleComfirmationPopUps(editItemError, "bg-danger");
      setButtonLoading(false);
      seteditItemError(null);
    }
  }, [editItemIsLoading, editItemError]);

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
        editItemIsLoading ||
      (!editItemIsLoading && !editItemError && !editItemResponse)
    ) {
      setButtonLoading(true);
    } else {
      setButtonLoading(false);
    }
  };

  const handleEditSubmit = (e) => {
    handleEditItem(e, pk);
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
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <ConditionalSideNavigation
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <Container className="reportContainer">
          <div className="d-flex">
            <BackButtonIcon />
            <TitleHeader text={"Edit Item"} />
          </div>
          {message
            ? comfirmationAction && (
                <ComfirmationPop
                  message={message}
                  ComfirmationContainerStyle={`${messageColor} d-flex mb-2`}
                />
              )
            : null}
            {getSingleItemIsLoading ? (
            <Container className="d-flex justify-content-center align-items-center vh-100">
              <Loading loading={getSingleItemIsLoading} />
            </Container>
          ) : (
          <Form onSubmit={handleEditSubmit}>
            <Row>
              <TitleHeader
                text={"Item Information "}
                headerTextStyle={"headerTextStyle"}
              />
              <Form.Group className="mb-3">
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="Item Name"
                      className="UserCreateInput"
                      name="name"
                      value={editedFormData.name}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      className="UserCreateInput"
                      placeholder="Item Description"
                      name="description"
                      value={editedFormData.description}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      placeholder="Brand"
                      className="UserCreateInput"
                      name="brand"
                      value={editedFormData.brand}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={2} md={2} xl={2} sm={6} xs={6}>
                    <Form.Select
                      className="UserCreateInput"
                      name="category"
                      value={editedFormData.category}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Category</option>
                      <option value="office_supplies">office_supplies</option>
                    </Form.Select>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={2} md={2} xl={2} sm={6} xs={6}>
                    <Form.Select
                      className="UserCreateInput"
                      name="value"
                      value={editedFormData.value}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Value</option>
                      <option value="Mid">Mid</option>
                    </Form.Select>
                  </Col>
                </Row>
                <Row className="mb-5">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="file"
                      id="shoolfileInput"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                      name="image"
                    />
                    <CustomFileInput
                      fieldName={"shoolfileInput"}
                      title={"Upload Item Image"}
                      CustomFileInputicon={faUpload}
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Row>
            <Row>
              <TitleHeader
                text={"Inventory Details"}
                headerTextStyle={"headerTextStyle"}
              />
              <Form.Group className="mb-3" controlId="notificationTitle">
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="number"
                      placeholder="Unit Cost"
                      className="UserCreateInput"
                      name="unit_cost"
                      value={editedFormData.unit_cost}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="number"
                      className="UserCreateInput"
                      placeholder="Quantity on Hand"
                      name="quantity"
                      value={editedFormData.quantity}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="number"
                      className="UserCreateInput"
                      placeholder="Reorder Point"
                      name="reorder_point"
                      value={editedFormData.reorder_point}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                </Row>
                <Row className="mb-5">
                  <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                    <Form.Control
                      type="text"
                      className="UserCreateInput"
                      placeholder="Supplier"
                      name="supplier"
                      value={editedFormData.supplier}
                      onChange={handleChange}
                      required
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Row>
            <Row>
              <TitleHeader
                text={"Addittional Information"}
                headerTextStyle={"headerTextStyle"}
              />
              <Row className="mb-3">
                <Form.Group className="mb-3" controlId="notificationTitle">
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        type="text"
                        placeholder="Serial Number"
                        className="UserCreateInput"
                      />
                    </Col>
                  </Row>
                  <Row className="mb-3">
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        type="text"
                        placeholder="Warrant Information"
                        className="UserCreateInput"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                      <Form.Control
                        as="textarea"
                        rows={6}
                        placeholder="Addittional Information"
                        className="UserCreateTextArea"
                      />
                    </Col>
                  </Row>
                </Form.Group>
                <Button variant="success" className="w-100 p-2" type="submit">
                  {buttonLoading ? (
                    <FontAwesomeIcon icon={faSpinner} spin size="2x" />
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </Row>
            </Row>
          </Form>
           )}
        </Container>
      </div>
    </div>
  );
}

export default EditItem;
