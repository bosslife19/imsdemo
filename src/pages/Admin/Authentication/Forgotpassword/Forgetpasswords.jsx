import React, { useState, useContext } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import axios from "axios";
import AuthenticationContext from "../../../../context/Authentication/AuthenticationContext";
 
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetError, setResetError] = useState(null);
  const [resetLoading, setResetLoading] = useState(false);
  const location = useLocation();
  const { ForgotemailuserResponse } = useContext(AuthenticationContext);
  const token = new URLSearchParams(location.search).get("token");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetLoading(true);

    if (password !== confirmPassword) {
      setResetError("Passwords do not match");
      setResetLoading(false);
      return;
    }

    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    const formData = {
      password,
      token,
    };

    try {
      await axios.post(`${baseUrl}/api/auth/reset-password`, formData);
      // Handle success (e.g., redirect to login page)
    } catch (error) {
      setResetError(error.response.data.message);
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <Form onSubmit={handleResetPassword}>
        <Form.Group controlId="formPassword">
          <Form.Control
            type="password"
            placeholder="New Password"
            className="mb-3 inputField"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId="formConfirmPassword">
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            className="mb-3 inputField"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button
          variant="success"
          type="submit"
          className="w-100 mb-3 mt-1 button rounded rounded-0"
          disabled={resetLoading}
        >
          {resetLoading ? <Spinner animation="border" size="sm" /> : "Set New Password"}
        </Button>

        {resetError && <p className="text-danger">{resetError}</p>}
      </Form>
    </div>
  );
};

export default ResetPassword;
