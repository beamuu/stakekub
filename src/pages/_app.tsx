import { defaultTheme } from "@/lib/mui";
import "@/styles/globals.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { appWithTranslation } from "next-i18next";
import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default appWithTranslation(App)