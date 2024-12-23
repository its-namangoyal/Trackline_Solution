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
import { useNavigate } from "react-router-dom";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import "./RegisterVehicle.css";
import { registerVehicle } from "../../api/vehicle";
import { getAllUsers } from "../../api/users";
import { enqueueSnackbar } from "notistack";
import { snackbarBaseOptions } from "../../utils/snackbar";

function RegisterVehicle() {
  const [vehicleData, setVehicleData] = useState({
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

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const usersList = await getAllUsers();
      setUsers(usersList);
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData({
      ...vehicleData,
      [name]: value,
    });
  };

  const getYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = 1990; year <= currentYear; year++) {
      years.push(year);
    }
    return years;
  };

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!vehicleData.company) {
      tempErrors.company = "Company is required";
      isValid = false;
    }

    if (!vehicleData.make) {
      tempErrors.make = "Make is required";
      isValid = false;
    }

    if (!vehicleData.yearOfManufacture) {
      tempErrors.yearOfManufacture = "Year of Manufacture is required";
      isValid = false;
    } else if (!/^\d{4}$/.test(vehicleData.yearOfManufacture)) {
      tempErrors.yearOfManufacture =
        "Year of Manufacture should be a valid year";
      isValid = false;
    }

    if (!vehicleData.vehicleRegistrationNo) {
      tempErrors.vehicleRegistrationNo = "Registration Number is required";
      isValid = false;
    }

    if (!vehicleData.fuelType) {
      tempErrors.fuelType = "Fuel Type is required";
      isValid = false;
    }

    if (!vehicleData.owner) {
      tempErrors.owner = "Owner is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      try {
        await registerVehicle(vehicleData);
        enqueueSnackbar("Vehicle registered successfully", {
          variant: "success",
          ...snackbarBaseOptions,
        });
        navigate("/vehicles");
      } catch (error) {
        enqueueSnackbar("An error occured while adding vehicle", {
          variant: "error",
          ...snackbarBaseOptions,
        });
        console.log("Error adding vehicle: ", error);
      } finally {
        setLoading(false);
      }
    } else {
      enqueueSnackbar("Please add required fields to proceed", {
        variant: "error",
        ...snackbarBaseOptions,
      });
    }
  };

  return (
    <Page>
      <div className="pageHeader">
        <h1>Register Vehicle</h1>
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
                value={vehicleData.company}
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
                value={vehicleData.make}
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
                  value={vehicleData.yearOfManufacture}
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
              </FormControl>
              {errors.yearOfManufacture && (
                <Typography variant="caption" color="error">
                  {errors.yearOfManufacture}
                </Typography>
              )}
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Registration Number"
                name="vehicleRegistrationNo"
                value={vehicleData.vehicleRegistrationNo}
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
                  value={vehicleData.fuelType}
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
              </FormControl>
              {errors.fuelType && (
                <Typography variant="caption" color="error">
                  {errors.fuelType}
                </Typography>
              )}
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth error={!!errors.owner}>
                <InputLabel id="owner-label">Owner</InputLabel>
                <Select
                  labelId="owner-label"
                  id="owner"
                  name="owner"
                  value={vehicleData.owner}
                  onChange={handleChange}
                  sx={{
                    borderRadius: "12px",
                  }}
                >
                  {users.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {`${user.firstName} ${user.lastName}`}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {errors.owner && (
                <Typography variant="caption" color="error">
                  {errors.owner}
                </Typography>
              )}
            </Grid>
          </Grid>
          <div className="registerButton">
            <Button
              type="submit"
              variant="outlined"
              sx={{
                color: "white",
                bgcolor: colors.primary,
                borderRadius: "10px",
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
                "Register Vehicle"
              )}
            </Button>
          </div>
        </form>
      </div>
    </Page>
  );
}

export default RegisterVehicle;
