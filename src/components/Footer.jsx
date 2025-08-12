import React from "react";
import "../styles/Footer.css"; // هنحط الـ CSS هنا
import LogoMarquee from "./LogoMarquee";


export default function Footer() {
  return (
    <div className="footer">
      {/* Logo + Description */}
      <div className="footer-column logo">
        <div className="logo-block">
          <img
            src="https://carrier-repairs.com/wp-content/uploads/2025/08/carrier-repairs.png"
            alt="American Logo"
            className="logo-img"
          />
          <h3>American</h3>
        </div>
        <p className="company-desc">
          تواصل الأمريكية جروب تعزيز مكانتها في السوق من خلال عقد شراكات استراتيجية جديدة مع مجموعة من الشركات الرائدة في مجال المنتجات المنزلية.
        </p>
      </div>

      {/* Main Pages */}
      <div className="footer-column">
        <h3>الصفحات الاساسية</h3>
        <ul>
          <li><a href="/">الرئيسية</a></li>
          <li><a href="/services">خدمات الصيانة</a></li>
          <li><a href="/about">من نحن</a></li>
        </ul>
      </div>

      {/* Policies */}
      <div className="footer-column">
        <h3>السياسات والخصوصية</h3>
        <ul>
          <li><a href="/policies">السياسات</a></li>
        </ul>
      </div>

      {/* Contact */}
      <div className="footer-column">
        <h3>تواصل معنا</h3>
        <div className="social-icons">
          <a href="mailto:info@american.com">
            <img src="https://img.icons8.com/color/48/gmail-new.png" alt="Gmail" />
          </a>
          <a href="https://wa.me/01211114528">
            <img src="https://img.icons8.com/color/48/whatsapp--v1.png" alt="WhatsApp" />
          </a>
          <a href="https://www.facebook.com/">
            <img src="https://img.icons8.com/color/48/facebook.png" alt="Facebook" />
          </a>
        </div>
      </div>
      <LogoMarquee />
    </div>
  );
}
