import React, { useContext, useEffect, useState, useMemo } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./Management.css";
import NavigationHeader from "../../../components/Navigations/NavigationHeader";
import SideNavigation from "../../../components/Navigations/SideNavigation";
import TitleHeader from "../../../components/Headers/TitleHeader";
import Search from "../../../components/Search/Search";
import Filter from "../../../components/Filter/Filter";
import PrimaryButton from "../../../components/Button/PrimaryButton";
import { faAdd } from "@fortawesome/free-solid-svg-icons/faAdd";
import PresentaionCard from "../../../components/Card/PresentaionCard";
import schoolImage from "../../../assets/bigIcon/schoolIcon.png";
import userListImage from "../../../assets/bigIcon/userList.png";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../../components/Loading/Loading";
import SchoolContext from "../../../context/School/SchoolContext";
import NonAvaliable from "../../../components/NonAvaliable/NonAvaliable";
import ComfirmationPop from "../../../components/ComfirmationPopUp/ComfirmationPop";
import { scrollToTop, convertDate } from "../../../utils/HelperFunc";
import AnalysisContext from "../../../context/Analysis/AnalysisContext";

function SchoolsManagement() {
  const navigate = useNavigate();
  const location = useLocation();

  const { getSchoolsData, getSchoolsIsLoading, getSchools} =
  useContext(SchoolContext);

  const { ProcessAnalysis, schoolDataAnalysis } =
  useContext(AnalysisContext);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [comfirmationAction, setComfirmationAction] = useState(false);
  const [message, setmessage] = useState("");
  const [messageColor, setmessageColor] = useState("");
  const [filteredData, setFilteredData] = useState();
  const [filterBy, setFilterBy] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getSchools();
    setFilteredData(getSchoolsData);
  }, []);

  useEffect(() => {
    ProcessAnalysis(getSchoolsData);
  }, [getSchoolsIsLoading]); 

  const {value, trend} = schoolDataAnalysis

  useEffect(() => {
    handleFilterSortSearch();
  }, [filterBy, sortBy, searchTerm, getSchoolsData]);

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

  const filterOption = useMemo(() => [
    {
      pk: 1,
      type: "All",
    },
    {
      pk: 2,
      type: "active",
    },
    {
      pk: 3,
      type: "pending",
    },
  ], []);

  const sortOption = useMemo(() => [
    {
      pk: 1,
      type: "ascending",
    },
    {
      pk: 2,
      type: "descending",
    },
  ], []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterSortSearch = () => {
    let filtered = [...getSchoolsData];

    if (filterBy && filterBy !== "All") {
      filtered = filtered.filter((item) => item.status === filterBy);
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

  const handleComfirmationPopUps = (messageInfo, messageBgColor) => {
    setmessage(messageInfo);
    setmessageColor(messageBgColor);
    setComfirmationAction(true);
    setTimeout(() => {
      setComfirmationAction(false);
    }, 4000);
  };

  const handleCreateSchool = () => {
    navigate("/AddSchool");
  };
  const handleSchoolDetail = (pk) => {
    navigate(`/SchoolDetail/${pk}`);
  };
  const handleSchoolEdit = (pk) => {
    navigate(`/EditSchool/${pk}`);
  };
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
          <TitleHeader text={"Schools Management"} />
          <Row className="mb-3">
            <Col lg={12} md={12} xl={12} sm={12} xs={12}>
              <Search
                Searchstyle={"seachContentBar"}
                searchText={"Search Schools..."}
                onSearchChange={handleSearchChange}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col lg={6} md={12} xl={4} sm={12} xs={12}>
              <PresentaionCard
                title={"Total EdoSUBEB Schools"}
                image={schoolImage}
                figure={getSchoolsData ? getSchoolsData.length : 0}
                margin={`${trend === 'up' ? '↑' : trend === 'down' ? '↓' : '~'} ${value}`}
                marginColor={trend === 'up' ? 'text-success': trend === 'down' ? 'text-danger' : 'text-primary'}

              />
            </Col>
          </Row>
          <Row className="d-lg-none mobileCreateButton my-3">
            <Col className="d-flex justify-content-end">
              <PrimaryButton
                Primaryicon={faAdd}
                text={"Add School"}
                Primarystyle={"UserManagementCreateButton"}
                clickEvent={() => handleCreateSchool()}
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
              <PrimaryButton
                icPrimaryiconon={faAdd}
                text={"Create New School"}
                Primarystyle={"UserManagementCreateButton"}
                clickEvent={() => handleCreateSchool()}
              />
            </Col>
          </Row>
          <Container>
            {!getSchoolsIsLoading ? (
              filteredData && filteredData.length > 0 ? (
                filteredData.map((school) => (
                  <Row
                    key={school.id}
                    className="UserListRow my-2 py-2 align-items-center"
                  >
                    <Col xs={9} md={9} sm={9} lg={9} className="d-flex gap-3">
                      <Image
                        src={school.school_image}
                        rounded
                        width="50"
                        height="50"
                      />
                      <div>
                        <h6>{school.name}</h6>
                        <h6 className="fs-6">
                          {" "}
                          SCH-{school.id}
                          <span className="text-muted InventoryCategoryText">
                            {" "}
                            | {school.address}{" "}
                            <span className="d-none d-lg-inline me">
                              {school.city} | {school.level} |{" "}
                              {school.phone_number} |{" "}
                              <b>{school.postal_code}</b> |
                              <span
                                className={
                                  school.status === "Active"
                                    ? "text-success"
                                    : "text-danger"
                                }
                              >
                                {" "}
                                {school.status}
                              </span>{" "}
                              | {convertDate(school.created_at)}
                            </span>{" "}
                          </span>
                        </h6>
                      </div>
                    </Col>
                    <Col
                      xs={3}
                      md={3}
                      sm={3}
                      lg={3}
                      className="d-flex justify-content-end gap-2"
                    >
                      <PrimaryButton
                        text={"Edit"}
                        Primarystyle={"UserViewButton d-none d-lg-block"}
                        clickEvent={() => handleSchoolEdit(school.id)}
                      />
                      <PrimaryButton
                        text={"View"}
                        Primarystyle={"schoolViewButton"}
                        clickEvent={() => handleSchoolDetail(school.id)}
                      />
                    </Col>
                  </Row>
                ))
              ) : (
                <NonAvaliable
                  textMessage={
                    "Sorry, there is currently no school available 😥"
                  }
                  imageWidth={"300px"}
                />
              )
            ) : (
              <Container className="d-flex justify-content-center align-items-center h-50">
                <Loading loading={getSchoolsIsLoading} />
              </Container>
            )}
          </Container>
        </Container>
      </div>
    </div>
  );
}

export default SchoolsManagement;
