import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import AppRouter from "./router/AppRouter.jsx";
import { Toaster } from "react-hot-toast";
import { LoginContext } from "./context/LogContext";

import { Provider } from 'react-redux'
import store from "./redux/store";

createRoot(document.getElementById("root")).render(
  <StrictMode>

    <Provider store={store}>
      <LoginContext>
        <AppRouter />
        <Toaster />
      </LoginContext>
    </Provider>

  </StrictMode>
  
);
