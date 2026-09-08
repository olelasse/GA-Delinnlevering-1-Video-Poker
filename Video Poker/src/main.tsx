import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import App from "./App.tsx";
import Header from "./components/Header/Header.tsx";
import Rules from "./pages/Rules/Rules.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/players" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
