import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

function Signup() {
  const [signupData, setSignupData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value
    });
  };

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!signupData.firstName) {
      tempErrors.firstName = "First Name is required";
      isValid = false;
    }

    if (!signupData.lastName) {
      tempErrors.lastName = "Last Name is required";
      isValid = false;
    }

    if (!signupData.email) {
      tempErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      tempErrors.email = "Email is not valid";
      isValid = false;
    }

    if (!signupData.password) {
      tempErrors.password = "Password is required";
      isValid = false;
    }

    if (!signupData.phoneNumber) {
      tempErrors.phoneNumber = "Phone Number is required";
      isValid = false;
    } else if (!/^\d+$/.test(signupData.phoneNumber)) {
      tempErrors.phoneNumber = "Phone Number should contain only digits";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log('Form data:', signupData);
      // Here you can add your form submission logic
    }
  };

  return (
    <Box sx={{ width: '300px', margin: '0 auto', padding: '20px' }}>
      <Typography variant="h4" gutterBottom>Signup</Typography>
      <form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          name="firstName"
          value={signupData.firstName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={signupData.lastName}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.lastName}
          helperText={errors.lastName}
        />
        <TextField
          label="Email"
          name="email"
          value={signupData.email}
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
          value={signupData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.password}
          helperText={errors.password}
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          value={signupData.phoneNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={!!errors.phoneNumber}
          helperText={errors.phoneNumber}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>Signup</Button>
      </form>
    </Box>
  );
};

export default Signup;
