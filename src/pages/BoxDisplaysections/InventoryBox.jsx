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
import schoolImage from "../../assets/schools/shelves.jpg";
import inventoryImage from "../../assets/schools/schoolchildrens.jpg";
import InventoryItemContext from "../../context/Item/InventoryItemContext";
import PresentaionCard from "../../components/Card/PresentaionCard";
import BarGraph from "../../components/Graph/BarGraph";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import TitleHeader from "../../components/Headers/TitleHeader";
import Filter from "../../components/Filter/Filter";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  const [schools, setSchools] = useState([]);
  const [originalSchools, setOriginalSchools] = useState([])
  const [exportType, setExportType] = useState("");
  

  const {
    getInventoryItems, getItemsData, getItemsIsLoading,setGetItemsData
  } = useContext(InventoryItemContext);
 
 
  const {
    getSchoolsData, getSchools, getSchoolsIsLoading
  } = useContext(SchoolContext);

  
  const { ProcessAnalysis, itemDataAnalysis, schoolDataAnalysis} =
  useContext(AnalysisContext);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  // Calculate the number of pages
  const totalPages = Math.ceil(getItemsData.length / itemsPerPage);
  const paginatedData = getItemsData.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [comfirmationAction, setComfirmationAction] = useState(false);
  const [message, setmessage] = useState("");
  const [messageColor, setmessageColor] = useState("");
  const [filter, setFilter] = useState();
  const [originalItems, setOriginalItems] = useState([])
  const [lowItems, setLowItems] = useState([])
  const [logs, setLogs] = useState([]);
  useEffect(() => {
    getInventoryItems();
    getSchools();
    setOriginalItems(getItemsData);
    
   
  }, [ ])

  const getLogs = async()=>{
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    try {
      const response = await axios.get(`${baseUrl}/api/get-logs`);
      
      setLogs(response.data)
    } catch (error) {
      console.log(error)
    }
   
  }

  useEffect(()=>{
    getLogs()
  }, [])
  const getLowStockItems = ()=>{
    const low = originalItems.filter(item=>item.quantity < 20);
    setLowItems(low);
    
  }
  


  useEffect(() => {
    ProcessAnalysis(getSchoolsData);
    ProcessAnalysis(getItemsData);
    getLowStockItems();

    if(filter ==='All'){
      
       setGetItemsData(originalItems);

       return setSchools(originalSchools);
    
    }
    
    if(filter && schools){
      let schoolsMatch = schools.filter(item=>item.
        LGA === filter
        );
        
        if(schoolsMatch.length ===0){
          
          let schoolType = schools.filter(item=>item.SCHOOL_TYPE===filter);
          setCount(schoolType.length);
        }else{
          setCount(schoolsMatch.length);
        }
        
        
        
    }
    if(filter && filter === 'All'){
      setGetItemsData(originalItems); // Show all items
      setCount(schools.length); // Update count based on all schools
  
    }
   else if(filter==='AKOKO EDO'){
     
      setGetItemsData(originalItems.filter(item =>
        item.item_name === 'New Concept Mathematics' ||
        item.item_name === 'New English Concept' ||
        item.item_name === 'Wabp Social Studies Book 1'
      ));
    
    } else if(filter ==='EGOR'){
      setGetItemsData(originalItems.filter(item =>
        item.item_name === 'Basic Science: An Integrated Science Course' ||
        item.item_name === 'Junior Secondary Business Studies Textbook' 
      ))
    }
    else if(filter ==='ESAN CENTRAL'){
      
      setGetItemsData(originalItems.filter(item =>
        item.item_name === 'New Concept Mathematics' ||
        item.item_name === 'New English Concept' ||
        item.item_name === 'Wabp Social Studies Book 1'
      ));
    } else if(filter && filter==='JSS'){
      setGetItemsData(originalItems.filter(item =>
       item.item_name === 'Basic Science: An Integrated Science Course' ||
        item.item_name === 'Junior Secondary Business Studies Textbook' 
      ))
    }
    else if(filter &&filter==='Primary'){
      setGetItemsData(originalItems.filter(item =>
       item.item_name === 'New Concept Mathematics' ||
        item.item_name === 'New English Concept' ||
        item.item_name === 'Wabp Social Studies Book 1'
      ))
    }
    else if(filter && filter==='Progressive'){
      setGetItemsData(originalItems.filter(item =>
       item.item_name === 'New Concept Mathematics' ||
        item.item_name === 'New English Concept' ||
        item.item_name === 'Wabp Social Studies Book 1'
      ))
    }
  }, [getItemsIsLoading, getSchoolsIsLoading,filter ])

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
      
      setSchools(response.data.schools);
      
      setCount(response.data.count);
      setOriginalSchools(response.data.schools);
    } catch (error) {
      console.log(error)
    } 
  };

  useEffect(()=>{
    getSchoolsNew()
  },[])
 
 
  const filterOptionforLGA = useMemo(() => [
    {

      pk: 1,
      type: "All",
    },

   
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
    pk:1,
    type:'All'
   },

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

  
 
  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));
  };
  const Bardata = {
    // labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],

    labels: paginatedData.map(item => item.item_name),
   
    datasets: [
      {
        label: "Stock Level",
        backgroundColor: "rgba(77, 182, 172, 1)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(146, 216, 200, 1)",
        hoverBorderColor: "rgba(75,192,192,1)",
        data: paginatedData.map(item => item.quantity),
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

 
 
 

 
  return (
    <div>
      <div className=" upbox">
      <Row className="mb-3 mt-3">
            <Col   md={12}   sm={12} xs={12}>
              <div className="d-flex justify-content-between ">
                
                 <Filter
                  optionTitle={"School Type"}
                  options={filterOptionForType}
                  defult={"All"}
                  onSelect={(value) => setFilter(value)}
                />
                 <Filter
                  optionTitle={"LGA"}
                  options={filterOptionforLGA}
                  defult={"All"}
                  onSelect={(value) => setFilter(value)}
                />
              </div>
              {/* <div className=" d-lg-none d-flex justify-content-end ">
                <Filter
                  optionTitle={"School Type"}
                  options={filterOptionForType}
                  defult={"All"}
                  onSelect={(value) => setFilter(value)}
                />
                 <Filter
                  optionTitle={"LGA"}
                  options={filterOptionforLGA}
                  defult={"All"}
                  onSelect={(value) => setFilter(value)}
                />
              </div> */}
            </Col>
          </Row>
      </div>
      <Container>
        <div style={{ position: "relative", top: "-40px" }}>
        
        {/* <Row className="mb-3"> */}
       
              <Row className="mb-3">
              <Col   md={10}  sm={11} xs={11} className="marl m-auto">
                <PresentaionCard
                  title={"Total EdoSUBEB Schools"}
                  image={inventoryImage}
                  figure={count? count :0}
                  margin={`${SchoolTrend === 'up' ? '↑' : SchoolTrend === 'down' ? '↓' : '~'} ${SchoolDifference}`}
                  marginColor={SchoolTrend === 'up' ? 'text-success': SchoolTrend === 'down' ? 'text-danger' : 'text-primary'}
                  />
                  </Col>
              </Row>
              
              <Row className="mb-3">
              <Col   md={10}  sm={11} xs={11} className="marl m-auto" >
                 <PresentaionCard
                  title={"Total Items"}
                  image={schoolImage}
                  figure={getItemsData? getItemsData.length :0}
                  margin={`${InvetoryTrend === 'up' ? '↑' : InvetoryTrend === 'down' ? '↓' : '~'} ${InvetoryDifference}`}
                  marginColor={InvetoryTrend === 'up' ? 'text-success': InvetoryTrend === 'down' ? 'text-danger' : 'text-primary'}
                />
                </Col>
               </Row>
               
              <Row>
              <Col  md={10}  sm={11} xs={11} className="marl m-auto">
              <BarGraph data={Bardata} options={Baroptions} />
              </Col>
      <div style={{ width: "100%", margin: 'auto' ,paddingBottom:"10px"}}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="mt-3 mx-3 fa-2x backButtonIcon"
          onClick={handlePreviousPage}
        />
        <FontAwesomeIcon
          icon={faArrowRight}
          className="mt-3 mx-3 fa-2x backButtonIcon"
          onClick={handleNextPage}
        />
      </div>
     
              </Row>
        </div>
        </Container>
    </div>
  )
}
