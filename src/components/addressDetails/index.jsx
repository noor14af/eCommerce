import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Button, Grid, Snackbar, Alert } from "@mui/material";
import { useLocation } from "react-router-dom";
import ItemDetails from "../itemDetails";

let stepperArray = [
  { labelOrder: 1, label: "Items", completed: false },
  { labelOrder: 2, label: "Select Address", completed: false },
  { labelOrder: 3, label: "Confirm Order", completed: false },
];

export default function AddressDetails() {
  const location = useLocation();
  const { item, qty } = location.state || {};
  console.log("item", item);
  console.log("qty", qty);

  const [activeStep, setActiveStep] = useState(0);
  const [stepsForOrdering, setStepsForOrdering] = useState(stepperArray);
  const [showInfo, setShowInfo] = useState(false);

  // Move to the previous step
  const moveToPreviousStep = () => {
    if (activeStep > 0) {
      setActiveStep((prevStep) => prevStep - 1);
    }
  };

  // Move to the next step
  const validateAndMoveToNextStep = () => {
    if (activeStep < stepsForOrdering.length - 1) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, mt: 8 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Stepper activeStep={activeStep} sx={{ width: "80%" }}>
              {stepsForOrdering.map((element, index) => (
                <Step key={index} completed={element.completed}>
                  <StepLabel>{element.label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>
        </Grid>

        {/* Step Content */}
        {activeStep === 0 && (
          <Grid item xs={12}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <ItemDetails itemDetails={item} qty={qty} />
            </div>
          </Grid>
        )}
        {activeStep === 1 && (
          <Grid item xs={12}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <p>Select Address Component Goes Here</p>
            </div>
          </Grid>
        )}
        {activeStep === 2 && (
          <Grid item xs={12}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <p>Confirm Order Component Goes Here</p>
            </div>
          </Grid>
        )}

        {/* Navigation Buttons */}
        <Grid item xs={12}>
          <div
            style={{ display: "flex", justifyContent: "center", gap: "20px" }}
          >
            <Button
              variant="text"
              color="primary"
              onClick={moveToPreviousStep}
              disabled={activeStep === 0}
            >
              BACK
            </Button>
            {activeStep < stepsForOrdering.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={validateAndMoveToNextStep}
              >
                NEXT
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() => alert("Order Placed!")}
              >
                PLACE ORDER
              </Button>
            )}
          </div>
        </Grid>
      </Grid>

      {/* Snackbar for messages (if needed in future) */}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={showInfo}
        autoHideDuration={4000}
      >
        <Alert sx={{ width: "100%" }}>
          {/* Display a message when needed */}
        </Alert>
      </Snackbar>
    </Box>
  );
}
