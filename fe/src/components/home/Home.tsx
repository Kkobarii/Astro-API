import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Box, Paper, Typography } from "@mui/material";

export const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{ width: "100%", maxWidth: 500, margin: "50px", padding: "20px" }}
        component={Paper}
      >
        <Typography variant="h2" gutterBottom>
          Welcome to <b>AstroAPI</b>!
        </Typography>
        <Typography variant="body1" gutterBottom>
          This is a demo application that displays information about planets,
          resources, and gases.
        </Typography>
        <Typography variant="body1" gutterBottom>
          It's built with React, TypeScript, and Material-UI and inspired by the actual Astroneer wiki, because it was the best idea we could come up with.
        </Typography>
        <Typography variant="body1" gutterBottom>
            Click on the links above to explore the site, we hope you enjoy!
        </Typography>
      </Box>
    </div>
  );
};
