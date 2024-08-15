import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import TitleHeader from "../../../components/Headers/TitleHeader";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { useNavigate } from "react-router-dom";
import InventoryItemContext from "../../../context/Item/InventoryItemContext";
import Loading from "../../../components/Loading/Loading";
import NonAvaliable from "../../../components/NonAvaliable/NonAvaliable";
import ConditionalSideNavigation from "../../../components/Navigations/ConditionalSideNavigation";
import { scrollToTop } from "../../../utils/HelperFunc";
import MessageContext from "../../../context/Message/MessageContext";
import ComfirmationPop from "../../../components/ComfirmationPopUp/ComfirmationPop";

function ItemDetail() {
  const navigate = useNavigate();
  const { getInventoryItems } = useContext(InventoryItemContext);
  const { navigationMessages, setnavigationMessages } = useContext(MessageContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [message, setmessage] = useState("");
  const [messageColor, setmessageColor] = useState("");
  const [comfirmationAction, setComfirmationAction] = useState(false);
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await getInventoryItems(page);
      setItems(response.items);
      setPagination(response.pagination);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch items", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (navigationMessages) {
      scrollToTop();
      handleComfirmationPopUps(navigationMessages, "bg-success");
      setnavigationMessages("");
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

  const handlePageChange = (url) => {
    if (url) {
      const page = new URL(url).searchParams.get("page");
      fetchItems(page);
    }
  };

  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <ConditionalSideNavigation isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Container className="reportContainer">
          {message && comfirmationAction && (
            <ComfirmationPop
              message={message}
              ComfirmationContainerStyle={`${messageColor} d-flex mb-2`}
            />
          )}
          <div className="d-flex">
            <BackButtonIcon />
            <TitleHeader text={"Item List"} />
          </div>
          {isLoading ? (
            <Container className="d-flex justify-content-center align-items-center vh-100">
              <Loading loading={isLoading} />
            </Container>
          ) : items.length ? (
            <>
              <Row className="itemDetailMainRow mb-2">
                {items.map((item) => (
                  <Col key={item.id} className="itemHeaderText">
                    <Image
                      src={item.image}
                      rounded
                      width="50"
                      height="50"
                      className="mx-2"
                    />
                    <b className="itemDetailText mx-2">{item.item_name}</b>
                  </Col>
                ))}
              </Row>
              <Row>
                <Col>
                  <Button
                    onClick={() => handlePageChange(pagination.prev_page_url)}
                    disabled={!pagination.prev_page_url}
                  >
                    Previous
                  </Button>
                </Col>
                <Col className="text-center">
                  Page {pagination.current_page} of {pagination.last_page}
                </Col>
                <Col className="text-end">
                  <Button
                    onClick={() => handlePageChange(pagination.next_page_url)}
                    disabled={!pagination.next_page_url}
                  >
                    Next
                  </Button>
                </Col>
              </Row>
            </>
          ) : (
            <NonAvaliable
              textMessage={"Sorry, no items available"}
              imageWidth={"300px"}
            />
          )}
        </Container>
      </div>
    </div>
  );
}

export default ItemDetail;



