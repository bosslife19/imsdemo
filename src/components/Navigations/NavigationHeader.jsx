import React, { useContext, useEffect, useState } from "react";
import smallLogo from "../../assets/logo/small-Logo.jpg";
import {
  Navbar,
  Nav,
  Dropdown,
  Container,

  Image,
} from "react-bootstrap";
import "./Navigation.css";
import { NavLink } from "react-router-dom";
import AuthenticationContext from "../../context/Authentication/AuthenticationContext";
import axios from "axios";



function NavigationHeader({ toggleSidebar }) {
  const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
  const { userData, messages, } = useContext(AuthenticationContext);
  const [messageCount, setMessageCount] = useState(0)
  const getUser = async ()=>{
    try {
      const res = await axios.get(`${baseUrl}/api/user/${userData.id}`);
    setMessageCount(res.data.user.message_count);
    } catch (error) {
      console.log(error)
    }
    
    
  }

  useEffect(()=>{
    getUser()
  }, [])
  return (
    <Navbar
      expand="lg"
      variant="light"
      className="p-3 headerNavBar"
      fixed="top"
    >
      <Container fluid>
        
        <Navbar.Brand as={NavLink} to="/" >
          <Image
            src={smallLogo} // Replace with your logo path
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="EdoSUBEB Logo"
          />
        </Navbar.Brand>

        <Nav className="me-auto d-lg-none">
          <Navbar.Text className="nav-title navNameLogoMobile">
            EdoSUBEB IMS
          </Navbar.Text>
        </Nav>

        <div className="d-flex align-items-center gap-3">
          {/* <Nav.Link as={NavLink} to="/Notifications" className="d-lg-none">
            <i className="fa-regular fa-bell"></i>
          </Nav.Link> */}
          <Dropdown align="end" className="d-lg-none">
            <Dropdown.Toggle
              variant="light"
              id="user-dropdown"
              className="userDropdown m-0 p-1 bg-transparent"
            >
              <img src={ userData.image } style={{width:"10px", height:"10px", borderRadius:"30px",marginRight:"5px"}}/>
              {/* <i className="fa-regular fa-user mx-0"></i> */}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={NavLink} to="/Profile">
                Profile
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/Setting">
                Setting
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/Logout">
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Navbar.Toggle aria-controls="navbar-nav" onClick={toggleSidebar} />
        </div>
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto d-none d-lg-block">
            <Navbar.Text className="nav-title navNameLogo">
              EdoSUBEB Inventory Management System
            </Navbar.Text>
          </Nav>

          <Nav className="gap-3 d-none d-lg-flex align-items-center">
            {/* <Nav.Link href="#search">
              <i className="fa-solid fa-magnifying-glass"></i>
            </Nav.Link> */}
            <div style={{position:'relative'}}>
            {/* <Nav.Link as={NavLink} to="*">
              <i className="fa-regular fa-envelope"></i>
              
            </Nav.Link> */}
            {/* <p style={{position:'absolute', color:'coral', fontSize:12, top:1.5, right:'12%'}}>{messages}</p> */}
            </div>

            {/* <Nav.Link as={NavLink} to="/Notifications" style={{position:'relative'}}> */}
           
            <Nav.Link as={NavLink} to="#" style={{position:'relative'}}>
            <p style={{position:'absolute', top:-5, right:2, color:'coral'}}>{messageCount}</p>
              <i className="fa-regular fa-bell"></i>
            </Nav.Link>
            <Dropdown align="end">
              <Dropdown.Toggle
                variant="light"
                id="user-dropdown"
                className="userDropdown"
              >
                <img src={ userData.image } style={{width:"30px", height:"30px", borderRadius:"30px",marginRight:"5px"}}/>
                { userData.name }
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={NavLink} to="/Profile">
                  Profile
                </Dropdown.Item>
                <Dropdown.Item as={NavLink} to="/Setting">
                Setting
              </Dropdown.Item>
                <Dropdown.Item as={NavLink} to="/Logout">
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationHeader;
