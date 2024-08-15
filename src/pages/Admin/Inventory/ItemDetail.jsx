import React, { useEffect, useState } from "react";
import { Container, Row, Col, Image, Button } from "react-bootstrap";
import "./Inventory.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import TitleHeader from "../../../components/Headers/TitleHeader";
import Loading from "../../../components/Loading/Loading";
import NonAvaliable from "../../../components/NonAvaliable/NonAvaliable";
import ConditionalSideNavigation from "../../../components/Navigations/ConditionalSideNavigation";

function ItemList() {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetchItems(1);
  }, []);

  const fetchItems = async (page = 1) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/items?page=${page}`);
      const data = await response.json();
      setItems(data.items);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Failed to fetch items:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.last_page) {
      fetchItems(page);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <ConditionalSideNavigation isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Container className="reportContainer">
          <div className="d-flex">
            <TitleHeader text={"Item List"} />
          </div>
          {isLoading ? (
            <Container className="d-flex justify-content-center align-items-center vh-100">
              <Loading loading={isLoading} />
            </Container>
          ) : items.length > 0 ? (
            <div>
              {items.map((item) => (
                <Row key={item.item_code} className="itemDetailMainRow mb-2">
                  <Col className="itemHeaderText">
                    <Image src={item.image} rounded width="50" height="50" className="mx-2" />
                    {item.item_name}
                  </Col>
                  <Col className="itemHeaderText">{item.category}</Col>
                  <Col className="itemHeaderText">{item.quantity}</Col>
                  <Col className="itemHeaderText">{item.distribution}</Col>
                </Row>
              ))}
              <div className="pagination d-flex justify-content-center mt-4">
                <Button
                  onClick={() => handlePageChange(pagination.current_page - 1)}
                  disabled={!pagination.prev_page_url}
                >
                  Previous
                </Button>
                <span className="mx-2">
                  Page {pagination.current_page} of {pagination.last_page}
                </span>
                <Button
                  onClick={() => handlePageChange(pagination.current_page + 1)}
                  disabled={!pagination.next_page_url}
                >
                  Next
                </Button>
              </div>
            </div>
          ) : (
            <NonAvaliable
              textMessage={"No items available"}
              imageWidth={"300px"}
            />
          )}
        </Container>
      </div>
    </div>
  );
}

export default ItemList;


