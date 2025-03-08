import React, { useEffect } from "react";
import { AppBar, Box, Toolbar, Typography, Button } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import {useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../redux/features/authentication/authSlice";
import AppRoutes from "../../navigation/appRoutes";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/authentication/authSlice"; // ✅ Correct Import

const Header = () => {
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: theme.spacing(2),
    width: "auto",
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    width: "100%",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  }));
  const userData = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // ✅ Ensure user data is removed
    localStorage.removeItem("token"); 
    dispatch(logout()); // Clear user state
    navigate(AppRoutes.LOGIN, { replace: true }); // Redirect to login
  };
  return (
    <Box>
      {/* Header is fixed at the top */}
      <AppBar position="fixed" sx={{ backgroundColor: "#3f51b5" }}>
        <Toolbar>
          <ShoppingCartIcon sx={{ mr: 1 }} />
          <Typography variant="h6" noWrap component="div">
            E-Shop
          </Typography>

          <Search sx={{ flexGrow: 2 }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search..."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <Link
            to={AppRoutes.HOME}
            style={{
              textDecoration: "none",
              color: "white",
              marginLeft: "16px",
            }}
          >
            Home
          </Link>

          {userData?.roles[0] === "ADMIN" && (
            <Link
              to={AppRoutes.ADDPRODUCT}
              style={{
                textDecoration: "none",
                color: "white",
                marginLeft: "16px",
              }}
            >
              Add Product
            </Link>
          )}
          {userData ? (
            <Button
              variant="contained"
              href="#login"
              sx={{
                ml: 2,
                backgroundColor: "#ff0266",
                "&:hover": { backgroundColor: "#e6005c" },
              }}
              onClick={handleLogout}
            >
              LOGOUT
            </Button>
          ) : (
            <Button
              variant="contained"
              href="#login"
              sx={{
                ml: 2,
                backgroundColor: "#ff0266",
                "&:hover": { backgroundColor: "#e6005c" },
              }}
            >
              LOGIN
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
