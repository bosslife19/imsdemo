import React, { useContext, useEffect, useState } from "react";
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
import { Container, Row, Col } from "react-bootstrap";
import SchoolContext from "../../context/School/SchoolContext";
import AnalysisContext from "../../context/Analysis/AnalysisContext";
import schoolImage from "./../../assets/bigIcon/schoolIcon.png";
import inventoryImage from "./../../assets/bigIcon/inventoryIcon.png";
import InventoryItemContext from "../../context/Item/InventoryItemContext";
import PresentaionCard from "../../components/Card/PresentaionCard";
import BarGraph from "../../components/Graph/BarGraph";

// import PresentaionCard from "../../../components/Card/PresentaionCard";

// import inventoryImage from "../../../assets/bigIcon/inventoryIcon.png";
// import schoolImage from "../../../assets/bigIcon/schoolIcon.png";
// import BarGraph from "../../../components/Graph/BarGraph";
// import InventoryItemContext from "../../../context/Item/InventoryItemContext";
 
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


export const InventoryBox = () => {

    
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

 
  const Bardata = {
    labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
    datasets: [
      {
        label: "Stock Level",
        backgroundColor: "rgba(77, 182, 172, 1)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(146, 216, 200, 1)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: [650, 590, 800, 810, 560, 550, 400, 700, 650, 520],
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
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        data: [300, 50, 100, 40, 120, 75],
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
        <Container>
        <Row className="mb-3">
            <div className="mt-2">
              <Row className="mb-3">
                <PresentaionCard 
                  title={"Total EdoSUBEB Schools"}
                  image={schoolImage}
                  figure={getSchoolsData? getSchoolsData.length :0}
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
            </div>
            <div className="">
              <BarGraph data={Bardata} options={Baroptions} />
            </div>
          </Row>
        </Container>
    </div>
  )
}
