import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import PrimaryButton from '../../../components/Button/PrimaryButton';
import inventoryListImage from '../../../assets/bigIcon/inventoryList.png';

const ApprovedItem = ({ handleApprovalDetail }) => {
  const users2 = [
    {
      id: 1,
      itemType: "Pens",
      suppy: "Office Supplies",
      itemName: "Blue ballpoint pen",
      Admin: "Admin Name",
      action: 'Add New Item',
      joinDate: "2024-05-18",
      status: 'approved',
    },
    {
      id: 2,
      itemType: "Pensf",
      suppy: "Office Supplies",
      itemName: "Blue ballpoint pen",
      Admin: "makos Name",
      action: 'Add New Item',
      joinDate: "2024-05-18",
      status: 'denied',
    },
    {
      id: 3,
      itemType: "Pen",
      suppy: "Office Supplies",
      itemName: "Blue ballpoint pen",
      Admin: "Admin Name",
      action: 'Add New Item',
      joinDate: "2024-05-18",
      status: 'approved',
    },
    {
      id: 4,
      itemType: "Pen",
      suppy: "Office Supplies",
      itemName: "Blue ballpoint pen",
      Admin: "Admin Name",
      action: 'Add New Item',
      joinDate: "2024-05-18",
      status: 'denied',
    },
    {
      id: 5,
      itemType: "Pen",
      suppy: "Office Supplies",
      itemName: "Blue ballpoint pen",
      Admin: "Admin Name",
      action: 'Add New Item',
      joinDate: "2024-05-18",
      status: 'approved',
    },
    {
      id: 6,
      itemType: "Pen",
      suppy: "Office Supplies",
      itemName: "Blue ballpoint pen",
      Admin: "Admin Name",
      action: 'Add New Item',
      joinDate: "2024-05-18",
      status: 'denied',
    },
  ];

  return (
    <Container className="ListContainer mb-5">
      {users2.map((user) => (
        <Row
          key={user.id}
          className="UserListRow my-2 py-2 align-items-center"
        >
          <Col xs={7} md={7} sm={7} lg={7} className="d-flex gap-3">
            <Image
              src={inventoryListImage}
              rounded
              width="50"
              height="50"
            />
            <div>
              <h6>{user.itemType}</h6>
              <h6 className="fs-6">
                {" "}
                {user.action}
                <span className="quailtyDashboardListText">
                  {" "}
                  | {user.suppy}{" "}
                  <span className="d-none d-lg-inline me">
                    {user.itemName} | {user.Admin} | {user.joinDate}
                  </span>{" "}
                </span>
              </h6>
            </div>
          </Col>
          
          <Col  xs={5}
                  md={5}
                  sm={5}
                  lg={5}
                  className="d-flex justify-content-end gap-2 ">
           <PrimaryButton
              text={"View"}
              Primarystyle={"quailtyListViewButton rounded rounded-4 px-2 lg-px-4"}
              clickEvent={() => handleApprovalDetail()}
            />
             {user.status === 'approved' ? (
              <PrimaryButton
                text={"Approved"}
                Primarystyle={"bg-success border border-0 rounded rounded-4 px-2 md-px-1"}
              />
            ) : (
              <PrimaryButton
                text={"Denied"}
                Primarystyle={"bg-danger border border-0 rounded rounded-4 px-2 lg-px-4"}
              />
            )}
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default ApprovedItem;

