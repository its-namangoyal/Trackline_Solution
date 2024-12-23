import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";
import { useSpring, animated } from "@react-spring/web"; // Import useSpring and animated
import "bootstrap/dist/css/bootstrap.min.css";
import "./dashboard.css";
import Page from "../../layouts/Page/Page";
import TripsChart from "../../components/TripsChart/TripsChart";
import RecentTrip from "../../components/RecentTrip/RecentTrip";

const Dashboard = () => {
  // Define animations for each card
  const [tripsAnimation] = useSpring(() => ({
    number: 1200,
    from: { number: 0 },
    config: { duration: 2000 },
  }));

  const [vehicleAnimation] = useSpring(() => ({
    number: 4,
    from: { number: 0 },
    config: { duration: 2000 },
  }));

  const [usersAnimation] = useSpring(() => ({
    number: 6,
    from: { number: 0 },
    config: { duration: 2000 },
  }));

  const [milesAnimation] = useSpring(() => ({
    number: 103430,
    from: { number: 0 },
    config: { duration: 2000 },
  }));

  return (
    <Page>
      <Container className="dashboard">
        <main className="main-content">
          <div className="pageHeader">
            <h1 className="page-title">
              Welcome to your <i>Track</i>board!
            </h1>
            <div className="headerActions"></div>
          </div>
          {/* <h1 className="page-title">
            Welcome to your <i>Track</i>board!
          </h1> */}
          <Row>
            {[
              {
                title: "Total trips",
                value: "1200",
                change: "+278 in last month",
                icon: "Trips",
                color: "primary",
                animation: tripsAnimation,
                format: (n) =>
                  `${n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
              },
              {
                title: "Total Vehicle",
                value: "20",
                change: "+3 in last month",
                icon: "Vehicles",
                color: "success",
                animation: vehicleAnimation,
                format: (n) =>
                  `${n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
              },
              {
                title: "Users",
                value: "12",
                change: "+2 in last month",
                icon: "Users",
                color: "warning",
                animation: usersAnimation,
                format: (n) => `${n.toFixed(1)}`,
              },
              {
                title: "Total miles",
                value: "103,430",
                change: "+2500 in last month",
                icon: "Distance",
                color: "danger",
                animation: milesAnimation,
                format: (n) =>
                  `${n.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`,
              },
            ].map((card, index) => (
              <Col xs={12} md={3} key={index} className="mb-4">
                <Card
                  className={`h-100 shadow-sm border-0 rounded-lg card-${card.color}`}
                >
                  <CardBody className="text-center">
                    <div
                      className={`card-header header-rounded card-bg-${"trips"} bg-${
                        card.color
                      } text-white mb-3`}
                    >
                      <span className={`material-icons card-icon`}>
                        {card.icon}
                      </span>
                    </div>
                    <CardTitle tag="h6" className="card-title">
                      {card.title}
                    </CardTitle>
                    <animated.h4 className="card-value">
                      {card.animation.number.to(card.format)}
                    </animated.h4>
                    <CardText className={`card-change text-${card.color}`}>
                      {card.change}
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
          <div className="dashboardChartsContainer">
            <div className="lineChartContainerWrap">
              <TripsChart />
            </div>
            <div className="recentTripMap">
              <RecentTrip />
            </div>
          </div>
        </main>
      </Container>
    </Page>
  );
};

export default Dashboard;
