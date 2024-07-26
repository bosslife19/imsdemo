import React, { useContext, useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Image, Table,  } from "react-bootstrap";
import "../TrackMaterial/WareHouseTrack.css";
import TrackingContext from "../../../context/Tracking/TrackingContext";
import { useLocation, useNavigate } from "react-router-dom";
import { convertDate, convertDated, convertTime, scrollToTop } from "../../../utils/HelperFunc";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import WareHouseSideNavigation from "../Navigation/WareHouseSideNavigation";
import ComfirmationPop from "../../../components/ComfirmationPopUp/ComfirmationPop";
import TitleHeader from "../../../components/Headers/TitleHeader";
import Search from "../../../components/Search/Search";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { faClockRotateLeft, faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import Filter from "../../../components/Filter/Filter";
import inventoryListImage from "../../../assets/bigIcon/inventoryList.png";
import NonAvaliable from "../../../components/NonAvaliable/NonAvaliable";
import Loading from "../../../components/Loading/Loading";
import jsPDF from 'jspdf'
import autoTable from "jspdf-autotable"
import * as XLSX from 'xlsx'

function MovementLog() {
  const navigate = useNavigate();
  const location = useLocation();

  const { getTrackings, getTrackingsData, getTrackingsIsLoading } =
    useContext(TrackingContext);

    const [exportType, setExportType] = useState("");
  

  

  const exportAccordingToType = ()=>{
    if(exportType ===''){
      return;
    }
    if(exportType ==='pdf'){
      let doc = new jsPDF();
      autoTable(doc,{
        head: [['Id','Name', 'Brand', 'Category','Quantity','Supplier' ]],
        body: getTrackingsData.map(item=>[item.id, item.item_name, item.brand, item.subject_category, item.quantity, item.distribution]),
      })
      doc.save('edo-inventory.pdf');
     
   
    }
    else{
      var wb = XLSX.utils.book_new()
    var ws = XLSX.utils.json_to_sheet(getTrackingsData);

    XLSX.utils.book_append_sheet(wb, ws, 'edo_iventory_report');
    XLSX.writeFile(wb, 'edo_inventory_report.xlsx');
   
    }
  }
  useEffect(()=>{
    exportAccordingToType();
  }, [exportType])
  

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [comfirmationAction, setComfirmationAction] = useState(false);
  const [message, setmessage] = useState("");
  const [messageColor, setmessageColor] = useState("");
  const [filteredData, setFilteredData] = useState();
  const [filterBy, setFilterBy] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getTrackings();
    setFilteredData(getTrackingsData);
  }, []);

  useEffect(() => {
    handleFilterSortSearch();
  }, [filterBy, sortBy, searchTerm, getTrackingsData]);

  useEffect(() => {
    if (location.state?.message) {
      scrollToTop();
      const redirectMessage = location.state?.message;
      handleComfirmationPopUps(redirectMessage, "bg-success");
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, []);

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
        type: "pending",
      },
      {
        pk: 3,
        type: "active",
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
  const sortOptionUP = useMemo(
    () => [
      {
        pk: 1,
        type: "This week",
      },
      {
        pk: 2,
        type: "Last week",
      },
    ],
    []
  );

  const filterData = [
    {
      pk: 1,
      type: "Excel",
    },
    {
      pk: 2,
      type:'pdf'
    }
   
  ];

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterSortSearch = () => {
    let filtered = [...getTrackingsData];

    if (filterBy && filterBy !== "All") {
      filtered = filtered.filter((item) => item.status === filterBy);
    }

    if (sortBy) {
      filtered.sort((a, b) => {
        if (sortBy === "ascending") {
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
    setmessage(messageInfo);
    setmessageColor(messageBgColor);
    setComfirmationAction(true);
    setTimeout(() => {
      setComfirmationAction(false);
    }, 4000);
  };

 
  
  const tableHeaders = [
    'Date Taken',
    'Date Returned',
    'Time',
    'Item ID',
    'Item Name',
    'From Location',
    'to Location',
    'Quantity',
    'Action',
    'User'
  ];
  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <WareHouseSideNavigation
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
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
           <TitleHeader text={"Track Materials"} />
          <Filter
                optionTitle={"Time"}
                options={sortOptionUP}
                defult={"This week"}
                onSelect={(value) => setSortBy(value)}
              />
          </div>
          <TitleHeader
            text={"Movement Log"}
            headerTextStyle={"headerTextStyle"}
          />
          <Row className="mb-3">
            <Col lg={12} md={12} xl={12} sm={12} xs={12}>
              <Search
                Searchstyle={"seachContentBar"}
                searchText={"Search Log..."}
              />
            </Col>
          </Row>
           
          <Row className="d-lg-none ">
            <Col className="d-flex justify-content-between ms-auto gap-3">
              <Filter
              Filterstyle={"responsive"}
                optionTitle={"Filter by"}
                options={filterOption}
                defult={"Ramdom"}
                onSelect={(value) => setFilterBy(value)}
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
          <Row className="d-none d-lg-flex">
            <Col className="d-flex justify-content-end ms-auto gap-3">
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
                 <Filter
                optionTitle={"Export Data"}
                options={filterData}
                dropdrowStyle={"DashboardExportData"}
                onSelect={(value) => setExportType(value)}
                
              />
            </Col>
          </Row>
          
          <Container className=" ListContainer pt-2">
          <Table className="tablesSize" bordered  responsive>
          <thead >
        <tr>
          {tableHeaders.map((header, keys) => (
            <th style={{ backgroundColor: '#92D8C8' }}  key={keys}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
            {!getTrackingsIsLoading ? (
              filteredData && filteredData.length > 0 ? (
                filteredData.map((Item) => (
                 
                  <tr key={Item.id}  className="UserListRow ">
                   
                   <td>
                   {convertDated(Item.created_at)}
                   </td>
                   <td>
                   {convertDated(Item.created_at)}
                   </td>
                   <td className="d-flex">{convertTime(Item.created_at)}</td>
                      
                        <td> <h6 > {" "}{Item.id}</h6></td>
                        <td>
                        <h6>{Item.item_name}</h6></td>
                        <td className=""> 
                             {" "} {Item.category}{" "} 
                            </td>
                            <td className="">
                              {Item.item_description} {" "}
                            
                            </td>
                            <td>    {Item.action} </td>
                            <td>  {Item.brand}  </td>
                            
                             
                             <td> {" "}
                               {Item.address} 
                             
                          </td>
                              
                  </tr>
                 
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
                <Loading loading={getTrackingsIsLoading} />
              </Container>
            )}
             </tbody>
            </Table>
          </Container>
         
        </Container>
      </div>
    </div>
  );
}

export default MovementLog;
