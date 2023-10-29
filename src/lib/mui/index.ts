import { createTheme } from "@mui/material";

export const defaultTheme = createTheme({
  palette: {
    primary: {
      main: "#00ad45",
      contrastText: "#ffffff"
    },
    background: {
      paper: "#00000010",
    }
  },
  typography: {
    fontFamily: `'Inter', sans-serif`,
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
      letterSpacing: "-0.025em"
    },
    h5: {
      fontWeight: 600,
      letterSpacing: "-0.02em"
    },
    h6: {
      fontWeight: 600,
      letterSpacing: "-0.01em"
    },
    body1: {
      fontSize: 16,
    },
    body2: {
      fontSize: 14,
    }
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
          textTransform: "none"
        }
      }
    }
  }
})