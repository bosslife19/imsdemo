import React, { useState, useEffect } from "react";
import { Container, Row, Col, Image, Card, Button } from "react-bootstrap";
import "./QualityDashboard.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import QualityNavigation from "../../../pages/QualityAssurance/QualityNavigation/QualityNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import Filter from "../../../components/Filter/Filter";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { NoImagCard } from "../../../components/Card/PresentaionCard";
import ComfirmationPop from "../../../components/ComfirmationPopUp/ComfirmationPop";
import { useLocation, useNavigate } from "react-router-dom";
import inventoryListImage from "../../../assets/bigIcon/inventoryList.png";
import NotificationBtn from "../../../components/Button/NotificationBtn";
import { faClockRotateLeft, faHome,faTableList } from '@fortawesome/free-solid-svg-icons';
import ApprovalListPage from "../ApproveList/Listtoapprove";
import ApprovedItem from "../ApproveList/ApprovedList";
 
function QualityDashboard() {
    const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showList, setShowList] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleList = () => {
    setShowList(!showList); // Toggle the state when NotificationBtn is clicked
  };
  const filterData = [
    {
      pk: 1,
      type: "Date",
    },
  ];
  const users1 = [
    {
      id: 1,
      itemType: "Pen",
      suppy: "Office Supplies",
      itemName: "Blue ballpoint pen",
      Admin: "Admin Name",
      action: 'Add New Item',
      joinDate: "2024-05-18",
    },
    {
        id: 2,
        itemType: "Pen",
        suppy: "Office Supplies",
        itemName: "Blue ballpoint pen",
        Admin: "Admin Name",
        action: 'Add New Item',
        joinDate: "2024-05-18",
      },
      {
        id: 3,
        itemType: "Pen",
        suppy: "Office Supplies",
        itemName: "Blue ballpoint pen",
        Admin: "Admin Name",
        action: 'Add New Item',
        joinDate: "2024-05-18",
      },
      {
        id: 4,
        itemType: "Pen",
        suppy: "Office Supplies",
        itemName: "Blue ballpoint pen",
        Admin: "Admin Name",
        action: 'Add New Item',
        joinDate: "2024-05-18",
      },
      {
        id: 5,
        itemType: "Pen",
        suppy: "Office Supplies",
        itemName: "Blue ballpoint pen",
        Admin: "Admin Name",
        action: 'Add New Item',
        joinDate: "2024-05-18",
      },
      {
        id: 6,
        itemType: "Pen",
        suppy: "Office Supplies",
        itemName: "Blue ballpoint pen",
        Admin: "Admin Name",
        action: 'Add New Item',
        joinDate: "2024-05-18",
      },
  ]

  const activities = [
    {
      id: 1,
      name: "JOHN DIGGLE",
      action: "Viewed stock items",
      description: "Books sent to ABC Academy",
      date: "10th Feb, 2022",
      time: "3:56pm",
    },
    {
      id: 2,
      name: "JOHN DIGGLE",
      action: "Viewed stock items",
      description: "Books sent to ABC Academy",
      date: "10th Feb, 2022",
      time: "3:56pm",
    },
    {
      id: 3,
      name: "JOHN DIGGLE",
      action: "Viewed stock items",
      description: "Books sent to ABC Academy",
      date: "10th Feb, 2022",
      time: "3:56pm",
    },
    {
      id: 4,
      name: "JOHN DIGGLE",
      action: "Viewed stock items",
      description: "Books sent to ABC Academy",
      date: "10th Feb, 2022",
      time: "3:56pm",
    },
    {
      id: 5,
      name: "JOHN DIGGLE",
      action: "Viewed stock items",
      description: "Books sent to ABC Academy",
      date: "10th Feb, 2022",
      time: "3:56pm",
    },
  ];
  const handleApprovalDetail = () => {
    navigate("/ApprovalDetail");
  };
  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <QualityNavigation
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <Container className="reportContainer">
          <div className="d-flex justify-content-between">
            <TitleHeader text={"Dashboard"} />
            <Filter
              optionTitle={"Time"}
              options={filterData}
              defult={"This week"}
            />
          </div>
          <Row className="mb-3 mt-3 ">
            <TitleHeader
              text={"System Performance"}
              headerTextStyle={"headerTextStyle"}
            />
            <div className="d-flex quailtyDashboardDisplayCardWrapper gap-3">
              <div className="quailtyDashboardDisplayCard rounded rounded-4 d-flex justify-content-center align-items-center ">
                <h6 className="p-2 text-center quailtyDashboardDisplayCardText">
                  System Uptime:
                </h6>{" "}
                <span className="text-muted quailtyDashboardDisplayCardText mx-4">
                  4,678 Hrs 47 Mins
                </span>
              </div>
              <div className="quailtyDashboardDisplayCard rounded rounded-4 d-flex justify-content-center align-items-center ">
                <h6 className="p-2 text-center quailtyDashboardDisplayCardText">
                  API Response Time:
                </h6>{" "}
                <span className="text-muted quailtyDashboardDisplayCardText mx-4">
                  0.6 seconds
                </span>
              </div>
              <div className="quailtyDashboardDisplayCard rounded rounded-4 d-flex justify-content-center align-items-center ">
                <h6 className="p-2 text-center quailtyDashboardDisplayCardText">
                  API Request Success Rate:
                </h6>{" "}
                <span className="text-muted quailtyDashboardDisplayCardText mx-4">
                  98%
                </span>
              </div>
              <div className="quailtyDashboardDisplayCard rounded rounded-4 d-flex justify-content-center align-items-center ">
                <h6 className="p-2 text-center quailtyDashboardDisplayCardText">
                  API Request Error Rate:
                </h6>{" "}
                <span className="text-muted quailtyDashboardDisplayCardText mx-4">
                  2%
                </span>
              </div>
              <div className="quailtyDashboardDisplayCard rounded rounded-4 d-flex justify-content-center align-items-center ">
                <h6 className="p-2 text-center quailtyDashboardDisplayCardText">
                  Warehouse Throughput:
                </h6>{" "}
                <span className="text-muted quailtyDashboardDisplayCardText mx-4">
                  469
                </span>
              </div>
            </div>
          </Row>
          <Row className="mb-5 mt-5">
            <TitleHeader
              text={"Your Schools"}
              headerTextStyle={"headerTextStyle"}
            />
            <div className="d-flex quailtyDashboardDisplaySchoolWrapper">
              {Array.from({ length: 8 }).map((_, index) => (
                <NoImagCard
                  key={index}
                  title={`School ${index + 1}`}
                  figure={"4,678"}
                  margin={"↓"}
                  marginColor="red"
                />
              ))}
            </div>
          </Row>
          <Row className="d-lg-none mb-2">
            <Col xl={6} lg={6} md={12} sm={12} xs={12}>
            <TitleHeader
        text={showList ? "Approval Queue" : "Approval History"}
        headerTextStyle={"headerTextStyle"}
      />
            </Col>
            
            <Col xl={6} lg={6} md={12} sm={12} xs={12} className="d-flex justify-content-between ms-auto gap-3">
            <NotificationBtn
         Primaryicon={showList ? faClockRotateLeft : faTableList }
          text={showList ? "History" : "Queue"}
          
          Primarystyle={"pushNotificationTimer mb-3"}
          onClick={toggleList}
          className="fs-14"
        />
               <Filter
                optionTitle={"Filter by"}
                options={filterData}
                defult={"Ramdom"}
              />
              <Filter
                optionTitle={"Sort by"}
                options={filterData}
                defult={"Ramdom"}
              />
            </Col>
          </Row>
          <Row className="d-none d-lg-flex">
            <div className="d-flex justify-content-between">
            <TitleHeader
        text={showList ? "Approval Queue" : "Approval History"}
        headerTextStyle={"headerTextStyle"}
      />
              
               <Col className="d-flex justify-content-end ms-auto gap-3">
               <NotificationBtn
          Primaryicon={showList ? faClockRotateLeft : faTableList}
          text={showList ? "History" : "Queue"}
          Primarystyle={"pushNotificationTimer mb-3"}
          onClick={toggleList}
        />
                <Filter
                  optionTitle={"Filter by"}
                  options={filterData}
                  defult={"Ramdom"}
                />
                <Filter
                  optionTitle={"Sort by"}
                  options={filterData}
                  defult={"Ramdom"}
                />
              </Col>
            </div>
          </Row>
          {showList ? (
        <ApprovalListPage users={users1} handleApprovalDetail={handleApprovalDetail} />
      ) : (
        <ApprovedItem  />
      )}
          <Row>
            <Col lg={12} md={12} xl={12} sm={12} xs={12} className="">
              <Card className="AdminRecentUserCardBody">
                <div className="AdminRecentUserActivtyScroll">
                  <Card.Title className="CardTiTle fw-bold m-3">
                    Admin
                  </Card.Title>
                  <Card.Body className="AdminRecentUser m-4 rounded">
                    {activities.map((activity) => (
                      <Row
                        key={activity.id}
                        className="align-items-center mb-2 py-2 "
                      >
                        <Col xs={4} lg={2} sm={4} md={4}>
                          <span className="">{activity.name}</span>
                        </Col>
                        <Col xs={4} lg={2} sm={4} md={4}>
                          <a
                            href="/"
                            className="text-decoration-none text-success"
                          >
                            {activity.action}
                          </a>
                        </Col>
                        <Col xs={4} lg={4} className="d-none d-lg-flex">
                          {activity.description}
                        </Col>
                        <Col
                          xs={2}
                          lg={2}
                          className="text-muted d-none d-lg-flex"
                        >
                          {activity.date}
                        </Col>
                        <Col xs={4} lg={2} sm={4} md={4} className="text-muted">
                          {activity.time}
                        </Col>
                      </Row>
                    ))}
                  </Card.Body>
                  <Card.Title className="CardTiTle fw-bold m-3">
                    Warehouse Staff
                  </Card.Title>

                  <Card.Body className="AdminRecentUser m-4 rounded">
                    {activities.map((activity) => (
                      <Row
                        key={activity.id}
                        className="align-items-center mb-2 py-2 "
                      >
                        <Col xs={4} lg={2} sm={4} md={4}>
                          <span className="">{activity.name}</span>
                        </Col>
                        <Col xs={4} lg={2} sm={4} md={4}>
                          <a
                            href="/"
                            className="text-decoration-none text-success"
                          >
                            {activity.action}
                          </a>
                        </Col>
                        <Col xs={4} lg={4} className="d-none d-lg-flex">
                          {activity.description}
                        </Col>
                        <Col
                          xs={2}
                          lg={2}
                          className="text-muted d-none d-lg-flex"
                        >
                          {activity.date}
                        </Col>
                        <Col xs={4} lg={2} sm={4} md={4} className="text-muted">
                          {activity.time}
                        </Col>
                      </Row>
                    ))}
                  </Card.Body>
                  <Card.Title className="CardTiTle fw-bold m-3">
                    Head Teacher
                  </Card.Title>

                  <Card.Body className="AdminRecentUser m-4 rounded">
                    {activities.map((activity) => (
                      <Row
                        key={activity.id}
                        className="align-items-center mb-2 py-2 "
                      >
                        <Col xs={4} lg={2} sm={4} md={4}>
                          <span className="">{activity.name}</span>
                        </Col>
                        <Col xs={4} lg={2} sm={4} md={4}>
                          <a
                            href="/"
                            className="text-decoration-none text-success"
                          >
                            {activity.action}
                          </a>
                          </Col>
                        <Col xs={4} lg={4} className="d-none d-lg-flex">
                          {activity.description}
                        </Col>
                        <Col
                          xs={2}
                          lg={2}
                          className="text-muted d-none d-lg-flex"
                        >
                          {activity.date}
                        </Col>
                        <Col xs={4} lg={2} sm={4} md={4} className="text-muted">
                          {activity.time}
                        </Col>
                      </Row>
                    ))}
                  </Card.Body>
                </div>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default QualityDashboard;
