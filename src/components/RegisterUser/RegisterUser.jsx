import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  CircularProgress, // Import CircularProgress component
} from "@mui/material";
import Page from "../../layouts/Page/Page";
import { colors } from "../../assets";
import { useNavigate } from "react-router-dom";
import GroupIcon from "@mui/icons-material/Group";
import "./RegisterUser.css";
import { registerUser } from "../../api/auth";
import { enqueueSnackbar } from "notistack";
import { snackbarBaseOptions } from "../../utils/snackbar.js";

function RegisterUser() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false); // State for loading indicator

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!userData.firstName) {
      tempErrors.firstName = "First Name is required";
      isValid = false;
    }

    if (!userData.lastName) {
      tempErrors.lastName = "Last Name is required";
      isValid = false;
    }

    if (!userData.email) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      tempErrors.email = "Email is not valid";
      isValid = false;
    }

    if (!userData.password) {
      tempErrors.password = "Password is required";
      isValid = false;
    }

    if (!userData.role) {
      tempErrors.role = "Role is required";
      isValid = false;
    }

    if (!userData.phoneNumber) {
      tempErrors.phoneNumber = "Phone Number is required";
      isValid = false;
    } else if (!/^\d+$/.test(userData.phoneNumber)) {
      tempErrors.phoneNumber = "Phone Number should contain only digits";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setLoading(true);
      const user = await registerUser(userData);
      setLoading(false);
      enqueueSnackbar("User registered", {
        variant: "success",
        ...snackbarBaseOptions,
      });
      if (user?.uid) {
        navigate("/users");
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
        <h1>Register User</h1>
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
            startIcon={<GroupIcon />}
            onClick={() => navigate("/users")}
          >
            View all Users
          </Button>
        </div>
      </div>
      <div className="formCard">
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                sx={{ "&:focus": { border: colors.primary } }}
                label="First Name"
                name="firstName"
                value={userData.firstName}
                onChange={handleChange}
                fullWidth
                error={!!errors.firstName}
                helperText={errors.firstName}
                InputProps={{
                  style: {
                    borderRadius: "12px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Last Name"
                name="lastName"
                value={userData.lastName}
                onChange={handleChange}
                fullWidth
                error={!!errors.lastName}
                InputProps={{
                  style: {
                    borderRadius: "12px",
                  },
                }}
                helperText={errors.lastName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                fullWidth
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  style: {
                    borderRadius: "12px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Password"
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                fullWidth
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  style: {
                    borderRadius: "12px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={handleChange}
                fullWidth
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
                InputProps={{
                  style: {
                    borderRadius: "12px",
                  },
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth error={!!errors.role}>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  name="role"
                  value={userData.role}
                  onChange={handleChange}
                  sx={{
                    borderRadius: "12px", // Set your custom border radius here
                  }}
                >
                  <MenuItem value="Admin">Admin</MenuItem>
                  <MenuItem value="Driver">Driver</MenuItem>
                </Select>
              </FormControl>
              {errors.role && (
                <Typography variant="caption" color="error">
                  {errors.role}
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
              disabled={loading} // Disable button when loading
            >
              {loading ? (
                <CircularProgress sx={{ color: "white" }} size={24} />
              ) : (
                "Register User"
              )}{" "}
              {/* Show loading icon when loading */}
            </Button>
          </div>
        </form>
      </div>
    </Page>
  );
}

export default RegisterUser;
