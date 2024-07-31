import React from 'react';
import { Modal, Container, Table } from 'react-bootstrap';

export const UserBox = ({ items, show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Low Stock Items</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Table responsive="lg" striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Item Code</th>
                <th className="d-none d-lg-table-cell">Barcode ID</th>
                <th className="d-none d-lg-table-cell">Category</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={index}>
                  <td>{item.item_name}</td>
                  <td>{item.item_code}</td>
                  <td className="d-none d-lg-table-cell">{item.barcode_id}</td>
                  <td className="d-none d-lg-table-cell">{item.subject_category}</td>
                  <td>{item.quantity}</td>
                  <td>djdhd</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </Modal.Body>
    </Modal>
  );
};
