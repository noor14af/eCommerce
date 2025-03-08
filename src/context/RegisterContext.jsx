import { createContext, useState } from "react";
export const RegisterContext = createContext();
export const RegisterProvider = ({ children }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  return (
    <RegisterContext.Provider
      value={{ isSignUp, setIsSignUp, errorMessage, setErrorMessage }}
    >
      {children}
    </RegisterContext.Provider>
  );
};
