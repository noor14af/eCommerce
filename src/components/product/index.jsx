import React, { useState, useEffect, useContext } from "react";
import CategoriesTab from "../categoriesTab/index.jsx";
import SortingCategories from "../sortingCategories/index.jsx";
import { Stack, Box } from "@mui/material";
import CardComponent from "../../common/cardComponent/CardComponent.jsx";
import { CategoriesContext } from "../../context/CategoriesContext";
import baseUrl from "../../baseUrl/BaseUrl.jsx";
const Product = () => {
  const [productData, setProductData] = useState([]);

  const { categoryValue, setCategoryValue } = useContext(CategoriesContext);
  async function getData() {
    const url = `${baseUrl}/products?category=${categoryValue}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const jsonData = await response.json();
      setProductData(jsonData);
      console.log(json);
    } catch (error) {
      console.error(error?.message);
    }
  }

  useEffect(() => {
    getData();
  }, [categoryValue]);
  return (
    <>
      <CardComponent productData={productData} />
    </>
  );
};

export default Product;
