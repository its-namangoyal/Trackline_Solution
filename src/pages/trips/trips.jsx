import Page from "../../layouts/Page/Page";
import { getAllTrips } from "../../api/trips";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "./trips.css";
import { enqueueSnackbar } from "notistack";
import { snackbarBaseOptions } from "../../utils/snackbar";
import { Fade } from "@mui/material";

import TableLoadingSpinner from "../../components/TableLoadingSpinner/TableLoadingSpinner";
import { useNavigate } from "react-router-dom";

const Trips = () => {
  const navigate = useNavigate();
  const [trips, setTrips] = useState([]);
  const [loadingTrips, setLoadingTrips] = useState(false);

  const columnNames = [
    "Owner Name",
    "Duration",
    "Starting Addres",
    "Start Time",
    "Ending Address",
    "End Time",
    "Vehicle Name",
  ];

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      setLoadingTrips(true);
      const trips = await getAllTrips();
      console.log(">>> TRIPS >> ", trips);
      setTrips(trips);
    } catch (err) {
      console.log(err);
      enqueueSnackbar("An error occured while fetching trips", {
        variant: "error",
        ...snackbarBaseOptions,
      });
    } finally {
      setLoadingTrips(false);
    }
  };

  return (
    <Page>
      <div className="pageHeader">
        <h1 className="page-title">Trips</h1>
        <div className="headerActions"></div>
      </div>
      <TableContainer>
        <Table
          className="vehicle-table"
          sx={{ backgroundColor: "white", minWidth: 650 }}
        >
          <TableHead>
            <TableRow>
              {columnNames?.map((cell, index) => (
                <TableCell key={index}>{cell}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loadingTrips ? (
              <TableLoadingSpinner />
            ) : (
              trips.map((trip) => (
                <Fade key={trip.id} in={!loadingTrips} timeout={1000}>
                  <TableRow
                    sx={{ cursor: "pointer" }}
                    onClick={() =>
                      navigate(
                        `/trips/${trip.ownerId}/${trip.vehicleId}/${trip.id}`
                      )
                    }
                  >
                    <TableCell>{trip.ownerName}</TableCell>
                    <TableCell>{trip.duration}</TableCell>
                    <TableCell>{trip.startingAddress}</TableCell>

                    <TableCell>
                      {new Date(
                        trip.startingTime.seconds * 1000 +
                          trip.startingTime.seconds / 1000000
                      ).toLocaleString()}
                    </TableCell>
                    <TableCell>{trip.endingAddress}</TableCell>
                    <TableCell>
                      {new Date(
                        trip.endingTime.seconds * 1000 +
                          trip.endingTime.seconds / 1000000
                      ).toLocaleString()}
                    </TableCell>

                    <TableCell>{trip.company}</TableCell>
                  </TableRow>
                </Fade>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Page>
  );
};

export default Trips;
