import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  ArcElement,
  LineElement,
  PointElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./AdminDashboard.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import SideNavigation from "../../../components/Navigations/SideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import Filter from "../../../components/Filter/Filter";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import PresentaionCard from "../../../components/Card/PresentaionCard";

import inventoryImage from "../../../assets/bigIcon/inventoryIcon.png";
import schoolImage from "../../../assets/bigIcon/schoolIcon.png";
import LineGraph from "../../../components/Graph/LineGraph";
import DoughnutGraph from "../../../components/Graph/DoughnutGraph";
import BarGraph from "../../../components/Graph/BarGraph";
import ComfirmationPop from "../../../components/ComfirmationPopUp/ComfirmationPop";
import { useLocation, useNavigate } from "react-router-dom";
import InventoryItemContext from "../../../context/Item/InventoryItemContext";
import SchoolContext from "../../../context/School/SchoolContext";
import AnalysisContext from "../../../context/Analysis/AnalysisContext";

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function AdminDashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  

  const {
    getInventoryItems, getItemsData, getItemsIsLoading
  } = useContext(InventoryItemContext);

  
  const {
    getSchoolsData, getSchools, getSchoolsIsLoading
  } = useContext(SchoolContext);

  
  const { ProcessAnalysis, itemDataAnalysis, schoolDataAnalysis} =
  useContext(AnalysisContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [comfirmationAction, setComfirmationAction] = useState(false);
  const [message, setmessage] = useState("");
  const [messageColor, setmessageColor] = useState("");


  useEffect(() => {
    getInventoryItems();
    getSchools();
  }, [ ])

  useEffect(() => {
    ProcessAnalysis(getSchoolsData);
    ProcessAnalysis(getItemsData);
  }, [getItemsIsLoading, getSchoolsIsLoading ])

  const {value: InvetoryDifference, trend: InvetoryTrend} = itemDataAnalysis
  const {value: SchoolDifference, trend: SchoolTrend} = schoolDataAnalysis

  useEffect(() => {
    if (location.state?.message) {
      const redirectMessage = location.state?.message;
      handleComfirmationPopUps(redirectMessage, "bg-success");
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, []);
  const getSchoolsNew = async () => {
     
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/school`);
      console.log(response.data);
      
      setCount(response.data.count);
    } catch (error) {
      console.log(error)
    } 
  };

  useEffect(()=>{
    getSchoolsNew()
  },[])

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleComfirmationPopUps = (messageInfo, messageBgColor) => {
    setmessage(messageInfo);
    setmessageColor(messageBgColor);
    setComfirmationAction(true);
    setTimeout(() => {
      setComfirmationAction(false);
    }, 4000);
  };

  const handlePushNotification = () => {
    navigate("/AdminPushNotification");
  };

  const handleGenerateReport = () => {
    navigate("/GenerateInventory");
  };

  const filterData = [
    {
      pk: 1,
      type: "Date",
    },
  ];
  const Bardata = {
    // labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    labels: getItemsData.map(item=>item.name)||["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    datasets: [
      {
        label: "Stock Level",
        backgroundColor: "rgba(77, 182, 172, 1)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(146, 216, 200, 1)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data:  getItemsData.map(item=>item.quantity),
      },
    ],
  };
  const Baroptions = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        type: "linear",
        ticks: {
          font: {
            size: "12px",
            weight: "400",
            lineHeight: "25.6px",
          },
        },
      },
      x: {
        ticks: {
          font: {
            size: "12px",
            weight: "400",
          },
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          font: {
            weight: "bold",
          },
        },
      },
      tooltip: {
        titleFont: {
          weight: "bold",
        },
        bodyFont: {
          weight: "bold",
        },
      },
    },
  };

  const Piedata = {
    labels: getItemsData.map(item=>item.name)||["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        data: getItemsData.map(item=>item.quantity) ||[300, 50, 100, 40, 120, 75],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        borderWidth: 1,
      },
    ],
  };

  const Pieoptions = {
    cutout: "50%",
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: {
            weight: "bold",
          },
        },
      },
      tooltip: {
        titleFont: {
          weight: "bold",
        },
        bodyFont: {
          weight: "bold",
        },
      },
    },
  };

  const Arkdata = {
    labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    datasets: [
      {
        label: "Material Usage",
        data: [650, 590, 800, 810, 560, 550, 400, 700, 750, 650],
        fill: true,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        pointBackgroundColor: "rgba(75, 192, 192, 1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const Arkoptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: {
            weight: "bold",
          },
        },
      },
      tooltip: {
        titleFont: {
          weight: "bold",
        },
        bodyFont: {
          weight: "bold",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            weight: "bold",
          },
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            weight: "bold",
          },
        },
      },
    },
  };

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

  
  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <SideNavigation isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Container className="reportContainer">
          {message
            ? comfirmationAction && (
                <ComfirmationPop
                  message={message}
                  ComfirmationContainerStyle={`${messageColor} d-flex mb-2`}
                />
              )
            : null}
          <div className="d-flex justify-content-between">
            <TitleHeader text={"Dashboard"} />
            <Filter
                            Filterstyle={"responsive"}
              optionTitle={"Time"}
              options={filterData}
              defult={"This week"}
            />
          </div>
          <Row className="mb-3">
            <Col lg={3} md={3} xl={3} sm={6} xs={6} className="mb-2">
              <PrimaryButton
                text={"View Low Stock Items "}
                Primarystyle={"InventoryReportButton"}
                clickEvent={() => null}
              />
            </Col>
            <Col lg={3} md={3} xl={3} sm={6} xs={6} className="mb-2">
              <PrimaryButton
                text={"Add New Item"}
                Primarystyle={"InventoryReportButton"}
                clickEvent={() => navigate('/AddNewItem')}
              />
            </Col>
            <Col lg={3} md={3} xl={3} sm={6} xs={6}>
              <PrimaryButton
                text={"Generate Inventory Report"}
                Primarystyle={"InventoryReportButton"}
                clickEvent={handleGenerateReport}
              />
            </Col>
            <Col lg={3} md={3} xl={3} sm={6} xs={6}>
              <PrimaryButton
                text={"Send Push Notification"}
                Primarystyle={"InventoryReportButton"}
                clickEvent={handlePushNotification}
              />
            </Col>
          </Row>
          <Row className="mb-3 mt-3">
            <Col lg={12} md={12} xl={12} sm={12} xs={12}>
              <div className="d-flex justify-content-between ">
                <TitleHeader
                  text={"Material Availability Overview"}
                  headerTextStyle={"headerTextStyle"}
                />
                <Filter
                  optionTitle={"School"}
                  options={filterData}
                  defult={"All"}
                  Filterstyle={"d-none d-lg-block"}
                />
              </div>
              <div className=" d-lg-none d-flex justify-content-end ">
                <Filter
                  optionTitle={"School"}
                  options={filterData}
                  defult={"All"}
                />
              </div>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col lg={6} md={12} xl={4} sm={12} xs={12} className="mb-2">
              <Row className="mb-3">
                <PresentaionCard
                  title={"Total EdoSUBEB Schools"}
                  image={schoolImage}
                  figure={count? count :0}
                  margin={`${SchoolTrend === 'up' ? '↑' : SchoolTrend === 'down' ? '↓' : '~'} ${SchoolDifference}`}
                  marginColor={SchoolTrend === 'up' ? 'text-success': SchoolTrend === 'down' ? 'text-danger' : 'text-primary'}
                  />
              </Row>
              <Row className="mb-3">
                <PresentaionCard
                  title={"Total Items"}
                  image={inventoryImage}
                  figure={getItemsData? getItemsData.length :0}
                  margin={`${InvetoryTrend === 'up' ? '↑' : InvetoryTrend === 'down' ? '↓' : '~'} ${InvetoryDifference}`}
                  marginColor={InvetoryTrend === 'up' ? 'text-success': InvetoryTrend === 'down' ? 'text-danger' : 'text-primary'}
                />
              </Row>
            </Col>
            <Col lg={6} md={12} xl={8} sm={12} xs={12} className="">
              <BarGraph data={Bardata} options={Baroptions} />
            </Col>
          </Row>

          <Row className="d-none d-lg-flex mobileCreateButton my-3">
            <Col className="d-flex justify-content-end">
              <Filter
                optionTitle={"Export Data"}
                options={filterData}
                dropdrowStyle={"DashboardExportData"}
              />
            </Col>
          </Row>

          <Row className="d-none d-lg-flex">
            <Col lg={6} md={5} xl={6}>
              <TitleHeader
                text={"Inventory Insights"}
                headerTextStyle={"headerTextStyle"}
              />
            </Col>
            <Col className="d-flex justify-content-end ms-auto gap-3 mb-2">
              <Filter
                optionTitle={"Predictive Analytics"}
                options={""}
                defult={""}
              />
              <Filter
                optionTitle={"Sort by"}
                options={filterData}
                defult={"Ramdom"}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={6} md={6} xl={4} sm={12} xs={12} className="mb-3">
              <DoughnutGraph data={Piedata} options={Pieoptions} />
            </Col>
            <Col lg={6} md={6} xl={8} sm={12} xs={12} className="">
              <LineGraph data={Arkdata} options={Arkoptions} />
            </Col>
          </Row>

          <Row className="mb-3 mt-5">
            <Col lg={12} md={12} xl={12} sm={12} xs={12}>
              <div className="d-flex justify-content-between ">
                <TitleHeader
                  text={"Recent User Activity"}
                  headerTextStyle={"headerTextStyle"}
                />
                <Filter
                  optionTitle={"User Role"}
                  options={filterData}
                  defult={"All"}
                  Filterstyle={"d-none d-lg-block"}
                />
              </div>
              <div className=" d-lg-none d-flex justify-content-end ">
                <Filter
                  optionTitle={"User Role"}
                  options={filterData}
                  defult={"All"}
                />
              </div>
            </Col>
          </Row>

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

export default AdminDashboard;
