import React, { useContext, useEffect, useMemo, useState } from "react";
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
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import TitleHeader from "../../components/Headers/TitleHeader";
import Filter from "../../components/Filter/Filter";
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

  const filterOptionforLGA = useMemo(() => [
    
    {
      pk: 2,
      type: "AKOKO EDO",
    },
    {
      pk: 3,
      type: "EGOR",
    },
    {
      pk: 4,
      type: "ESAN CENTRAL",
    },
    {
      pk: 5,
      type: "ESAN NORTH EAST",
    },
    {
      pk: 6,
      type: "ESAN SOUTH EAST",
    },
    {
      pk: 7,
      type: "ESAN WEST",
    },
    {
      pk: 8,
      type: "ETSAKO CENTRAL",
    },
    {
      pk: 9,
      type: "ETSAKO EAST",
    },
    {
      pk: 10,
      type: "ETSAKO WEST",
    },
    {
      pk: 11,
      type: "IGUEBEN",
    },
    {
      pk: 12,
      type: "IKPOBA OKHA",
    },
    {
      pk: 13,
      type: "OREDO",
    },
    {
      pk: 14,
      type: "ORHIONMWON",
    },
    {
      pk: 15,
      type: "OVIA NORTH EAST",
    },
    {
      pk: 16,
      type: "OVIA SOUTH WEST",
    },
    {
      pk: 17,
      type: "OWAN EAST",
    },
    {
      pk: 18,
      type: "OWAN WEST",
    },
    {
      pk: 19,
      type: "UHUNMWODE",
    },

  ], []);

  const filterOptionForType = useMemo(()=>[
   
    {
      pk: 2,
      type: 'JSS'
    },
    {
      pk: 3,
      type: 'Primary'
    },
    {
      pk: 4,
      type: 'Progressive'
    }
  ])

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

 

  return (
    <div>
       
        <Container>
        <Row className="mb-3">
            {/* <Col lg={6} md={12} xl={4} sm={12} xs={12} className="mb-2"> */}
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
            {/* </Col> */}
            {/* <Row lg={6} md={12} xl={8} sm={12} xs={12} className=""> */}
              <Row>
              <div>
              <BarGraph data={Bardata} options={Baroptions}  className=""/>
              </div>
              </Row>
             
            {/* </Row> */}
          </Row>
        </Container>
    </div>
  )
}
