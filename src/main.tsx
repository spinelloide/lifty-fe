import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import Header from "./components/Header/Header.tsx";
import Layout from "./components/Layout/Layout.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Header />
    <Layout>
      <App />
    </Layout>
  </StrictMode>
);
