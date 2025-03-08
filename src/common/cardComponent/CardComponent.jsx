import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/features/authentication/authSlice";
import { Link } from "react-router-dom";
import AppRoutes from "../../navigation/appRoutes";
const CardComponent = ({ productData }) => {
  const userData = useSelector(selectUser);
  var cardStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "30vw",
    height: "40vw",
  };

  return (
    <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
      {productData.map((item) => (
        <Card style={cardStyle} key={item?.id}>
          <CardMedia
            component="img"
            alt={item?.name || "Product Image"}
            height="180"
            image={item?.imageUrl || "https://via.placeholder.com/140"}
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Box display="flex" justifyContent="space-between">
              <Typography>{item?.name || "Product Name"}</Typography>
              <Typography display="flex" alignItems="center">
                <CurrencyRupeeIcon fontSize="small" />
                <span>{item?.price || "0"}</span>
              </Typography>
            </Box>

            <Typography
              variant="body2"
              sx={{ color: "text.secondary", textAlign: "justify" }}
            >
              {item?.description || "No description available."}
            </Typography>
          </CardContent>

          {/* Fixed Buttons at Bottom */}
          <CardActions
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "16px",
              marginTop: "auto",
            }}
          >
            <Link
              to={AppRoutes.PRODUCTDETAILS}
              state={{ item: item}}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: "#3f51b5",
                  "&:hover": { backgroundColor: "#303f9f" },
                }}
              >
                Buy
              </Button>
            </Link>
            {userData?.roles[0] === "ADMIN" ? (
              <Box display="flex" gap={1}>
                <Link
                  to={AppRoutes.ADDPRODUCT}
                  state={{ id: item?.id, mode: "edit" }}
                  sx={{
                    color: "#717175",
                    textTransform: "none",
                    padding: 0,
                    minWidth: "auto",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  <EditIcon fontSize="small" />
                </Link>

                {/* </Button> */}

                <Button
                  variant="text"
                  sx={{
                    color: "#717175",
                    textTransform: "none",
                    padding: 0,
                    minWidth: "auto",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </Button>
              </Box>
            ) : (
              ""
            )}
          </CardActions>
        </Card>
      ))}
    </Box>
  );
};

export default CardComponent;
