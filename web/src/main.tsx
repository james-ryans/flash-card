import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./styles/index.css";
import "./styles/tailwind.css";
import Translation from "./pages/Translation";
import BaseLayout from "./layouts/BaseLayout";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route index element={<Translation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
