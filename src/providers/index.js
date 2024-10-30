"use client";

import { NextThemeProvider } from "./next-theme";
import { ReactQueryProvider } from "./react-query";

const Providers = ({ children }) => {
  return (
    <ReactQueryProvider>
      <NextThemeProvider>{children}</NextThemeProvider>
    </ReactQueryProvider>
  );
};

export default Providers;
