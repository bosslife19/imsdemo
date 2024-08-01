import React, {useState} from 'react'
import axios from 'axios'
import { Container, Card, Row, Col} from "react-bootstrap";
import NavigationHeader from '../Navigations/NavigationHeader';
import TitleHeader from '../Headers/TitleHeader';
import NonAvaliable from '../NonAvaliable/NonAvaliable';

import ConditionalSideNavigation from '../Navigations/ConditionalSideNavigation';

function NotificationDisplay() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const baseUrl = process.env.REACT_APP_EDO_SUBEB_BASE_URL;
    const [notifications, setNotifications] = useState([])

    const getNotifications = async()=>{
      try {
        const res = await axios.get(`${baseUrl}/api/notification`)
        console.log(res.data)
        setNotifications(res.data.notifications);
      } catch (error) {
        console.log(error)
      }
      
    }
    const toggleSidebar = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  return (
    <div>
    <NavigationHeader toggleSidebar={toggleSidebar} />
    <div className="d-flex justify-content-between">
    <ConditionalSideNavigation isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <Container className="reportContainer">
        <TitleHeader text={"Notifications"} />
        {
          notifications ?( <Card.Body className="AdminRecentUser m-4 rounded">
            {notifications.map((log) => (
              <Row
                key={log.id}
                className="align-items-center mb-2 py-2 "
              >
                <Col xs={4} lg={2} sm={4} md={4}>
                  <span className="">{log.title}</span>
                </Col>
                <Col xs={4} lg={2} sm={4} md={4}>
                  <a
                    href="/"
                    className="text-decoration-none text-success"
                  >
                    {log.body}
                  </a>
                </Col>
               
                <Col
                  xs={2}
                  lg={2}
                  className="text-muted d-none d-lg-flex"
                >
                  {log.created_at}
                </Col>
                {/* <Col xs={4} lg={2} sm={4} md={4} className="text-muted">
                  {log.time}
                </Col> */}
              </Row>
            ))}
          </Card.Body>) :(
            <NonAvaliable textMessage={'Sorry, you currently have no notifications, please check back later!'}/>
          )
        }
        
      </Container>
    </div>
  </div>
  )
}

export default NotificationDisplay