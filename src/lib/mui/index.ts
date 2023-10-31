import { createTheme } from "@mui/material";

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
    divider: "#00000020",
  },
  typography: {
    fontFamily: `'Inter', sans-serif`,
    h1: {
      fontWeight: 600,
      letterSpacing: "-0.035em",
    },
    h2: {
      fontWeight: 600,
      letterSpacing: "-0.035em",
    },
    h3: {
      fontWeight: 600,
      letterSpacing: "-0.030em",
    },
    h4: {
      fontWeight: 600,
      letterSpacing: "-0.025em",
    },
    h5: {
      fontWeight: 600,
      letterSpacing: "-0.02em",
    },
    h6: {
      fontWeight: 600,
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
