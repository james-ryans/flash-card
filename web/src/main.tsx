import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "@radix-ui/themes/styles.css";
import "./styles/index.css";
import "./styles/tailwind.css";
import Translation from "./pages/Translation";
import BaseLayout from "./layouts/BaseLayout";
import { Theme } from "@radix-ui/themes";
import Login from "./pages/Login";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Theme>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<BaseLayout />}>
            <Route index element={<Translation />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Theme>
  </StrictMode>,
);
