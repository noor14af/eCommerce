import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RegisterProvider } from "./context/RegisterContext.jsx";
import { CategoriesProvider } from "./context/CategoriesContext.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RegisterProvider>
        <CategoriesProvider>
        <Router>
          <App />
        </Router>
        </CategoriesProvider>
      </RegisterProvider>
 
    </Provider>
  </StrictMode>
);

