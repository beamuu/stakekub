import { createTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

const headingFontFamily = `'Plus Jakarta Sans', sans-serif`;
const bodyFontFamily = `'Inter', sans-serif`;

export const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#00ad45",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#000000d0",
      contrastText: "#ffffff",
    },
    text: {
      primary: "#323232",
    },
    background: {
      paper: "#fff",
    },
    divider: grey[300],
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
  },
});
