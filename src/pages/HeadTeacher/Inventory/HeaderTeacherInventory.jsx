import React, { useContext, useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./HeaderTeacherInventory.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import TitleHeader from "../../../components/Headers/TitleHeader";
import Search from "../../../components/Search/Search";
import Filter from "../../../components/Filter/Filter";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import PresentaionCard from "../../../components/Card/PresentaionCard";
 import schoolImage from "../../../assets/schools/shelves.jpg";
import { useNavigate } from "react-router-dom";
import HeadTeacherNavigation from "../Navigation/HeadTeacherNavigation";
import InventoryItemContext from "../../../context/Item/InventoryItemContext";
import NonAvaliable from "../../../components/NonAvaliable/NonAvaliable";
import Loading from "../../../components/Loading/Loading";
import { convertDate } from "../../../utils/HelperFunc";
import AnalysisContext from "../../../context/Analysis/AnalysisContext";
import BackButtonIcon from "../../../components/Button/BackButtonIcon";

function HeaderTeacherInventory() {
  const navigate = useNavigate();

  const { getInventoryItems, getItemsData, getItemsIsLoading } =
    useContext(InventoryItemContext);

    const { ProcessAnalysis, itemDataAnalysis } =
    useContext(AnalysisContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filteredData, setFilteredData] = useState();
  const [filterBy, setFilterBy] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getInventoryItems();
    setFilteredData(getItemsData);
  }, []);

  const {value, trend} = itemDataAnalysis

  useEffect(() => {
    ProcessAnalysis(getItemsData, 'items');
  }, [getItemsIsLoading]); 

  useEffect(() => {
    handleFilterSortSearch();
  }, [filterBy, sortBy, searchTerm, getItemsData]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const filterOption = useMemo(
    () => [
      {
        pk: 1,
        type: "All",
      },
      {
        pk: 2,
        type: "office_supplies",
      },
    ],
    []
  );

  const sortOption = useMemo(
    () => [
      {
        pk: 1,
        type: "ascending",
      },
      {
        pk: 2,
        type: "descending",
      },
    ],
    []
  );

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterSortSearch = () => {
    let filtered = [...getItemsData];

    if (filterBy && filterBy !== "All") {
      filtered = filtered.filter((item) => item.category === filterBy);
    }

    if (sortBy) {
      filtered.sort((a, b) => {
        if (sortBy === "ascending") {
          return a.name.localeCompare(b.name);
        } else {
          return b.name.localeCompare(a.name);
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

  const handleGenerateReport = () => { 
    navigate("/HeadTeacherGenerateInventory");
  };
  const PeriodicReport = () => {
    navigate("/PeriodicReport");
  };
  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <HeadTeacherNavigation
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <Container className="reportContainer">
          <BackButtonIcon/>
          <TitleHeader text={"Inventory Management"} />
          <Row className="mb-3">
            <Col lg={12} md={12} xl={12} sm={12} xs={12}>
            <input
                type="text"
                placeholder='Search Inventory'
                className="seachContentBar"
                value={searchTerm}
                onChange={handleSearchChange}
                style={{display:'block', width:'100%', borderRadius:10}}
               
               
            />
             
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={6} md={12} xl={4} sm={12} xs={12} className="mb-2">
              <PresentaionCard
                title={"Total Items"}
                image={schoolImage}
                figure={getItemsData ? getItemsData.length : 0}
                margin={`${trend === 'up' ? '↑' : trend === 'down' ? '↓' : '~'} ${value}`}
                marginColor={trend === 'up' ? 'text-success': trend === 'down' ? 'text-danger' : 'text-primary'}
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
          <Row>
            <Col className="d-lg-none ">
              <PrimaryButton
                text={"Generate Inventory Report"}
                Primarystyle={"WareHouseGenerateInventoryButton w-100"}
                clickEvent={() => handleGenerateReport()}
              />
            </Col>
            {/* <Col className="d-lg-none ">
              <PrimaryButton
                text={"Periodic Report"}
                Primarystyle={"InventoryReportButton w-100"}
                clickEvent={() => PeriodicReport()}
              />
            </Col> */}
          </Row>
          <Row className="d-lg-none ">
            <Col className="d-flex justify-content-between ms-auto gap-3">
              <Filter
                Filterstyle={"responsive"}
                optionTitle={"Filter by"}
                options={filterOption}
                defult={"Ramdom"}
                onSelect={(value) => setSortBy(value)}
              />
              <Filter
                Filterstyle={"responsive"}
                optionTitle={"Sort by"}
                options={sortOption}
                defult={"Ramdom"}
                onSelect={(value) => setSortBy(value)}
              />
            </Col>
          </Row>
          <Row className="d-none d-lg-flex d-flex justify-content-between">
            <Col xl={2} className="d-flex justify-content-between  gap-3">
              <Filter
                optionTitle={"Filter by"}
                options={filterOption}
                defult={"Ramdom"}
                onSelect={(value) => setFilterBy(value)}
              />
              <Filter
                optionTitle={"Sort by"}
                options={sortOption}
                defult={"Ramdom"}
                onSelect={(value) => setSortBy(value)}
              />
            </Col>
            <Col xl={3}>
              <PrimaryButton
                text={"Generate Inventory Report"}
                Primarystyle={"WareHouseGenerateInventoryButton w-100"}
                clickEvent={() => handleGenerateReport()}
              />
            </Col>
            {/* <Col xl={2}>
              <PrimaryButton
                text={"Periodic Report"}
                Primarystyle={"InventoryReportButton w-100"}
                clickEvent={() => PeriodicReport()}
              />
            </Col> */}
          </Row>
          <Container className="ListContainer">
            {!getItemsIsLoading ? (
              filteredData && filteredData.length > 0 ? (
                filteredData.map((Item, index) => (
                  <Row
                    key={index}
                    className="UserListRow my-2 py-2 align-items-center"
                  >
                    <Col
                      xs={12}
                      md={12}
                      sm={12}
                      lg={12}
                      xl={12}
                      className="d-flex gap-3"
                    >
                      <Image
                        src={Item.image}
                        rounded
                        width="50"
                        height="50"
                      />
                      <div>
                        <h6>{Item.name}</h6>
                        <h6 className="fs-6">
                        INV-{index + 1}
                          <span className="text-muted ">
                            | {Item.item_name} | {''}
                            <span className="d-none d-lg-inline me">
                              {Item.item_code} | {`${Item.school}`} | {Item.quantity} {''}
                              <span
                                className={
                                  Item.quantity > 35
                                    ? "text-success"
                                    : Item.quantity < 1
                                    ? "text-danger"
                                    : "text-warning"
                                }
                              >
                                {Item.quantity > 35
                                  ? "| In stock"
                                  : Item.quantity < 1
                                  ? "| Out of stock"
                                  : "| Low on stock"}
                              </span> | {''}
                               {Item.supplier} | {''}
                              <span
                                className={
                                  Item.status === "pending"
                                    ? "text-danger"
                                    : "text-success"
                                }
                              >
                                {Item.status} 
                              </span> | {''}
                              {convertDate(Date.now())}
                            </span>
                          </span>
                        </h6>
                      </div>
                    </Col>
                  </Row>
                ))
              ) : (
                <NonAvaliable
                  textMessage={
                    "Sorry, there is currently no available item! 😥"
                  }
                  imageWidth={"300px"}
                />
              )
            ) : (
              <Container className="d-flex justify-content-center align-items-center h-50">
                <Loading loading={getItemsIsLoading} />
              </Container>
            )}
          </Container>
        </Container>
      </div>
    </div>
  );
}

export default HeaderTeacherInventory;
