import React, { useContext, useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { colors } from "../../assets";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { enqueueSnackbar } from "notistack";
import { snackbarBaseOptions } from "../../utils/snackbar";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [authError, setAuthError] = useState();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!loginData.email) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      tempErrors.email = "Email is not valid";
      isValid = false;
    }

    if (!loginData.password) {
      tempErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError(null);
    if (validate()) {
      try {
        console.log("Login data:", loginData);
        const res = await login(loginData.email, loginData.password);
        console.log("LOGIN RESPONSE >> ", res);
        navigate("/");
      } catch (err) {
        console.log("LOGIN ERROR >> ", err);
        setAuthError("Invalid credentials");
      }
    } else {
      enqueueSnackbar("Both email and password are required to proceed", {
        variant: "error",
        ...snackbarBaseOptions,
      });
    }
  };

  return (
    <div className="formContainer">
      <Box sx={{ width: "300px", margin: "100px auto", padding: "20px" }}>
        <Typography
          variant="h4"
          sx={{ margin: "auto", textAlign: "center" }}
          gutterBottom
        >
          Login
        </Typography>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            label="Password"
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{
              bgcolor: colors.primary,
              "&:hover": {
                opacity: 0.9,
                bgcolor: colors.primary,
              },
            }}
            fullWidth
          >
            Login
          </Button>
          {authError && (
            <div className="authError">
              <p>{authError}</p>
            </div>
          )}
        </form>
      </Box>
    </div>
  );
}

export default Login;
