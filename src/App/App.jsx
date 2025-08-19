// // src/App/App.jsx
// import { Routes, Route } from "react-router-dom";
// import HomeAr from "../pages/HomeAr";
// import HomeEn from "../pages/HomeEn";
// import AppLayout from "../Layout/AppLayout";
// import Policies from "../pages/Policies";

// export default function App() {
//   return (
//     <Routes>
//       {/* عربي (بدون بادئة) */}
//       <Route element={<AppLayout />}>
//         <Route index element={<HomeAr />} />
//         <Route path="/policies" element={<Policies />} />
//       </Route>

//       {/* إنجليزي (/en) */}
//       <Route path="/en" element={<AppLayout />}>
//         <Route path="/en/policies" element={<Policies />} />

//         <Route index element={<HomeEn />} />
//       </Route>
//     </Routes>
//   );
// }

// src/App/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import HomeAr from "../pages/HomeAr";
import HomeEn from "../pages/HomeEn";
import AppLayout from "../Layout/AppLayout";
import Policies from "../pages/Policies";

export default function App() {
  return (
    <Routes>
      {/* عربي */}
      <Route element={<AppLayout />}>
        <Route index element={<HomeAr />} />
        <Route path="policies" element={<Policies />} />
      </Route>

      {/* إنجليزي */}
      <Route path="en" element={<AppLayout />}>
        <Route index element={<HomeEn />} />
        <Route path="policies" element={<Policies />} />
      </Route>

      {/* اختياري: تحويل أي مسار غلط للصفحة الرئيسية */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
