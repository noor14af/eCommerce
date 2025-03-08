import React, { useEffect, useState, useContext } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Box } from "@mui/material";
import { CategoriesContext } from "../../context/CategoriesContext";
import baseUrl from "../../baseUrl/BaseUrl";

const CategoriesTab = () => {
  const [alignment, setAlignment] = useState("ALL");
  const { categoryValue, setCategoryValue, categories, setCategories } =
    useContext(CategoriesContext);

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      setCategoryValue(newAlignment);
    }
  };

  useEffect(() => {
    console.log("Updated categoryValue:", categoryValue);
  }, [categoryValue]); // Logs when categoryValue updates

  async function getData() {
    const url = `${baseUrl}/products/categories`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const jsonData = await response.json();
      setCategories(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <Box sx={{ mt: 8 }}>
      <ToggleButtonGroup
        value={alignment}
        exclusive
        onChange={handleAlignment}
        aria-label="category selection"
        sx={{ textTransform: "uppercase" }}
      >
        <ToggleButton value="all" aria-label="all">
          All
        </ToggleButton>
        {categories.map((item) => (
          <ToggleButton key={item} value={item} aria-label={item}>
            {item}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
};

export default CategoriesTab;
