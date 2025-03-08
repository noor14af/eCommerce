import React, { useContext, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box, Typography, TextField, Button, Link } from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import CreatableSelect from "react-select/creatable";
import { CategoriesContext } from "../../context/CategoriesContext";
import axios from "axios";
import { useLocation } from "react-router-dom";
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
const AddProduct = () => {
  const { categories } = useContext(CategoriesContext);
  const location = useLocation();
  const { id, mode } = location.state || {};
  console.log("categories===>", categories);
  const [proName, setProName] = useState("");
  const [category, setCategory] = useState("");
  const [manufacture, setManufacture] = useState("");
  const [itemQty, setItemQty] = useState(0);
  const [price, setPrice] = useState(0);
  const [imgUrl, setImgUrl] = useState("");
  const [description, setDescription] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") setProName(value);
    if (name === "category")
      setCategory(selectedOption ? selectedOption.value : "");
    if (name === "manufacture") setManufacture(value);
    if (name === "itemsQty") setItemQty(Number(value));
    if (name === "price") setPrice(Number(value));
    if (name === "imageUrl") setImgUrl(value);
    if (name === "description") setDescription(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formValue = {
      name: proName,
      category,
      price: Number(price),
      description,
      manufacturer: manufacture,
      quantity: Number(itemQty),
      imageUrl: imgUrl,
    };

    console.log("Submitting form:", JSON.stringify(formValue, null, 2));

    axios
      .post(
        "https://dev-project-ecommerce.upgrad.dev/api/products",
        JSON.stringify(formValue), // Convert to JSON string
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Success:", response.data);
      })
      .catch((error) => {
        console.error("Error:", error.response?.data || error.message);
        if (error.response) {
          console.error("Error Details:", error.response.data);
        }
      });
  };

  
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id && mode === "edit") {
      axios
        .get(`https://dev-project-ecommerce.upgrad.dev/api/products?id=${id}`)
        .then((response) => {
          setProduct(response.data);
          console.log("response.data", response.data); // Assuming response contains product details
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
        });
    }
  }, [id, mode]);
  return (
    <Root component="main">
      {/* Heading */}
      {mode === "edit" ? (
        <Typography variant="h6" noWrap component="div" gutterBottom>
          Edit Product
        </Typography>
      ) : (
        <Typography variant="h6" noWrap component="div" gutterBottom>
          Add Product
        </Typography>
      )}
      {/* Form */}
      <Typography variant="h6" noWrap component="div" sx={{ color: "red" }}>
        {/* {registerState?.errorMessage} */}
      </Typography>
      <form noValidate className="form" onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={proName}
          id="name"
          label="Name"
          name="name"
          autoComplete="given-name"
          autoFocus
          onChange={handleChange}
        />
        <CreatableSelect
          isClearable
          placeholder="Category"
          options={categories?.map((cat) => ({
            label: cat,
            value: cat.toLowerCase(),
          }))}
          styles={{
            control: (base) => ({
              ...base,
              backgroundColor: "#fff",
              border: "1px solid #ccc",
              boxShadow: "none",
              borderRadius: "8px",
              padding: "5px",
            }),
          }}
          onChange={(selectedOption) =>
            setCategory(selectedOption ? selectedOption.value : "")
          }
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={manufacture}
          id="manufacture"
          label="Manufacture"
          name="manufacture"
          autoComplete="family-name"
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={itemQty}
          name="itemsQty"
          label="Available Items"
          type="items"
          id="itemsQty"
          autoComplete="new-password"
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          value={price}
          name="price"
          label="Price"
          type="number"
          id="price"
          autoComplete="new-password"
          onChange={handleChange}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          value={imgUrl}
          name="imageUrl"
          label="Image URL"
          type="url"
          id="imageUrl"
          autoComplete="off"
          onChange={handleChange}
        />

        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          value={description}
          name="description"
          label="Product Description"
          type="text"
          id="description"
          autoComplete="tel"
          onChange={handleChange}
        />

        {/* Submit Button */}
        <Button type="submit" fullWidth variant="contained" className="submit">
          Save Product
        </Button>
      </form>
    </Root>
  );
};

export default AddProduct;
