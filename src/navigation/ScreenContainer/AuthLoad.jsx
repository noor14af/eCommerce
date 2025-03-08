import React, { lazy } from "react";

// Lazy load components
export const Login = lazy(() => import("../../components/logIn"));
export const SignUp = lazy(() => import("../../components/signup"));
export const Home = lazy(() => import("../../common/home"));
export const AddProduct = lazy(() => import("../../components/addProduct"));
export const ProductDetails = lazy(() => import("../../components/productDetails"));
export const AddressDetails = lazy(()=>import("../../components/addressDetails"))

