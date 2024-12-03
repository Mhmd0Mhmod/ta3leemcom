import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./Styles/index.css";
import "./Styles/fonts.css";
import "./Styles/MediaQuery.css";
import { ErrorBoundary } from "react-error-boundary";
import Error from "./Pages/ErrorBoundary.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary FallbackComponent={Error}>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
