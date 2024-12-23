import React, { useEffect, useState } from "react";
import { Col, Card, CardBody, CardTitle, CardText } from "reactstrap";
import { ResponsiveContainer } from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";
import { getTripDetails } from "../../api/trips";
import TripMap from "../TripMap/TripMap.jsx";

function RecentTrip() {
  const [trip, setTrip] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTripDetails = async (ownerId, vehicleId, tripId) => {
      try {
        setLoading(true);
        const tripDetails = await getTripDetails(ownerId, vehicleId, tripId);
        setTrip(tripDetails);
      } catch (err) {
        console.log(err);
        throw err;
      } finally {
        setLoading(false);
      }
    };
    fetchTripDetails(
      "pTPH2gI95MWmL2QCzuQEH7FGRfA2",
      "Timestamp(seconds=1717013622, nanoseconds=343575000)",
      "Timestamp(seconds=1717017413, nanoseconds=289399000)"
    );
  }, []);
  return (
    <Col xs={12} className="mb-4">
      <Card className="h-100 shadow-sm border-0 rounded-lg">
        <CardBody>
          <CardTitle tag="h6" className="mb-3">
            Recent trip
          </CardTitle>
          {/* <CardText className="text-muted mb-4">
            +4% more than previous year
          </CardText> */}
          <div className="chart-container">
            {trip && (
              <TripMap
                encodedString={trip?.encodedPoints}
                startingAddress={trip.startingAddress}
                endingAddress={trip.endingAddress}
              />
            )}
          </div>
        </CardBody>
      </Card>
    </Col>
  );
}

export default RecentTrip;
