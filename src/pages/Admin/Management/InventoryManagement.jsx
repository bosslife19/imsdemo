import React, { useContext, useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./Management.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import SideNavigation from "../../../components/Navigations/SideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import Filter from "../../../components/Filter/Filter";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import PresentaionCard from "../../../components/Card/PresentaionCard";
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

function InventoryManagement({ Searchstyle }) {
    const navigate = useNavigate();
    const location = useLocation();
    const { getInventoryItems, getItemsData, getItemsIsLoading } = useContext(InventoryItemContext);
    const { ProcessAnalysis, itemDataAnalysis } = useContext(AnalysisContext);
    const { navigationMessages, setnavigationMessages } = useContext(MessageContext);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [comfirmationAction, setComfirmationAction] = useState(false);
    const [message, setMessage] = useState("");
    const [messageColor, setMessageColor] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [filterBy, setFilterBy] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [pagination, setPagination] = useState({
        total: 0,
        per_page: 0,
        current_page: 0,
        last_page: 0,
        next_page_url: "",
        prev_page_url: "",
    });

    useEffect(() => {
        fetchItems();
    }, []);

    useEffect(() => {
        ProcessAnalysis(getItemsData, 'items');
    }, [getItemsIsLoading]);

    useEffect(() => {
        handleFilterSortSearch();
    }, [filterBy, sortBy, searchTerm, getItemsData]);

    useEffect(() => {
        if (location.state?.message || navigationMessages) {
            scrollToTop();
            const redirectMessage = location.state?.message;
            handleComfirmationPopUps(redirectMessage || navigationMessages, "bg-success");
            navigate(location.pathname, { replace: true, state: {} });
            setnavigationMessages('')
        }
    }, []);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const filterOption = useMemo(() => [
        { pk: 1, type: "English" },
        { pk: 2, type: "Mathematics" },
        { pk: 3, type: 'Science' },
        { pk: 4, type: 'Home Work' },
        { pk: 5, type: 'Stationery' }
    ], []);

    const sortOption = useMemo(() => [
        { pk: 1, type: "Highest to Lowest" },
        { pk: 2, type: "Lowest to Highest" },
    ], []);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleFilterSortSearch = () => {
        let filtered = [...getItemsData];

        if (filterBy && filterBy !== 'All') {
            filtered = filtered.filter((item) => item.subject_category === filterBy);
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

    const handleComfirmationPopUps = (messageInfo, messageBgColor) => {
        setMessage(messageInfo);
        setMessageColor(messageBgColor);
        setComfirmationAction(true);
        setTimeout(() => {
            setComfirmationAction(false);
        }, 4000);
    };

    const handleCreateItem = () => {
        navigate("/AddNewItem");
    };

    const handleGenerateReport = () => {
        navigate("/GenerateInventory");
    };

    const handleViewReport = () => {
        navigate("/ReportAnalytics");
    };

    const handleItemDetail = (pk) => {
        navigate(`/ItemDetail/${pk}`);
    };

    const handleEditDetail = (pk) => {
        navigate(`/EditItem/${pk}`);
    };

    const fetchItems = async (url = "http://your-api-url.com/api/items") => {
        try {
            setLoading(true);
            const response = await axios.get(url);
            setItems(response.data.items);
            setPagination(response.data.pagination);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch items", error);
            setLoading(false);
        }
    };

    const handlePageChange = (url) => {
        if (url) {
            fetchItems(url);
        }
    };

    return (
        <div>
            <NavigationHeader toggleSidebar={toggleSidebar} />
            <div className="d-flex justify-content-between">
                <SideNavigation isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                <Container className="reportContainer">
                    {message && comfirmationAction && (
                        <ComfirmationPop
                            message={message}
                            ComfirmationContainerStyle={`${messageColor} d-flex mb-2`}
                        />
                    )}
                    <BackButtonIcon />
                    <TitleHeader text={"Inventory Management"} />
                    <Row className="mb-3">
                        <Col lg={6} md={6} xl={6} sm={6} xs={6}>
                            <PrimaryButton
                                text={"Generate Inventory Report"}
                                Primarystyle={"InventoryReportButton"}
                                clickEvent={handleGenerateReport}
                            />
                        </Col>
                        <Col lg={6} md={6} xl={6} sm={6} xs={6}>
                            <PrimaryButton
                                text={"View Inventory Reports"}
                                Primarystyle={"InventoryReportButton"}
                                clickEvent={handleViewReport}
                            />
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col lg={12} md={12} xl={12} sm={12} xs={12}>
                            <div className={`sideNavSearchBarContainer ${Searchstyle}`}>
                                <FontAwesomeIcon
                                    icon={faSearch}
                                    className="sideNavSearchIcon"
                                />
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
                                figure={filteredData.length}
                                margin={`${itemDataAnalysis.trend === 'up' ? '↑' : itemDataAnalysis.trend === 'down' ? '↓' : '~'} ${itemDataAnalysis.value}`}
                                marginColor={itemDataAnalysis.trend === 'up' ? 'text-success' : itemDataAnalysis.trend === 'down' ? 'text-danger' : 'text-primary'}
                            />
                        </Col>
                        <Col lg={6} md={12} xl={4} sm={12} xs={12}>
                            <PresentaionCard
                                title={"Low Stock Alerts"}
                                image={schoolImage}
                                figure={"46"}
                                margin={"↓"}
                                marginColor={"red"}
                            />
                        </Col>
                    </Row>
                    <Row className="d-lg-none mobileCreateButton my-3">
                        <Col className="d-flex justify-content-end">
                            <PrimaryButton
                                Primaryicon={faAdd}
                                text={"Create New Item"}
                                Primarystyle={"UserManagementCreateButton"}
                                clickEvent={handleCreateItem}
                            />
                        </Col>
                    </Row>
                    <Row className="d-lg-none ">
                        <Col className="d-flex justify-content-between ms-auto gap-3">
                            <Filter
                                Filterstyle={"responsive"}
                                optionTitle={"Filter by"}
                                options={filterOption}
                                onSelect={setFilterBy}
                            />
                            <Filter
                                Filterstyle={"responsive"}
                                optionTitle={"Sort by"}
                                options={sortOption}
                                onSelect={setSortBy}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-lg-flex justify-content-between">
                            <Filter
                                Filterstyle={"desktop"}
                                optionTitle={"Filter by"}
                                options={filterOption}
                                onSelect={setFilterBy}
                            />
                            <Filter
                                Filterstyle={"desktop"}
                                optionTitle={"Sort by"}
                                options={sortOption}
                                onSelect={setSortBy}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {getItemsIsLoading ? (
                                <Container className="d-flex justify-content-center align-items-center h-50">
                                    <Loading loading={getItemsIsLoading} />
                                </Container>
                            ) : (
                                filteredData.length > 0 ? (
                                    filteredData.map((Item) => (
                                        <PresentaionCard
                                            key={Item.item_id}
                                            title={Item.item_name}
                                            image={schoolImage}
                                            figure={Item.item_code}
                                            onClick={() => handleItemDetail(Item.item_id)}
                                            editClick={() => handleEditDetail(Item.item_id)}
                                        />
                                    ))
                                ) : (
                                    <NonAvaliable
                                        textMessage={"Sorry, there is currently no available item! 😥"}
                                        imageWidth={"300px"}
                                    />
                                )
                            )}
                            <Row className="d-flex justify-content-between">
                                <Col>
                                    {pagination.prev_page_url && (
                                        <PrimaryButton
                                            text={"Previous"}
                                            clickEvent={() => handlePageChange(pagination.prev_page_url)}
                                        />
                                    )}
                                    <span>Page {pagination.current_page} of {pagination.last_page}</span>
                                    {pagination.next_page_url && (
                                        <PrimaryButton
                                            text={"Next"}
                                            clickEvent={() => handlePageChange(pagination.next_page_url)}
                                        />
                                    )}
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default InventoryManagement;
