import React, { useContext, useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Image, Table } from "react-bootstrap";
import "./HeaderTeacherInventory.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import TitleHeader from "../../../components/Headers/TitleHeader";
import Search from "../../../components/Search/Search";
import Filter from "../../../components/Filter/Filter";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import PresentaionCard from "../../../components/Card/PresentaionCard";
import inventoryImage from "../../../assets/schools/schoolchildrens.jpg";
import schoolImage from "../../../assets/schools/shelves.jpg";
import { useNavigate } from "react-router-dom";
import HeadTeacherNavigation from "../Navigation/HeadTeacherNavigation";
import InventoryItemContext from "../../../context/Item/InventoryItemContext";
import NonAvaliable from "../../../components/NonAvaliable/NonAvaliable";
import Loading from "../../../components/Loading/Loading";
import { convertDate, convertDated } from "../../../utils/HelperFunc";
import AnalysisContext from "../../../context/Analysis/AnalysisContext";
import AuthenticationContext from "../../../context/Authentication/AuthenticationContext";

function DataInventory() {
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
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredData(filtered);
  };

 
  const tableHeaders = [
    'Id',
    'Name',
    'Brand ',
    'Category',
    // 'school',
    'Supplier',
    'Quantity',
    // 'to Location',
    'Date',
     
   ];
   return (
    
    <div className="Bodied">
       <div className="Scrollingss">
            
           <Container className="">
           <Table className="tablesSize" bordered  responsive>
           <thead >
        <tr>
          {tableHeaders.map((header, keys) => (
            <th style={{ backgroundColor: '#b2b2b2' }}  key={keys}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
            {!getItemsIsLoading ? (
              filteredData && filteredData.length > 0 ? (
                filteredData.map((Item) => (
                    <tr  key={Item.id}
                    className="UserListRow my-2 py-2 align-items-center">
                 
                    {/* <Col
                      xs={12}
                      md={12}
                      sm={12}
                      lg={12}
                      xl={12}
                      className="d-flex gap-3"
                    > */}
                      {/* <Image
                        src={Item.image}
                        rounded
                        width="50"
                        height="50"
                      /> */}
                      {/* <div> */}
                       <td className="fs-6">
                        INV-{Item.id}
                         </td>
                      <td>
                         {Item.name} 
                        </td>
                        <td>  {Item.brand}  </td>
                          <td className="text-muted ">
                             {Item.category}  {''}
                            </td>
                            
                              {/* <td>
                               {`$${Item.school}`}</td> */}
                              
                               <td>{Item.supplier}</td>
                               <td>
                                {Item.quantity} 
                               </td>
                               
                              <td>
                              {convertDated(Item.created_at)}
                              </td>
                           
                      {/* </div> */}
                    {/* </Col> */}
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
                <Loading loading={getItemsIsLoading} />
              </Container>
            )}
             
            </tbody>
            </Table>
          </Container>
       </div>
    </div>
  );
}

export default DataInventory;
