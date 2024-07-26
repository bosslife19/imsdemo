import React, { useContext, useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import "../TrackMaterial/WareHouseTrack.css";
import TrackingContext from "../../../context/Tracking/TrackingContext";
import { useLocation, useNavigate } from "react-router-dom";
import { convertDated, convertTime, scrollToTop } from "../../../utils/HelperFunc";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import WareHouseSideNavigation from "../Navigation/WareHouseSideNavigation";
import ComfirmationPop from "../../../components/ComfirmationPopUp/ComfirmationPop";
import TitleHeader from "../../../components/Headers/TitleHeader";
import Search from "../../../components/Search/Search";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { faClockRotateLeft, faSpinner } from '@fortawesome/free-solid-svg-icons';
import Filter from "../../../components/Filter/Filter";
import NonAvaliable from "../../../components/NonAvaliable/NonAvaliable";
import Loading from "../../../components/Loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MovementLog() {
  const navigate = useNavigate();
  const location = useLocation();

  const { getTrackings, getTrackingsData, getTrackingsIsLoading } = useContext(TrackingContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [comfirmationAction, setComfirmationAction] = useState(false);
  const [message, setmessage] = useState("");
  const [messageColor, setmessageColor] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [filterBy, setFilterBy] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
  }, [location, navigate]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const filterOption = useMemo(
    () => [
      { pk: 1, type: "All" },
      { pk: 2, type: "pending" },
      { pk: 3, type: "active" },
    ],
    []
  );

  const sortOption = useMemo(
    () => [
      { pk: 1, type: "ascending" },
      { pk: 2, type: "descending" },
    ],
    []
  );

  const sortOptionUP = useMemo(
    () => [
      { pk: 1, type: "This week" },
      { pk: 2, type: "Last week" },
    ],
    []
  );

  const filterData = [{ pk: 1, type: "Date" }];

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
    "Date Taken",
     "Time",
    "Item ID",
    "Item Name",
    "Item Desc",
    "Brand",
    "Category",
    "Priority",
    "Location",
    "Action",
     "Status"
   ];
  const handleaddmovement =()=>{
     navigate("/WareHouseAddMovement");
  }
  return (
    <div>
          <Container className="ListContainer pt-2" >
            {!getTrackingsIsLoading ? (
              filteredData && filteredData.length > 0 ? (
                <Table className="tablesSize" bordered responsive>
                  <thead>
                    <tr>
                      {tableHeaders.map((header, keys) => (
                        <th style={{ backgroundColor: '#92D8C8' }} key={keys}>
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((Item) => (
                      <tr key={Item.id} className="listgrow">
                      <td style={{height:"100%"}}>{convertDated(Item.created_at)}</td>
                        <td style={{height:"100%"}}>{convertTime(Item.created_at)}</td>
                        <td style={{height:"100%"}}>
                          <h6> {Item.id}</h6>
                        </td>
                        <td style={{height:"100%",padding:"10px"}}>
                          <h6>{Item.item_name}</h6>
                        </td>
                        <td style={{height:"100%",padding:"10px"}}> {Item.item_description} </td>
                        <td style={{height:"100%",padding:"10px"}}> {Item.brand} </td>
                        <td style={{height:"100%",padding:"10px"}}> {Item.category} </td>
                        <td className={
                                  Item.priority === "low"
                                    ? "text-success"
                                    : Item.priority === "high"
                                    ? "text-danger"
                                    : "text-warning"
                                }
                              >
                                {Item.priority}
                              </td>
                              <td style={{height:"100%",padding:"10px"}}> {Item.address} </td>
                         <td style={{height:"100%",padding:"10px"}}> {Item.action} </td>
                         <td className={
                                  Item.status === "pending"
                                    ? "text-danger"
                                    : "text-success"
                                }
                              >
                                {" "}
                                {Item.status}
                              </td>
                       </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <NonAvaliable
                  textMessage={"Sorry, there is currently no available item! 😥"}
                  imageWidth={"300px"}
                  className="nonAvailableContainer"
                />
              )
            ) : (
              <Container className="d-flex justify-content-center align-items-center h-50">
                <Loading loading={getTrackingsIsLoading} />
              </Container>
            )}
             <Row className="justify-content-center mb-4">
            <Col xs={12} lg={12}>
              <Button
                variant="success"
                className="w-100 p-3"
                // clickEvent={() => handleaddmovement()}
                onClick={handleaddmovement}
              >
                 Add Movement 
                
              </Button>
            </Col>
          </Row>
          </Container>
    </div>
  );
}

export default MovementLog;
