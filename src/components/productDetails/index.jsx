import React, { useState } from "react";
import CategoriesTab from "../categoriesTab";
import { useLocation } from "react-router-dom";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import AppRoutes from "../../navigation/appRoutes";

const ProductDetails = () => {
  const location = useLocation();
  const { item } = location.state || {};
  console.log("item", item);

  const [qty, setQty] = useState("1");
  const [qtyError, setQtyError] = useState("");

  const handleQuantityChange = () => {
    const quantity = parseInt(qty, 10);
    if (isNaN(quantity) || quantity <= 0) {
      setQtyError("Please enter a valid quantity.");
    } else if (quantity > item?.availableItems) {
      setQtyError(`Quantity must be less than ${item?.availableItems}`);
    } else {
      setQtyError("");
    }
  };

  return (
    <>
      <CategoriesTab />
      <Box sx={{ mt: 2 }}>
        <Card
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <CardMedia
            component="img"
            image={item?.imageUrl}
            alt="Sample Image"
            sx={{
              width: 400,
              height: 400,
              objectFit: "cover",
              borderRadius: 2,
            }}
          />
          <CardContent>
            <div style={{ display: "flex", justifyContent: "left" }}>
              <Typography variant="h6">{item?.name}</Typography>
              <div style={{ paddingLeft: "4%" }}>
                <Typography
                  variant="body1"
                  style={{
                    color: "#FFFFFF",
                    backgroundColor: "#3f51b5",
                    padding: "1px 5px",
                    borderRadius: 20,
                  }}
                >
                  Available Quantity: {item?.availableItems}
                </Typography>
              </div>
            </div>
            <Typography>
              Category:{" "}
              <span style={{ fontSize: "20px" }}>{item?.category}</span>
            </Typography>
            <Typography variant="h6">{item?.description}</Typography>
            <Typography display="flex" sx={{ color: "red", ml: 0 }}>
              <CurrencyRupeeIcon fontSize="small" />
              <span>{item?.price || "0"}</span>
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              value={qty}
              required
              fullWidth
              label="Enter Quantity"
              id="itemsQty"
              autoComplete="off"
              onChange={(e) => setQty(e.target.value)}
              onBlur={handleQuantityChange}
              error={!!qtyError}
              helperText={qtyError}
            />
            <Link
              style={{ textDecoration: "none" }}
              to={AppRoutes.ADDRESSDETAILS}
              state={{item: item, qty:qty}}
            >
              <Button
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: "#3f51b5",
                  "&:hover": { backgroundColor: "#303f9f" },
                }}
                disabled={!!qtyError}
              >
                Place Order
              </Button>
            </Link>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default ProductDetails;
