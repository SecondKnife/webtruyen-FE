import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        height: "300px",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  );
}
