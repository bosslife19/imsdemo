import React, {useState} from 'react'
import { Container} from "react-bootstrap";
import NavigationHeader from '../Navigations/NavigationHeader';
import TitleHeader from '../Headers/TitleHeader';
import NonAvaliable from '../NonAvaliable/NonAvaliable';
import ConditionalSideNavigation from '../Navigations/ConditionalSideNavigation';

function NotificationDisplay() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        <NonAvaliable textMessage={'Sorry, you currently have no notifications, please check back later!'}/>
      </Container>
    </div>
  </div>
  )
}

export default NotificationDisplay