import React, { Suspense, useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AppRoutes from "./appRoutes";
import { Login, SignUp, Home, ProductDetails } from "./ScreenContainer/AuthLoad";
import Spinner from "../components/loader/Spinner";
import { RegisterContext } from "../context/RegisterContext";
import { useSelector, useDispatch } from "react-redux";
import { login, selectUser } from "../redux/features/authentication/authSlice";
import { AddProduct } from "./ScreenContainer/AuthLoad"
import { useNavigate } from "react-router-dom";
import AddressDetails from "../components/addressDetails";
// import ProductDetails from "../components/productDetails";



const Application = () => {
  const navigate = useNavigate();
  const isRegister = useContext(RegisterContext);
  const userData = useSelector(selectUser);
  const dispatch = useDispatch();


  // ✅ Restore user session on page reload
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      dispatch(login(storedUser)); // Restore user to Redux state
    }
  }, [dispatch]);
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        {/* Redirect to home if user is already logged in */}
        {!userData ? (
          <>
            <Route path={AppRoutes.LOGIN} element={<Login />} />
            <Route path={AppRoutes.SIGNUP} element={<SignUp />} />
          </>
        ) : (
          <>
            <Route path={AppRoutes.HOME} element={<Home />} />
            <Route
              path={AppRoutes.ADDPRODUCT}
              element={
                userData?.roles.includes("ADMIN") ? (
                  <AddProduct />
                ) : (
                  <navigate to={AppRoutes.HOME} replace />
                )
              }
            />
          </>
        )}
        {/* Redirect all other routes to login if not authenticated */}
        <Route path="*" element={<navigate to={userData ? AppRoutes.HOME : AppRoutes.LOGIN} replace />} />
        <Route path={AppRoutes.PRODUCTDETAILS} element={<ProductDetails />} />
        <Route path={AppRoutes.ADDRESSDETAILS} element={<AddressDetails />} />

      </Routes>
    </Suspense>
  );
};

export default Application;
