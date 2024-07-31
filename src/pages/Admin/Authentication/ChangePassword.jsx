import React, { useContext, useEffect, useState } from "react";
import "./AdminAuthenticate.css";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import AuthencationHeader from "../../../components/Headers/AuthencationHeader";
import AuthenticationContext from "../../../context/Authentication/AuthenticationContext";
import ComfirmationPop from "../../../components/ComfirmationPopUp/ComfirmationPop";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
  const [buttonLoading, setButtonLoading] = useState(false);
  const [error, setError] = useState("")
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async (e)=>{
    try {
      e.preventDefault();
      setButtonLoading(true)
      const res = await axios.post(`${baseUrl}/api/auth/changepassword`,{email, password});
      
      if(res.status ==200){
        setButtonLoading(false)
          navigate('/Login');
      }
    } catch (error) {
      console.log(error)
      setButtonLoading('false')
    if(error.response){
      setError(error.response.data.message)
    }else{
      setError('Network Error. Please check your connection')
    }
    }
   

  }

  
  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center min-vh-100"
    >
      <Row className="w-100 text-center">
        <AuthencationHeader text={"EdoSUBEB Inventory Management System"} />
        <Col md={{ span: 6, offset: 3 }}>
         
           
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Email Address"
                className="mb-3 inputField"
                name="email"
                required
                onChange={(e)=>setEmail(e.target.value)}
              />
               <Form.Control
                type="password"
                placeholder="password"
                className="mb-3 inputField"
                name="password"
                required
                onChange={(e)=>setPassword(e.target.value)}
              />
            </Form.Group>
           
           
            <Button
              variant="success"
              type="submit"
              className="w-100 mb-3 mt-5 button rounded rounded-0"
            >
               {buttonLoading ? (
                <FontAwesomeIcon icon={faSpinner} spin size="2x" />
              ) : (
                "Submit"
              )}
            </Button>
            {error&& <p style={{textAlign:'center', color:"coral"}}>{error}</p>}
            <p>
              Are you a new user?{" "}
              <Link to={"/SignUp"} className="text-decoration-none">
                Submit
              </Link>
            </p>
          </Form>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
