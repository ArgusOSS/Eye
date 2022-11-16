/* eslint-disable import/no-default-export */
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    background: {
      default: "rgb(0, 0, 0)",
      paper: "rgba(42, 42, 42, 1)",
    },
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#d93142",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    fontFamily: "Arial",
    h1: {
      fontSize: "5em",
      fontWeight: 800,
    },
    h2: {
      fontSize: "4em",
      fontWeight: 700,
    },
    h4: {
      fontSize: "3em",
      fontWeight: 700,
    },
  },
});

export default theme;
