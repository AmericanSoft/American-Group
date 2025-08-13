// src/App/App.jsx
import { Routes, Route } from "react-router-dom";
import HomeAr from "../pages/HomeAr";
import HomeEn from "../pages/HomeEn";
import AppLayout from "../Layout/AppLayout";
import Policies from "../pages/Policies";

export default function App() {
  return (
    <Routes>
      {/* عربي (بدون بادئة) */}
      <Route element={<AppLayout />}>
        <Route index element={<HomeAr />} />
      </Route>

      {/* إنجليزي (/en) */}
      <Route path="/en" element={<AppLayout />}>
        <Route index element={<HomeEn />} />
      </Route>

      <Route path="/policies" element={<Policies />} />
      <Route path="/en/policies" element={<Policies />} />
    </Routes>
  );
}
