import React, { useContext, useEffect, useState, useMemo } from "react";
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
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import "./AdminDashboard.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import SideNavigation from "../../../components/Navigations/SideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import Filter from "../../../components/Filter/Filter";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import PresentaionCard from "../../../components/Card/PresentaionCard";
import inventoryImage from "../../../assets/schools/schoolchildrens.jpg";
import schoolImage from "../../../assets/schools/shelves.jpg";
import LineGraph from "../../../components/Graph/LineGraph";
import DoughnutGraph from "../../../components/Graph/DoughnutGraph";
import BarGraph from "../../../components/Graph/BarGraph";
import ComfirmationPop from "../../../components/ComfirmationPopUp/ComfirmationPop";
import { useLocation, useNavigate } from "react-router-dom";
import InventoryItemContext from "../../../context/Item/InventoryItemContext";
import SchoolContext from "../../../context/School/SchoolContext";
import AnalysisContext from "../../../context/Analysis/AnalysisContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import jsPDF from 'jspdf'
import autoTable from "jspdf-autotable"
import * as XLSX from 'xlsx'

import { UserBox } from "../ViewLowstock/UserBox";

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
  const [schools, setSchools] = useState([]);
  const [exportType, setExportType] = useState("");
  
  const [itemsData, setItemsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  const [totalItems, setTotalItems] = useState(0);

  // Fetch items with pagination
  const fetchItems = async (page = 0) => {
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/items?page=${page + 1}`);
      const { data, pagination } = response.data;
      setItemsData(data);
      setTotalItems(pagination.total);
    } catch (error) {
      console.error("Error fetching items", error);
    }
  };

  useEffect(() => {
    fetchItems(currentPage);
  }, [currentPage]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const exportAccordingToType = () => {
    if (exportType === '') {
      return;
    }
    if (exportType === 'pdf') {
      let doc = new jsPDF();
      autoTable(doc, {
        head: [['Id', 'Name', 'Brand', 'Category', 'Quantity', 'Supplier']],
        body: itemsData.map(item => [item.id, item.item_name, item.brand, item.category, item.quantity, item.distribution]),
      });
      doc.save('edo-inventory.pdf');
    } else {
      var wb = XLSX.utils.book_new();
      var ws = XLSX.utils.json_to_sheet(itemsData);
      XLSX.utils.book_append_sheet(wb, ws, 'edo_inventory_report');
      XLSX.writeFile(wb, 'edo_inventory_report.xlsx');
    }
  };

  useEffect(() => {
    exportAccordingToType();
  }, [exportType]);

  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
  };

  const Bardata = {
    labels: itemsData.map(item => item.item_name),
    datasets: [
      {
        label: "Stock Level",
        backgroundColor: "rgba(77, 182, 172, 1)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(146, 216, 200, 1)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: itemsData.map(item => item.quantity),
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
    labels: itemsData.map(item => item.item_name),
    datasets: [
      {
        data: itemsData.map(item => item.quantity),
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

  return (
    <div>
      <NavigationHeader toggleSidebar={() => {}} />
      <div className="d-flex justify-content-between">
        <SideNavigation />
        <Container className="reportContainer">
          <Row className="mb-3">
            <Col lg={3} md={3} xl={3} sm={6} xs={6} className="mb-2">
              <Button
                variant="primary"
                onClick={() => {}}
                className="InventoryReportButton"
              >
                View Low Stock Items
              </Button>
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
                clickEvent={() => setExportType('pdf')}
              />
            </Col>
            <Col lg={3} md={3} xl={3} sm={6} xs={6}>
              <PrimaryButton
                text={"Send Push Notification"}
                Primarystyle={"InventoryReportButton"}
                clickEvent={() => navigate('/AdminPushNotification')}
              />
            </Col>
          </Row>

          {/* Graph Section */}
          <Row>
            <Col lg={6} md={12} xl={4} sm={12} xs={12}>
              <BarGraph data={Bardata} options={Baroptions} />
            </Col>
            <Col lg={6} md={12} xl={4} sm={12} xs={12}>
              <DoughnutGraph data={Piedata} options={Pieoptions} />
            </Col>
          </Row>

          {/* Pagination Controls */}
          <Row className="justify-content-center mt-4">
            <Col xs="auto">
              <Button onClick={handlePreviousPage} disabled={currentPage === 0}>
                <FontAwesomeIcon icon={faArrowLeft} /> Previous
              </Button>
            </Col>
            <Col xs="auto">
              <Button onClick={handleNextPage} disabled={currentPage >= totalPages - 1}>
                Next <FontAwesomeIcon icon={faArrowRight} />
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default AdminDashboard;

