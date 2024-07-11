import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./HeadTeacherTrackMaterial.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import TitleHeader from "../../../components/Headers/TitleHeader";
import Search from "../../../components/Search/Search";
import Filter from "../../../components/Filter/Filter";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons/faClockRotateLeft";
import DataTable from "react-data-table-component";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import HeadTeacherNavigation from "../Navigation/HeadTeacherNavigation";

function HeadTeacherTrackMaterial() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const filterData = [
    {
      pk: 1,
      type: "Date",
    },
  ];

  const data = [
    {
      date: "2024/05/24",
      time: "10:15 AM",
      itemId: "ITEM-001",
      itemName: "Gadget X",
      fromLocation: "Aisle 3, Bin 12",
      toLocation: "Picking Area",
      quantity: 5,
      action: "Picked for Order #123",
      user: "John Doe",
    },
    {
      date: "2024/05/24",
      time: "10:15 AM",
      itemId: "ITEM-001",
      itemName: "Gadget X",
      fromLocation: "Aisle 3, Bin 12",
      toLocation: "Picking Area",
      quantity: 5,
      action: "Picked for Order #123",
      user: "John Doe",
    },
    // Add more data as needed
  ];

  const columns = [
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
      wrap: true,
    },
    {
      name: "Time",
      selector: (row) => row.time,
      sortable: true,
      wrap: true,
    },
    {
      name: "Item ID",
      selector: (row) => row.itemId,
      sortable: true,
      wrap: true,
    },
    {
      name: "Item Name",
      selector: (row) => (
        <div>
          {row.itemName}{" "}
          <FontAwesomeIcon icon={faExclamationCircle} className="text-danger" />
        </div>
      ),
      sortable: true,
      wrap: true,
    },
    {
      name: "From Location",
      selector: (row) => row.fromLocation,
      sortable: true,
      wrap: true,
    },
    {
      name: "To Location",
      selector: (row) => row.toLocation,
      sortable: true,
      wrap: true,
    },
    {
      name: "Quantity",
      selector: (row) => row.quantity,
      sortable: true,
      wrap: true,
    },
    {
      name: "Action",
      selector: (row) => row.action,
      sortable: true,
      wrap: true,
    },
    {
      name: "User",
      selector: (row) => row.user,
      sortable: true,
      wrap: true,
    },
  ];

  return (
    <div>
      <NavigationHeader toggleSidebar={toggleSidebar} />
      <div className="d-flex justify-content-between">
        <HeadTeacherNavigation
          isOpen={isSidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        <Container className="reportContainer">
          <div className="d-flex justify-content-between">
            <TitleHeader text={"Track Materials"} />
            <Filter
              optionTitle={"Time"}
              options={filterData}
              defult={"This Week"}
            />
          </div>
          <div className="d-flex justify-content-between">
            <TitleHeader
              text={"Movement Log"}
              headerTextStyle={"headerTextStyle"}
            />
            <PrimaryButton
              Primaryicon={faClockRotateLeft}
              text={"Log History"}
              Primarystyle={"pushNotificationTimer d-lg-none mb-2"}
            />
          </div>
          <Row className="mb-4">
            <Col lg={12} md={12} xl={12} sm={12} xs={12}>
              <Search Searchstyle={"seachContentBar"} searchText={'Search Log...'}/>
            </Col>
          </Row>
          <Row className="d-lg-none mb-3">
            <Col className="d-flex justify-content-between ms-auto gap-3">
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
          <Row className="d-none d-lg-flex mb-3">
            <Col className="d-flex justify-content-end ms-auto gap-3">
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
              <PrimaryButton
                Primaryicon={faClockRotateLeft}
                text={"Log History"}
                Primarystyle={"pushNotificationTimer "}
              />
            </Col>
          </Row>
          <Container>
            <DataTable
              columns={columns}
              data={data}
              pagination
              highlightOnHover
              striped
              responsive
              customStyles={{
                header: {
                  style: {
                    backgroundColor: "rgba(146, 216, 200, 1)",
                  },
                },
                headRow: {
                  style: {
                    backgroundColor: "rgba(146, 216, 200, 1)",
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                    minHeight: "72px",
                  },
                },
                headCells: {
                  style: {
                    fontFamily: "Open Sans",
                    fontSize: "16px",
                    fontWeight: "700",
                    lineHeight: "25.6px",
                  },
                },
                rows: {
                  style: {
                    minHeight: "72px", // override the row height
                  },
                },
                cells: {
                  style: {
                    padding: "10px", // override the cell padding
                  },
                },
              }}
            />
          </Container>
        </Container>
      </div>
    </div>
  );
}

export default HeadTeacherTrackMaterial;
