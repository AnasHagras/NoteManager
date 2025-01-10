import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Blue color
    },
    secondary: {
      main: "#9c27b0", // Purple color
    },
    background: {
      default: "#f5f5f5", // Light gray background
    },
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
      fontSize: "2.5rem",
    },
    h2: {
      fontWeight: 500,
      fontSize: "2rem",
    },
    body1: {
      fontSize: "1rem",
    },
  },
});

export default theme;
