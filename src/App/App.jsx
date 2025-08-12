// src/App/App.jsx
import { Routes, Route } from "react-router-dom";
import HomeAr from "../pages/HomeAr";
// import ServicesAr from "../pages/ServicesAr";
// import ContactAr from "../pages/ContactAr";
import HomeEn from "../pages/HomeEn";
// import ServicesEn from "../pages/ServicesEn";
// import ContactEn from "../pages/ContactEn";
import AppLayout from "../Layout/AppLayout";

export default function App() {
  return (
    <Routes>
      {/* عربي (بدون بادئة) */}
      <Route element={<AppLayout />}>
        <Route index element={<HomeAr />} />
        {/* <Route path="services" element={<ServicesAr />} />
        <Route path="contact" element={<ContactAr />} /> */}
      </Route>

      {/* إنجليزي (/en) */}
      <Route path="/en" element={<AppLayout />}>
        <Route index element={<HomeEn />} />
        {/* <Route path="services" element={<ServicesEn />} />
        <Route path="contact" element={<ContactEn />} /> */}
      </Route>
    </Routes>
  );
}
