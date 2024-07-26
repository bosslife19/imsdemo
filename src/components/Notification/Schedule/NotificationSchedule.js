import React, { useState } from 'react';
import { Modal, Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

export const Schedule = ({ show, handleClose }) => {
  const [schedule, setSchedule] = useState([{ day: '', month: '', year: '', hour: '', minute: '', ampm: 'AM' }]);

  const customSelectStyle = {
    border: 'none',
    boxShadow: 'none',
  };

  const TextSelectStyle = {
    fontFamily: "Open Sans",
    fontSize: "16px",
    fontWeight: 700,
    lineHeight: "25.6px",
    textAlign: "left",
    boxShadow: 'none',
  };

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    let numericValue = value.replace(/[^0-9]/g, '');
    if (name === 'year') {
      numericValue = numericValue.slice(0, 4);
    } else {
      numericValue = numericValue.slice(0, 2);
    }
    const values = [...schedule];
    values[index][name] = numericValue;
    setSchedule(values);
  };

  const handleAddSchedule = () => {
    setSchedule([...schedule, { day: '', month: '', year: '', hour: '', minute: '', ampm: 'AM' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(schedule);
  };

  return (
    <Modal show={show} onHide={handleClose} size="sm" centered>
      <Modal.Header style={customSelectStyle} closeButton>
        <Modal.Title style={TextSelectStyle}>Choose Your Time</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Form onSubmit={handleSubmit}>
            {schedule.map((item, index) => (
              <Card style={customSelectStyle} key={index} className="mb-3">
                <Card.Body>
                  <Row className="mb-3 g-3">
                    <label>Date <FontAwesomeIcon icon={faPen} style={{ marginLeft: '5px' }} /></label>
                    <Col xs={4} md={4}>
                      <Form.Group controlId={`day-${index}`}>
                        <Form.Control
                          type="text"
                          name="day"
                          placeholder="DD"
                          maxLength="2"
                          value={item.day}
                          onChange={(e) => handleChange(index, e)}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={4} md={4}>
                      <Form.Group controlId={`month-${index}`}>
                        <Form.Control
                          type="text"
                          name="month"
                          placeholder="MM"
                          maxLength="2"
                          value={item.month}
                          onChange={(e) => handleChange(index, e)}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={4} md={4}>
                      <Form.Group controlId={`year-${index}`}>
                        <Form.Control
                          type="text"
                          name="year"
                          placeholder="YY"
                          maxLength="4"
                          value={item.year}
                          onChange={(e) => handleChange(index, e)}
                          required
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="mb-3 g-3">
                    <label>Time <FontAwesomeIcon icon={faPen} style={{ marginLeft: '5px' }} /></label>
                    <Col xs={4} md={4}>
                      <Form.Group controlId={`hour-${index}`}>
                        <Form.Control
                          type="text"
                          name="hour"
                          placeholder="HH"
                          maxLength="2"
                          value={item.hour}
                          onChange={(e) => handleChange(index, e)}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={4} md={4}>
                      <Form.Group controlId={`minute-${index}`}>
                        <Form.Control
                          type="text"
                          name="minute"
                          placeholder="MM"
                          maxLength="2"
                          value={item.minute}
                          onChange={(e) => handleChange(index, e)}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col xs={4} md={4}>
                      <Form.Group controlId={`ampm-${index}`}>
                        <Form.Control
                          as="select"
                          name="ampm"
                          value={item.ampm}
                          onChange={(e) => handleChange(index, e)}
                          style={customSelectStyle}
                        >
                          <option value="AM">AM</option>
                          <option value="PM">PM</option>
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            ))}
            <div className="d-flex justify-content-between mt-3">
              <Button style={{ width: '100%' }} variant="success" type="submit">
                Done
              </Button>
            </div>
          </Form>
        </Container>
      </Modal.Body>
    </Modal>
  );
};
