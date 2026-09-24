import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import App from "./App.tsx";
import Header from "./pageparts/Header/Header.tsx";
import Rules from "./pages/Rules/Rules.tsx";
import Footer from "./pageparts/Footer/Footer.tsx";
import Players from "./pages/Players/Players.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/players" element={<Players />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>,
);
