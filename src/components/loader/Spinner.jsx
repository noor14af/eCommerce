import { Box, LinearProgress, Stack, CircularProgress } from "@mui/material";

function Spinner({ width = "300px", type = "linear" }) {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ height: "100vh" }}
    >
      {type === "circular" ? (
        <CircularProgress color="primary" size={50} />
      ) : (
        <Box sx={{ width, boxShadow: 2, borderRadius: "4px", padding: "4px" }}>
          <LinearProgress color="primary" />
        </Box>
      )}
    </Stack>
  );
}

export default Spinner;
