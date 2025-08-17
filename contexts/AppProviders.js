import React from "react";
import { UserProvider } from "./UserContext";
import { ThemeProvider } from "./ThemeContext";

export const AppProviders = ({ children }) => {
  return (
    <UserProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </UserProvider>
  );
};
