import React, { useContext, useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./Management.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import SideNavigation from "../../../components/Navigations/SideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import PresentaionCard from "../../../components/Card/PresentaionCard";
import inventoryImage from "../../../assets/schools/schoolchildrens.jpg";
import schoolImage from "../../../assets/schools/shelves.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import InventoryItemContext from "../../../context/Item/InventoryItemContext";
import NonAvaliable from "../../../components/NonAvaliable/NonAvaliable";
import ComfirmationPop from "../../../components/ComfirmationPopUp/ComfirmationPop";
import Loading from "../../../components/Loading/Loading";
import { convertDate, scrollToTop } from "../../../utils/HelperFunc";
import MessageContext from "../../../context/Message/MessageContext";
import AnalysisContext from "../../../context/Analysis/AnalysisContext";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function InventoryManagement({ Searchstyle, searchText }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { getInventoryItems, getItemsData, getItemsIsLoading } = useContext(InventoryItemContext);
  const { ProcessAnalysis, itemDataAnalysis } = useContext(AnalysisContext);
  const { navigationMessages, setnavigationMessages } = useContext(MessageContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [comfirmationAction, setComfirmationAction] = useState(false);
  const [message, setmessage] = useState("");
  const [messageColor, setmessageColor] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filterBy, setFilterBy] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    total: 0,
    per_page: 50,
    current_page: 1,
    last_page: 1,
    next_page_url: null,
    prev_page_url: null,
  });

  useEffect(() => {
    fetchInventoryItems();
  }, [pagination.current_page]);

  const fetchInventoryItems = async () => {
    const response = await getInventoryItems(pagination.current_page);
    setFilteredData(response.items);
    setPagination(response.pagination);
    ProcessAnalysis(response.items, 'items');
  };

  useEffect(() => {
    handleFilterSortSearch();
  }, [filterBy, sortBy, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterSortSearch = () => {
    let filtered = [...filteredData];

    if (filterBy && filterBy !== 'All') {
      filtered = filtered.filter((item) => item.category === filterBy);
    }

    if (sortBy) {
      filtered.sort((a, b) => {
        if (sortBy === "Highest to Lowest") {
          return a.item_name.localeCompare(b.item_name); 
        } else {
          return b.item_name.localeCompare(a.item_name); 
        }
      });
    }

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filtered);
  };

  const handlePagination = (page) => {
    setPagination((prev) => ({ ...prev, current_page: page }));
  };

  const handleComfirmationPopUps = (messageInfo, messageBgColor) => {
    setmessage(messageInfo);
    setmessageColor(messageBgColor);
    setComfirmationAction(true);
    setTimeout(() => {
      setComfirmationAction(false);
    }, 4000);
  };

  const handleCreateItem = () => {
    navigate("/AddNewItem");
  };

  const handleItemDetail = (pk) => {
    navigate(`/ItemDetail/${pk}`);
  };

  return (
    <div>
      <NavigationHeader toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="d-flex justify-content-between">
        <SideNavigation isOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <Container className="reportContainer">
          {message && comfirmationAction && (
            <ComfirmationPop message={message} ComfirmationContainerStyle={`${messageColor} d-flex mb-2`} />
          )}
          <BackButtonIcon />
          <TitleHeader text={"Inventory Management"} />
          <Row className="mb-3">
            <Col lg={6} md={6} xl={6} sm={6} xs={6}>
              <PrimaryButton text={"Generate Inventory Report"} Primarystyle={"InventoryReportButton"} clickEvent={() => navigate("/GenerateInventory")} />
            </Col>
            <Col lg={6} md={6} xl={6} sm={6} xs={6}>
              <PrimaryButton text={"View Inventory Reports"} Primarystyle={"InventoryReportButton"} clickEvent={() => navigate("/ReportAnalytics")} />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={12} md={12} xl={12} sm={12} xs={12}>
              <div className={`sideNavSearchBarContainer ${Searchstyle}`}>
                <FontAwesomeIcon icon={faSearch} className="sideNavSearchIcon" />
                <input
                  type="text"
                  placeholder='Search Inventory'
                  className="sideNavSearchBar"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  style={{ display: 'block', width: '100%', borderRadius: 10 }}
                />
              </div>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={6} md={12} xl={4} sm={12} xs={12} className="mb-2">
              <PresentaionCard
                title={"Total Items"}
                image={schoolImage}
                figure={pagination.total}
              />
            </Col>
          </Row>
          <Container className="ListContainer">
            {!getItemsIsLoading ? (
              filteredData && filteredData.length > 0 ? (
                filteredData.map((Item) => (
                  <Row key={Item.id} className="UserListRow my-2 py-2 align-items-center">
                    <Col xs={9} className="d-flex gap-3">
                      <Image src={Item.image} rounded width="50" height="50" />
                      <div>
                        <h6>{Item.item_name}</h6>
                        <h6 className="fs-6">
                          INV-{Item.id}
                          <span className="text-muted InventoryCategoryText">
                            | {Item.category} | {Item.item_code} | {Item.school} | {Item.quantity}
                            <span className={Item.quantity > 35 ? "text-success" : Item.quantity < 1 ? "text-danger" : "text-warning"}>
                              {Item.quantity > 35 ? "| In stock" : Item.quantity < 1 ? "| Out of stock" : "| Low on stock"}
                            </span> | {Item.supplier} | {Item.status === "pending" ? "text-danger" : "text-success"} | {convertDate(Item.created_at)}
                          </span>
                        </h6>
                      </div>
                    </Col>
                    <Col xs={3} className="d-flex justify-content-end gap-2">
                      <PrimaryButton text={"Edit"} Primarystyle={"UserViewButton d-none d-lg-block"} clickEvent={() => handleItemDetail(Item.id)} />
                      <PrimaryButton text={"View details"} Primarystyle={"schoolViewButton"} clickEvent={() => handleItemDetail(Item.item_code)} />
                    </Col>
                  </Row>
                ))
              ) : (
                <NonAvaliable textMessage={"Sorry, there is currently no available item! 😥"} imageWidth={"300px"} />
              )
            ) : (
              <Container className="d-flex justify-content-center align-items-center h-50">
                <Loading loading={getItemsIsLoading} />
              </Container>
            )}
          </Container>
          <Row className="mt-4">
            <Col className="d-flex justify-content-between">
              {pagination.prev_page_url && (
                <PrimaryButton text={"Previous"} clickEvent={() => handlePagination(pagination.current_page - 1)} />
              )}
              {pagination.next_page_url && (
                <PrimaryButton text={"Next"} clickEvent={() => handlePagination(pagination.current_page + 1)} />
              )}
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default InventoryManagement;
