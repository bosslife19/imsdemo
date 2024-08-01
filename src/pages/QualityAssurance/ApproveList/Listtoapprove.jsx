import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import PrimaryButton from '../../../components/Button/PrimaryButton';
import inventoryListImage from '../../../assets/bigIcon/inventoryList.png';

const ApprovalListPage = ({ users, handleApprovalDetail }) => {
  return (
    <Container className="ListContainer mb-5">
      {users.map((user) => (
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
          <Col xs={3} md={2} sm={3} lg={2} className="">
            <PrimaryButton
              text={"View"}
              Primarystyle={"quailtyListViewButton rounded rounded-4 px-3 lg-px-4"}
              clickEvent={() => handleApprovalDetail()}
            />
          </Col>
          <Col xs={5} md={3} sm={4} lg={3} className="d-flex justify-content-end gap-2 ">
            <PrimaryButton
              text={"Approve"}
              Primarystyle={"bg-success border border-0 rounded rounded-4 px-2 lg-px-3"}
            />
            <PrimaryButton
              text={"Deny"}
              Primarystyle={"bg-danger border border-0 rounded rounded-4 px-2 lg-px-3"}
              clickEvent={""}
            />
          </Col>
        </Row>
      ))}
    </Container>
  );
};

export default ApprovalListPage;
