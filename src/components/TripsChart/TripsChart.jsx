import React from "react";
import { Col, Card, CardBody, CardTitle, CardText } from "reactstrap";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";

const data = [
  { name: "Aug", Trips: 120 },
  { name: "Sep", Trips: 150 },
  { name: "Oct", Trips: 200 },
  { name: "Nov", Trips: 189 },
  { name: "Dec", Trips: 239 },
  { name: "Jan", Trips: 349 },
  { name: "Feb", Trips: 200 },
  { name: "Mar", Trips: 278 },
  { name: "Apr", Trips: 400 },
  { name: "May", Trips: 300 },
  { name: "Jun", Trips: 200 },
  { name: "Jul", Trips: 278 },
];

function TripsChart() {
  return (
    <div className="lineChartContainer">
      <Card className="h-100 shadow-sm border-0 rounded-lg">
        <CardBody>
          <CardTitle tag="h6" className="mb-3">
            Your trips in last year
          </CardTitle>
          <CardText className="text-muted mb-4">
            +4% more than previous year
          </CardText>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <Line
                  type="monotone"
                  dataKey="Trips"
                  stroke={"#1f7b7b"}
                  strokeWidth={4}
                />
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default TripsChart;
