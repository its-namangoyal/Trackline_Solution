import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  CircularProgress,
} from "@mui/material";
import Page from "../../layouts/Page/Page";
import { colors } from "../../assets";
import { useNavigate, useParams } from "react-router-dom";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import "./editVehicle.css";
import { enqueueSnackbar } from "notistack";
import { useSnackbar } from "notistack";
import { editVehicle, getAllUsers, fetchVehicleById } from "../../api/vehicle"; // updated import to include getAllUsers

const snackbarBaseOptions = {
  autoHideDuration: 3000,
  anchorOrigin: {
    vertical: "top",
    horizontal: "right",
  },
};

function EditVehicle() {
  const [vehiclesData, setVehiclesData] = useState({
    company: "",
    make: "",
    yearOfManufacture: "",
    vehicleRegistrationNo: "",
    fuelType: "",
    owner: "",
  });

  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { vehicleId, ownerId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVehicle = async () => {
      try {
        // Assuming you have a function to fetch a single vehicle by id
        const vehicle = await fetchVehicleById(ownerId, vehicleId); // Implement this function to fetch vehicle details
        console.log(vehicle);
        if (vehicle) {
          setVehiclesData({
            company: vehicle.company,
            make: vehicle.make,
            yearOfManufacture: vehicle.yearOfManufacture,
            vehicleRegistrationNo: vehicle.vehicleRegistrationNo,
            fuelType: vehicle.fuelType,
            owner: vehicle.ownerId,
          });
        } else {
          console.error(`Vehicle with id ${vehicleId} not found.`);
          // Handle case where vehicle is not found
        }
      } catch (error) {
        console.error("Error fetching vehicle:", error);
        // Handle error, e.g., show an error message
      }
    };

    fetchVehicle();
  }, [vehicleId]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersList = await getAllUsers();
      setUsers(usersList);
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehiclesData({
      ...vehiclesData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await editVehicle(vehiclesData.owner, vehicleId, {
        company: vehiclesData.company,
        make: vehiclesData.make,
        yearOfManufacture: vehiclesData.yearOfManufacture,
        vehicleRegistrationNo: vehiclesData.vehicleRegistrationNo,
        fuelType: vehiclesData.fuelType,
      });
      enqueueSnackbar("Vehicle edited successfully", {
        variant: "success",
        ...snackbarBaseOptions,
      });
      navigate("/vehicles");
    } catch (error) {
      enqueueSnackbar("An error occurred while editing the vehicle", {
        variant: "error",
        ...snackbarBaseOptions,
      });
      console.error("Failed to update vehicle:", error);
    } finally {
      setLoading(false);
    }
  };

  const getYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= 1900; year--) {
      years.push(year.toString());
    }
    return years;
  };

  return (
    <Page>
      <div className="pageHeader">
        <h1>Edit Vehicle</h1>
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
            startIcon={<DirectionsCarIcon />}
            onClick={() => navigate("/vehicles")}
          >
            View all Vehicles
          </Button>
        </div>
      </div>
      <div className="formCard">
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Company"
                name="company"
                value={vehiclesData.company}
                onChange={handleChange}
                fullWidth
                error={!!errors.company}
                helperText={errors.company}
                InputProps={{
                  style: {
                    borderRadius: "12px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Make"
                name="make"
                value={vehiclesData.make}
                onChange={handleChange}
                fullWidth
                error={!!errors.make}
                helperText={errors.make}
                InputProps={{
                  style: {
                    borderRadius: "12px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth error={!!errors.yearOfManufacture}>
                <InputLabel id="yearOfManufacture-label">
                  Year of Manufacture
                </InputLabel>
                <Select
                  labelId="yearOfManufacture-label"
                  id="yearOfManufacture"
                  name="yearOfManufacture"
                  value={vehiclesData.yearOfManufacture}
                  onChange={handleChange}
                  sx={{
                    borderRadius: "12px",
                  }}
                >
                  {getYearOptions().map((year) => (
                    <MenuItem key={year} value={year}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
                {errors.yearOfManufacture && (
                  <Typography variant="caption" color="error">
                    {errors.yearOfManufacture}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Registration Number"
                name="vehicleRegistrationNo"
                value={vehiclesData.vehicleRegistrationNo}
                onChange={handleChange}
                fullWidth
                error={!!errors.vehicleRegistrationNo}
                helperText={errors.vehicleRegistrationNo}
                InputProps={{
                  style: {
                    borderRadius: "12px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth error={!!errors.fuelType}>
                <InputLabel id="fuelType-label">Fuel Type</InputLabel>
                <Select
                  labelId="fuelType-label"
                  id="fuelType"
                  name="fuelType"
                  value={vehiclesData.fuelType}
                  onChange={handleChange}
                  sx={{
                    borderRadius: "12px",
                  }}
                >
                  <MenuItem value="Gasoline">Gasoline</MenuItem>
                  <MenuItem value="Electric">Electric</MenuItem>
                  <MenuItem value="Hybrid">Hybrid</MenuItem>
                  <MenuItem value="Diesel">Diesel</MenuItem>
                </Select>
                {errors.fuelType && (
                  <Typography variant="caption" color="error">
                    {errors.fuelType}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth error={!!errors.owner}>
                <InputLabel disabled={true} id="owner-label">
                  Owner
                </InputLabel>
                <Select
                  labelId="owner-label"
                  id="owner"
                  name="owner"
                  value={vehiclesData.owner}
                  onChange={handleChange}
                  sx={{
                    borderRadius: "12px",
                  }}
                  disabled={true}
                >
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {`${user.firstName} ${user.lastName}`}
                    </MenuItem>
                  ))}
                </Select>
                {errors.owner && (
                  <Typography variant="caption" color="error">
                    {errors.owner}
                  </Typography>
                )}
              </FormControl>
            </Grid>
          </Grid>
          <div className="editButton">
            <Button
              type="submit"
              variant="outlined"
              sx={{
                color: "white",
                bgcolor: colors.primary,
                borderRadius: "10px",
                marginTop: "10px",
                "&:hover": {
                  opacity: 0.9,
                  bgcolor: colors.primary,
                },
              }}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress sx={{ color: "white" }} size={24} />
              ) : (
                "Update Vehicle"
              )}
            </Button>
          </div>
        </form>
      </div>
    </Page>
  );
}

export default EditVehicle;
