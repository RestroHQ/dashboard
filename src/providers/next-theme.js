import { ThemeProvider } from "next-themes";

export const NextThemeProvider = ({ children }) => {
  return (
    <ThemeProvider defaultTheme="light" attribute="class">
      {children}
    </ThemeProvider>
  );
};
