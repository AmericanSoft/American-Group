import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Outlet } from "react-router";
import FooterTop from "../components/FooterTop";

export default function AppLayout() {
  return (
    <div>
      <Header />
      <Outlet />
      <FooterTop />
<Footer bgImage="/assets/Footer.png" logoSrc="/assets/my-logo.png" />
     </div>
  );
}
