"use client";

import * as React from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";


const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [rtlPlugin],
});



const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: '"Bahij", sans-serif',
  },
  palette: {
    primary: {
      main: "#0F3D2E", 
    },
    background: {
      default: "#F5F5F5",
    },
  },
  shape: {
    borderRadius: 14,
  },
});

export default function MuiThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}
