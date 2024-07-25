import React, { useState, useContext } from 'react';
import { Col, Form, Row, Button, Container } from 'react-bootstrap';
import AuthencationHeader from '../../../../components/Headers/AuthencationHeader';
import ComfirmationPop from '../../../../components/ComfirmationPopUp/ComfirmationPop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import AuthenticationContext from '../../../../context/Authentication/AuthenticationContext';
 
export function Forgotemail() {
  const [message, setMessage] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);
  const { handleForgetemail } = useContext(AuthenticationContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setButtonLoading(true);
    const email = e.target.email.value;
    
    try {
      await handleForgetemail(email); // Call the function from AuthenticationContext
      setMessage("Password reset link sent to your email.");
      setMessageColor("text-success");
    } catch (error) {
      setMessage("Error sending reset link. Please try again.");
      setMessageColor("text-danger");
    } finally {
      setButtonLoading(false);
    }
  };

  return (
    <Container fluid className="d-flex justify-content-center align-items-center min-vh-100">
      <Row className="w-100 text-center">
        <Col md={{ span: 6, offset: 3 }}>
          {message && (
            <ComfirmationPop
              message={message}
              ComfirmationContainerStyle={`${messageColor} d-flex mb-2`}
            />
          )}
          <h3 style={{ fontWeight: "medium" }} className="mb-3">Reset Your Password</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Control
                type="email"
                placeholder="Email Address"
                className="mb-3 inputField"
                name="email"
                required
              />
            </Form.Group>
            <Button
              variant="success"
              type="submit"
              className="w-100 mb-3 mt-1 button rounded rounded-0"
            >
              {buttonLoading ? (
                <FontAwesomeIcon icon={faSpinner} spin size="2x" />
              ) : (
                "Reset Password"
              )}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Forgotemail;
