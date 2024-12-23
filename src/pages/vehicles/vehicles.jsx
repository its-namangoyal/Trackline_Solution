import Page from "../../layouts/Page/Page";

import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import "./vehicles.css";
import AddIcon from "@mui/icons-material/Add";
import { Button, Fade } from "@mui/material";
import { colors } from "../../assets";
import { useNavigate } from "react-router-dom";
import { deleteVehicle, getAllVehicles } from "../../api/vehicle";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { enqueueSnackbar } from "notistack";
import { snackbarBaseOptions } from "../../utils/snackbar";
import TableLoadingSpinner from "../../components/TableLoadingSpinner/TableLoadingSpinner";

const Vehicle = () => {
  const navigate = useNavigate();

  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);

  const columnNames = [
    "Make",
    "Company",
    "Registration Number",
    "Fuel Type",
    "Year of Manufacture",
    "Owner",
    "Total Trips",
    "",
  ];

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const res = await getAllVehicles();
      setVehicles(res);
    } catch (err) {
      enqueueSnackbar("An error occured while fetching vehicles", {
        variant: "error",
        ...snackbarBaseOptions,
      });
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteVehicle = async (ownerId, vehicleId) => {
    try {
      await deleteVehicle(ownerId, vehicleId);
      enqueueSnackbar("Vehicle deleted successfully", {
        variant: "success",
        ...snackbarBaseOptions,
      });
      await fetchVehicles();
    } catch (error) {
      console.error(error);
      enqueueSnackbar("An error occured while deleting vehicle", {
        variant: "error",
        ...snackbarBaseOptions,
      });
    }
  };

  return (
    <Page>
      <div className="pageHeader">
        <h1 className="page-title">Vehicles</h1>
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
            startIcon={<AddIcon />}
            onClick={() => navigate("/vehicles/register")}
          >
            New Vehicle
          </Button>
        </div>
      </div>
      <TableContainer>
        <Table
          className="vehicle-table"
          sx={{ backgroundColor: "white", minWidth: 650 }}
        >
          <TableHead>
            <TableRow>
              {columnNames?.map((col, index) => (
                <TableCell key={index}>{col}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableLoadingSpinner />
            ) : (
              vehicles.map((vehicle) => (
                <Fade key={vehicle.id} in={!loading} timeout={1000}>
                  <TableRow
                    onClick={() =>
                      navigate(`/vehicles/${vehicle.id}/${vehicle.ownerId}`)
                    }
                  >
                    <TableCell>{vehicle.make}</TableCell>
                    <TableCell>{vehicle.company}</TableCell>
                    <TableCell>{vehicle.vehicleRegistrationNo}</TableCell>
                    <TableCell>{vehicle.fuelType}</TableCell>
                    <TableCell>{vehicle.yearOfManufacture}</TableCell>
                    <TableCell>{vehicle.ownerName}</TableCell>
                    <TableCell>{vehicle.vehicleTotalTrips}</TableCell>
                    <TableCell>
                      <DeleteOutlineIcon
                        sx={{ color: "red", cursor: "pointer" }}
                        onClick={() =>
                          handleDeleteVehicle(vehicle?.ownerId, vehicle?.id)
                        }
                      />
                    </TableCell>
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

export default Vehicle;
