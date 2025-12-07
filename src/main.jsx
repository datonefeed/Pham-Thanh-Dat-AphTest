import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { router } from "./router/router.jsx";
import { RouterProvider } from "react-router-dom";
import { store } from "./redux/store.jsx";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import ErrorBoundary from "./components/common/ErrorBoundary.jsx";

library.add(fas, far, fab);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary fallback={<div>App crashed!</div>}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  </StrictMode>
);
