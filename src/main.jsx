import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./Styles/index.css";
import "./Styles/fonts.css";
import "./Styles/MediaQuery.css";
import { ErrorBoundary } from "react-error-boundary";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary fallback={(error) => <div>{error.message}</div>}>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
