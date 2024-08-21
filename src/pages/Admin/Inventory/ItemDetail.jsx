import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./Inventory.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import TitleHeader from "../../../components/Headers/TitleHeader";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { useParams, useNavigate } from "react-router-dom";
import InventoryItemContext from "../../../context/Item/InventoryItemContext";
import Loading from "../../../components/Loading/Loading";
import NonAvaliable from "../../../components/NonAvaliable/NonAvaliable";
import ConditionalSideNavigation from "../../../components/Navigations/ConditionalSideNavigation";
import { scrollToTop } from "../../../utils/HelperFunc";
import MessageContext from "../../../context/Message/MessageContext";
import ComfirmationPop from "../../../components/ComfirmationPopUp/ComfirmationPop";

function ItemDetail() {
  const navigate = useNavigate();
  let { pk } = useParams();

  const { getInventorySingleItem, getSingleItemData, getSingleItemIsLoading } =
    useContext(InventoryItemContext);

  const { navigationMessages, setnavigationMessages } = useContext(MessageContext);


  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [message, setmessage] = useState("");
  const [messageColor, setmessageColor] = useState("");
  const [comfirmationAction, setComfirmationAction] = useState(false);


  useEffect(() => {
    getInventorySingleItem(pk);
  }, []);

  useEffect(() => {
    if (navigationMessages) {
      scrollToTop();
      handleComfirmationPopUps(navigationMessages, "bg-success");
      setnavigationMessages('')
    }
  }, []);

  const handleComfirmationPopUps = (messageInfo, messageBgColor) => {
    setmessage(messageInfo);
    setmessageColor(messageBgColor);
    setComfirmationAction(true);
    setTimeout(() => {
      setComfirmationAction(false);
    }, 4000);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  const handleEditDetail = () => {
    navigate(`/EditItem/${pk}`);
  };

  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <ConditionalSideNavigation isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Container className="reportContainer">
        {message
            ? comfirmationAction && (
                <ComfirmationPop
                  message={message}
                  ComfirmationContainerStyle={`${messageColor} d-flex mb-2`}
                />
              )
            : null}
          <div className="d-flex">
            <BackButtonIcon />
            <TitleHeader text={"View Item Details"} />
          </div>
          {getSingleItemIsLoading ? (
            <Container className="d-flex justify-content-center align-items-center vh-100">
              <Loading loading={getSingleItemIsLoading} />
            </Container>
          ) : getSingleItemData ? (
            <div>
              <Row className="itemDetailMainRow mb-2">
                <TitleHeader
                  text={"Item Information "}
                  headerTextStyle={"headerTextStyle"}
                />
                <Row className="mb-4  align-items-center">
                  <Col className="itemHeaderText">
                    item Image:
                    <Image
                      src={getSingleItemData.image}
                      rounded
                      width="50"
                      height="50"
                      className="mx-2"
                    />
                  </Col>
                </Row>
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Item Name:{" "}
                    <b className="itemDetailText mx-2">
                      {getSingleItemData.item_name}
                    </b>{" "}
                  </Col>
                </Row>
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Item Category:{" "}
                    <b className="itemDetailText mx-2">
                      {getSingleItemData.subject_category}
                    </b>{" "}
                  </Col>
                </Row>
                {/* <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Brand:{" "}
                    <b className="itemDetailText mx-2">
                      {getSingleItemData.brand}
                    </b>{" "}
                  </Col>
                </Row> */}
                {/* <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Category:{" "}
                    <b className="itemDetailText mx-2">
                      {getSingleItemData.category}
                    </b>{" "}
                  </Col>
                </Row> */}
              </Row>
              <Row className="itemDetailMainRow mb-2">
                <TitleHeader
                  text={"Inventory Details "}
                  headerTextStyle={"headerTextStyle"}
                />
                {/* <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Unit Cost:{" "}
                    <b className="itemDetailText mx-2">
                      {getSingleItemData.unit_cost}
                    </b>{" "}
                  </Col>
                </Row> */}
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Quantity on Hand:{" "}
                    <b className="itemDetailText mx-2">
                      {getSingleItemData.quantity}
                    </b>{" "}
                  </Col>
                </Row>
                {/* <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Reorder Point:{" "}
                    <b className="itemDetailText mx-2">
                      {getSingleItemData.reorder_point}
                    </b>{" "}
                  </Col>
                </Row> */}
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Supplier:{" "}
                    <b className="itemDetailText mx-2">
                      {getSingleItemData.distribution}
                    </b>{" "}
                  </Col>
                </Row>
              </Row>
              <Row className="itemDetailMainRow mb-2">
                <TitleHeader
                  text={"Additional Information "}
                  headerTextStyle={"headerTextStyle"}
                />
                <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Serial Number:{" "}
                    <b className="itemDetailText mx-2">{getSingleItemData.item_code}</b>{" "}
                  </Col>
                </Row>
                {/* <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Warranty Information:{" "}
                    <b className="itemDetailText mx-2">2 months</b>{" "}
                  </Col>
                </Row> */}
                {/* <Row className="mb-4 align-items-center">
                  <Col className="itemHeaderText">
                    Custom Fields: <b className="itemDetailText mx-2">__</b>{" "}
                  </Col>
                </Row> */}
              </Row>
              <Row>
                <Col lg={8} md={8} xl={8} sm={12} xs={12} className="mb-3">
                  <PrimaryButton
                    text={"Edit Item Data"}
                    Primarystyle={"w-100 itemDetailEditButton"}
                    clickEvent={handleEditDetail}
                  />
                </Col>
                {/* <Col lg={4} md={4} xl={4} sm={12} xs={12}>
                  <PrimaryButton
                    text={"print Item Label"}
                    Primarystyle={"w-100 itemDetailPrintButton"}
                    clickEvent={() => null}
                  />
                </Col> */}
              </Row>
            </div>
          ) : (
            <NonAvaliable
              textMessage={"Sorry, Item not available"}
              imageWidth={"300px"}
            />
          )}
        </Container>
      </div>
    </div>
  );
}

export default ItemDetail;


