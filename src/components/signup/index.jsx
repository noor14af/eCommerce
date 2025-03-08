import React, { useContext, useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { styled } from "@mui/material/styles";
import { RegisterContext } from "../../context/RegisterContext";
import RegisterApi from "../../api/registerApi/RegisterApi"; // Styled component using Material-UI v5
import baseUrl from "../../baseUrl/BaseUrl";
import axios from "axios";
import { Link } from "react-router-dom";
import AppRoutes from "../../navigation/appRoutes";
const Root = styled(Box)(({ theme }) => ({
  width: "100vw",
  height: "100vh",
  marginTop: "70px",
  padding: "0",
  overflow: "hidden", // Prevent scrolling
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  bottom: "50px",
  boxSizing: "border-box",
  ".form": {
    width: "100%",
    maxWidth: "400px",
    display: "flex",
    flexDirection: "column",
  },

  ".submit": {
    margin: theme.spacing(2, 0, 1),
  },

  ".lock-icon": {
    backgroundColor: "#eb3492",
    color: "#fff",
    borderRadius: "50%",
    padding: "5px",
    fontSize: "30px",
  },
}));

const Signup = () => {
  const { setErrorMessage, errorMessage } = useContext(RegisterContext);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passWordError, setPasswordError] = useState("");
  const [contactError, setContactError] = useState("");

  // const handleSignInClick = (e) => {
  //   e.preventDefault(); // ✅ Fixed typo here
  //   registerState.setIsSignUp(false);
  // };
  const validateEmail = () => {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailError("");
      return true;
    }
    setEmailError("You are writing invalid email address!");
    return false;
  };

  const validatePhone = () => {
    if (contactNumber.match("^[0-9]{10}$")) {
      setContactError("");
      return true;
    }
    setContactError("Please provide a valid phone number");

    return false;
  };
  //form field handleChange
  const handleChange = (e) => {
    if (e?.target?.name === "fName") {
      setFName(e?.target?.value);
    }
    if (e?.target?.name === "lName") {
      setLName(e?.target?.value);
    }
    if (e?.target?.name === "email") {
      setEmail(e?.target?.value);
    }
    if (e?.target?.name === "password") {
      setPassWord(e?.target?.value);
    }
    if (e?.target?.name === "confirmPassword") {
      setConfirmPassword(e?.target?.value);
    }
    if (e?.target?.name === "contactNumber") {
      setContactNumber(e?.target?.value);
    }
  };
  //password validation
  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long!");
      return false;
    }
    setPasswordError("");
    return true;
  };
  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isPasswordValid = validatePassword();

    if (!isEmailValid || !isPhoneValid || !isPasswordValid) return;

    if (password !== confirmPassword) {
      setPasswordError("Confirm Passwords do not match!");
      return;
    }
    setPasswordError("");

    // Proceed with form submission
    const formData = {
      email,
      password,
      firstName: fName,
      role: ["user"],
      lastName: lName,
      contactNumber,
    };

    try {
      const response = await RegisterApi.addUser(formData);
      if (response.status === 201) {
        alert("Registration successful!");
        setIsSignUp(false);
      } else {
        setErrorMessage(response?.data?.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setErrorMessage(
        error?.response?.data?.message || "Something went wrong!"
      );
    }
  };
  return (
    <Root component="main">
      {/* Lock Icon */}
      <LockIcon className="lock-icon" sx={{ mt: 4 }} />

      {/* Heading */}
      <Typography variant="h6" component="div" gutterBottom>
        Sign Up
      </Typography>

      {/* Form */}
      <Typography component="div" sx={{ color: "red" }}>
        {errorMessage}
      </Typography>
      <form noValidate className="form" onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="fName"
          value={fName}
          label="First Name"
          name="fName"
          autoComplete="given-name"
          autoFocus
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="lName"
          value={lName}
          label="Last Name"
          name="lName"
          autoComplete="family-name"
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          value={email}
          label="Email Address"
          name="email"
          autoComplete="email"
          onChange={handleChange}
        />
        <span style={{ color: "red" }}>{emailError}</span>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          value={password}
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          onChange={handleChange}
        />
        <span style={{ color: "red" }}>{passWordError}</span>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="confirmPassword"
          value={confirmPassword}
          label="Confirm Password"
          type="password"
          id="confirmPassword"
          autoComplete="new-password"
          onChange={handleChange}
        />
        <span style={{ color: "red" }}>{passWordError}</span>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="contactNumber"
          value={contactNumber}
          label="Contact Number"
          type="text"
          id="contactNumber"
          autoComplete="tel"
          onChange={handleChange}
        />
        <span style={{ color: "red" }}>{contactError}</span>

        {/* Submit Button */}
        <Button type="submit" fullWidth variant="contained" className="submit">
          Sign Up
        </Button>

        {/* Sign In Link */}
        <Link
          to={AppRoutes.LOGIN}
          variant="body2"
          sx={{ display: "block", ml: 20 }}
          // onClick={handleSignInClick}
        >
          Already have an account? Sign In
        </Link>
      </form>
    </Root>
  );
};

export default Signup;
