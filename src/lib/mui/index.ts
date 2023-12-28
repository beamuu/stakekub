import { concat } from "@/utils/string";
import { createTheme } from "@mui/material";
import { blueGrey, grey } from "@mui/material/colors";

const headingFontFamily = `'Inter', 'Noto Sans Thai', sans-serif`;
const bodyFontFamily = `'Inter', 'Noto Sans Thai', sans-serif`;

export const defaultTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#20c972",
      contrastText: "#101010",
    },
    secondary: {
      main: "#242424",
      contrastText: "#ffffff",
    },
    grey: {
      50: grey[900],
      100: grey[800],
      200: grey[700],
      300: grey[600],
      400: grey[500],
      500: grey[400],
      600: grey[300],
      700: grey[200],
      800: grey[100],
      900: grey[50],
    },
    text: {
      // primary: "#fafaff",
      // secondary: "#cecece",
      // disabled: "#89898a",
    },
    background: {
      default: "#000000",
    },
  },
  typography: {
    fontFamily: bodyFontFamily,
    h1: {
      fontWeight: 600,
      fontFamily: headingFontFamily,
      letterSpacing: "-0.035em",
    },
    h2: {
      fontWeight: 600,
      fontFamily: headingFontFamily,
      letterSpacing: "-0.035em",
    },
    h3: {
      fontWeight: 600,
      fontFamily: headingFontFamily,
      letterSpacing: "-0.030em",
    },
    h4: {
      fontWeight: 600,
      fontFamily: headingFontFamily,
      letterSpacing: "-0.025em",
    },
    h5: {
      fontWeight: 600,
      fontFamily: headingFontFamily,
      letterSpacing: "-0.02em",
    },
    h6: {
      fontWeight: 600,
      fontFamily: headingFontFamily,
      letterSpacing: "-0.01em",
    },
    body1: {
      fontSize: 16,
      fontWeight: 500,
    },
    body2: {
      fontSize: 14,
    },
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: grey[800],
        },
        tooltipArrow: {
          backgroundColor: grey[800],
        },
      },
    },
  },
});
