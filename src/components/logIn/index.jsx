import { Box, Typography, TextField, Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import LockIcon from "@mui/icons-material/Lock";
import { styled } from "@mui/material/styles";
import { RegisterContext } from "../../context/RegisterContext";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  selectUser,
} from "../../redux/features/authentication/authSlice";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import AppRoutes from "../../navigation/appRoutes";
import baseUrl from "../../baseUrl/BaseUrl";
import { jwtDecode } from "jwt-decode";

// Styled component using Material-UI v5
const Root = styled(Box)(({ theme }) => ({
  width: "100vw", // Ensure it covers the whole screen
  margin: "0",
  padding: "0",
  overflow: "hidden", // Prevent scrolling
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  position: "fixed",
  top: "80px",
  left: "0",
  right: "0",

  ".form": {
    width: "100%", // Fix IE 11 issue
    maxWidth: "400px", // Control form width
    marginTop: theme.spacing(1),
  },

  ".submit": {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = () => {
  const registerState = useContext(RegisterContext);
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const dispatch = useDispatch();
  const userData = useSelector(selectUser);
  const navigate = useNavigate();
  const handleSignUpClick = (e) => {
    e.preventDefault(); // ✅ Fixed typo here
    // registerState.setIsSignUp(true);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`/api/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: userName, password: userPassword }),
      });
  
      if (!response.ok) {
        throw new Error("Login failed!");
      }
  
      // ✅ Parse JSON response only once
      const data = await response.json();
      console.log("Login Response Data:", data);
  
      // ✅ Extract token from response headers
      const token = response.headers.get("x-auth-token");
      console.log("Token:", token);
  
      if (!token) {
        throw new Error("Token not received from server.");
      }
  
      // ✅ Decode JWT
      const decodedToken = jwtDecode(token);
      console.log("Decoded Token:", decodedToken);
  
      // ✅ Store token in local storage or Redux
      localStorage.setItem("auth_token", token);
      dispatch(login({ ...data, token }));
  
      alert("Login Successful!");
      navigate(AppRoutes.HOME);
    } catch (error) {
      console.error("Login Error:", error);
      alert(error.message);
    }
  };
  
  

  useEffect(() => {
    console.log("userData", userData?.roles);
  }, [userData]);

  return (
    <Root component="main">
      <LockIcon
        sx={{
          backgroundColor: "#eb3492",
          color: "#fff",
          borderRadius: "50%",
          padding: "5px",
          fontSize: "30px", // Icon size
          marginBottom: "16px",
        }}
      />
      <Typography variant="h6" noWrap component="div" gutterBottom>
        Sign In
      </Typography>
      <span style={{ color: "red" }}>{registerState.errorMessage}</span>
      <form noValidate className="form" onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          value={userName}
          autoComplete="email"
          autoFocus
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          value={userPassword}
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={(e) => {
            setUserPassword(e.target.value);
          }}
        />
        <Button type="submit" fullWidth variant="contained" className="submit">
          Sign In
        </Button>

        <Link
          to={AppRoutes.SIGNUP}
          // onClick={handleSignUpClick}
          variant="body2"
          sx={{ mr: 22 }}
        >
          {"Don't have an account? Sign Up"}
        </Link>

        <Box mt={5} textAlign="center">
          {"Copyright © "}
          <Link href="https://www.upgrad.com" target="_blank" rel="noopener">
            upGrad
          </Link>{" "}
          {new Date().getFullYear()}
        </Box>
      </form>
    </Root>
  );
};

export default Login;
