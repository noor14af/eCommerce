import React from "react";
import Header from "../../components/header";
import Login from "../../components/logIn";
import Register from "../../components/signup";
import { useContext } from "react";
import { RegisterContext } from "../../context/RegisterContext";
import Product from "../../components/product";
import SortingCategories from "../../components/sortingCategories";
import CategoriesTab from "../../components/categoriesTab";
import ProductDetails from "../../components/productDetails";
const Home = () => {
  const registerState = useContext(RegisterContext);
  return (
    <>
      <CategoriesTab />
      <SortingCategories />
      <Product />
    </>
  );
};

export default Home;
