import React from "react";
import "./QualityNavigation.css";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Search from "../../../components/Search/Search";
import {
    faBell,
    faSignOutAlt,
    faDashboard,
  } from "@fortawesome/free-solid-svg-icons";
import {
    SideNavButton,
    SideNavAppStore,
  } from "../../../components/Navigations/SideNavComponent";

function QualityNavigation({toggleSidebar, isOpen}) {
  return (
    <div
    className={`d-flex flex-column sidebar ${isOpen ? "open" : ""} fixed-top`}
  >
    {" "}
    <Search Searchstyle={"seachSideBar"} searchText={'Search'}/>
    <Nav className="flex-column">
      <Nav.Link
        as={NavLink}
        to="/QaDashboard"
        className={`sideNavButtonAchorTag ${({ isActive }) =>
          isActive ? "active" : ""}`}
      >
        <SideNavButton
          text={"Dashboard"}
          icon={faDashboard}
          hoverStyle={"sideNavPrimaryHoverButton"}
        />
      </Nav.Link>
      <Nav.Link
        as={NavLink}
        to="/QualityPushNotification"
        className={({ isActive }) =>
          isActive ? "active" : ""}
      >
        <SideNavButton
          text={"Push Notifications"}
          icon={faBell}
          hoverStyle={"sideNavPrimaryHoverButton"}
        />
      </Nav.Link>
      <SideNavAppStore />
      {/* <Nav.Link href="#dark-mode">
        <SideNavButton
          text={"Dark mode"}
          icon={faMoon}
          toggle={<ButtonToggle />}
          hoverStyle={"sideNavDarkModeButton wareHouseDarkMode"}
        />
      </Nav.Link> */}
      <Nav.Link as={NavLink} to="/Logout" className="logout">
        <SideNavButton
          text={"Log Out"}
          icon={faSignOutAlt}
          hoverStyle={"sideNavLogoutButton"}
        />
      </Nav.Link>
    </Nav>
  </div>
  )
}

export default QualityNavigation