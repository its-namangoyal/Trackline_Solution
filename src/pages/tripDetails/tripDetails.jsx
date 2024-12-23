import React, { useEffect, useState } from "react";
import Page from "../../layouts/Page/Page";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { colors } from "../../assets";
import { getTripDetails } from "../../api/trips";
import TripMap from "../../components/TripMap/TripMap.jsx";

function TripDetails() {
  const navigate = useNavigate();
  const { ownerId, vehicleId, tripId } = useParams();
  const [trip, setTrip] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTripDetails = async (ownerId, vehicleId, tripId) => {
      try {
        setLoading(true);
        const tripDetails = await getTripDetails(ownerId, vehicleId, tripId);
        console.log("  >>> ", tripDetails);
        setTrip(tripDetails);
      } catch (err) {
        console.log(err);
        throw err;
      } finally {
        setLoading(false);
      }
    };
    fetchTripDetails(ownerId, vehicleId, tripId);
  }, []);

  return (
    <Page>
      <div className="pageHeader">
        <h1>Trip Details</h1>
        <div className="headerActions">
          <Button
            sx={{
              bgcolor: colors.primary,
              borderRadius: "10px",
              "&:hover": {
                opacity: 0.9,
                bgcolor: colors.primary,
              },
            }}
            variant="contained"
            // startIcon={<AddIcon />}
            onClick={() => navigate("/trips")}
          >
            Show All Trips
          </Button>
        </div>
      </div>

      <p>You can view your trip details once this feature is ready...</p>

      <h3>Trip Map</h3>
      {trip && (
        <TripMap
          encodedString={trip?.encodedPoints}
          startingAddress={trip.startingAddress}
          endingAddress={trip.endingAddress}
        />
      )}
    </Page>
  );
}

export default TripDetails;
