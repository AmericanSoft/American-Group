// import React from "react";
// import "../styles/Footer.css";
// import LogoMarquee from "./LogoMarquee";
// import { useLocation } from "react-router-dom";

// // النصوص بلغتين
// const COPY = {
//   ar: {
//     dir: "rtl",
//     companyDesc:
//       "تواصل الأمريكية جروب تعزيز مكانتها في السوق من خلال عقد شراكات استراتيجية جديدة مع مجموعة من الشركات الرائدة في مجال المنتجات المنزلية.",
//     mainPagesTitle: "الصفحات الاساسية",
//     home: "الرئيسية",
//     services: "خدمات الصيانة",
//     about: "من نحن",
//     policiesTitle: "السياسات والخصوصية",
//     policies: "السياسات",
//     contactTitle: "تواصل معنا",
//   },
//   en: {
//     dir: "ltr",
//     companyDesc:
//       "American Group continues to strengthen its position in the market by establishing new strategic partnerships with leading companies in the home appliances sector.",
//     mainPagesTitle: "Main Pages",
//     home: "Home",
//     services: "Maintenance Services",
//     about: "About Us",
//     policiesTitle: "Policies & Privacy",
//     policies: "Policies",
//     contactTitle: "Contact Us",
//   },
// };

// export default function Footer({ lang: forcedLang }) {
//   const { pathname } = useLocation();
//   const isEn = pathname.startsWith("/en");
//   const lang = forcedLang || (isEn ? "en" : "ar");
//   const t = COPY[lang];

//   return (
//     <>
//       <div className="footer" dir={t.dir}>
//         {/* Logo + Description */}
//         <div className="footer-column logo">
//           <div className="logo-block">
//             <img
//               src="https://carrier-repairs.com/wp-content/uploads/2025/08/carrier-repairs.png"
//               alt="American Logo"
//               className="logo-img"
//             />
//             <h3>American</h3>
//           </div>
//           <p className="company-desc">{t.companyDesc}</p>
//         </div>

//         {/* Main Pages */}
//         <div className="footer-column">
//           <h3>{t.mainPagesTitle}</h3>
//           <ul>
//             <li>
//               <a href="/">{t.home}</a>
//             </li>
//             <li>
//               <a href="/services">{t.services}</a>
//             </li>
//             <li>
//               <a href="/about">{t.about}</a>
//             </li>
//           </ul>
//         </div>

//         {/* Policies */}
//         <div className="footer-column">
//           <h3>{t.policiesTitle}</h3>
//           <ul>
//             <li>
//               <a href="/policies">{t.policies}</a>
//             </li>
//           </ul>
//         </div>

//         {/* Contact */}
//         <div className="footer-column">
//           <h3>{t.contactTitle}</h3>
//           <div className="social-icons">
//             <a href="mailto:info@american.com">
//               <img src="https://img.icons8.com/color/48/gmail-new.png" alt="Gmail" />
//             </a>
//             <a href="https://wa.me/01211114528">
//               <img src="https://img.icons8.com/color/48/whatsapp--v1.png" alt="WhatsApp" />
//             </a>
//             <a href="https://www.facebook.com/">
//               <img src="https://img.icons8.com/color/48/facebook.png" alt="Facebook" />
//             </a>
//           </div>
//         </div>
//       </div>
//       <LogoMarquee />
//     </>
//   );
// }
import React, { useEffect, useMemo, useState } from "react";
import "../styles/Footer.css";
import LogoMarquee from "./LogoMarquee";
import { useLocation } from "react-router-dom";
import FooterBottom from "./FooterBottom";

const COPY = {
  ar: {
    dir: "rtl",
    brand: "الأمريكية جروب",
    companyDesc: "تواصل الأمريكية جروب تعزيز مكانتها في السوق ...",
    mainPagesTitle: "الصفحات الاساسية",
    home: "الرئيسية",
    services: "خدمات الصيانة",
    about: "من نحن",
    policiesTitle: "السياسات والخصوصية",
    policies: "السياسات",
    contactTitle: "تواصل معنا",
  },
  en: {
    dir: "ltr",
    brand: "American Group",
    companyDesc:
      "American Group continues to strengthen its position in the market ...",
    mainPagesTitle: "Main Pages",
    home: "Home",
    services: "Maintenance Services",
    about: "About Us",
    policiesTitle: "Policies & Privacy",
    policies: "Policies",
    contactTitle: "Contact Us",
  },
};

// موبايل؟
function useIsMobile(bp = 768) {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${bp}px)`);
    const onChange = (e) => setIsMobile(e.matches);
    setIsMobile(mql.matches);
    if (mql.addEventListener) mql.addEventListener("change", onChange);
    else mql.addListener(onChange);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener("change", onChange);
      else mql.removeListener(onChange);
    };
  }, [bp]);
  return isMobile;
}

/**
 * props:
 * - footerBg   الخلفية الرئيسية للفوتر (section) مثال: "/assets/Footer.png"
 * - bgImage    خلفية بلوك الشعار (اختياري) لو فاضي → شفاف
 * - logoSrc    المسار الأساسي للوجو
 * - logoTry    مصفوفة مسارات إضافية نجربها لو الأساسي فشل
 * - lang       "ar" | "en" (افتراضي حسب /en)
 */
export default function Footer({
  lang: forcedLang,
  footerBg = "/assets/FooterImgg.png",
  bgImage = "",
  logoSrc = "/assets/logo.png",
  logoTry = ["/assets/my-logo.png", "/assets/american-logo.png", "/assets/logo.png"],
}) {
  const { pathname } = useLocation();
  const isEn = pathname.startsWith("/en");
  const lang = forcedLang || (isEn ? "en" : "ar");
  const t = COPY[lang];
  const isLTR = t.dir === "ltr";
  const isMobile = useIsMobile(768);

  // محاذاة النص حسب اللغة
  const textAlignValue = lang === "ar" ? "right" : "center";

  // رتّب قائمة المحاولات (الأساسي أولاً)
  const candidates = useMemo(() => {
    const set = new Set([logoSrc, ...(logoTry || [])].filter(Boolean));
    return Array.from(set);
  }, [logoSrc, logoTry]);

  // جرّب تحمل أول لوجو شغّال
  const [resolvedLogo, setResolvedLogo] = useState("");
  useEffect(() => {
    let cancelled = false;
    (async () => {
      for (const url of candidates) {
        try {
          await new Promise((res, rej) => {
            const img = new Image();
            img.onload = () => res();
            img.onerror = rej;
            img.src = url;
          });
          if (!cancelled) setResolvedLogo(url);
          break;
        } catch {
          // جرّب اللي بعده
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [candidates]);

  const logoBlockDirection = isMobile ? "column-reverse" : isLTR ? "row" : "row-reverse";

  return (
    <>
      <div
        className="footer"
        dir={t.dir}
        style={{
          textAlign: textAlignValue,
          backgroundImage: footerBg ? `url('${footerBg}')` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        {/* Logo + Description */}
        <div className="footer-column logo" style={{ textAlign: textAlignValue }}>
          <div
            className="logo-block"
            style={{
              backgroundColor: "transparent",
              // backgroundImage: bgImage ? `url('${bgImage}')` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: lang === "ar" ? "flex-end" : "center",
              gap: 8,
              flexDirection: logoBlockDirection,
              padding: 16,
              borderRadius: 12,
            }}
          >
            <h3>{t.brand}</h3>
            {resolvedLogo ? (
              <img
                src={resolvedLogo}
                alt={lang === "en" ? "American Logo" : "شعار الأمريكية جروب"}
                className="logo-img"
                style={{
                  display: "block",
                  maxWidth: 150,
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            ) : null}
          </div>

          <p className="company-desc">{t.companyDesc}</p>
        </div>

        {/* Main Pages */}
        <div className="footer-column" style={{ textAlign: textAlignValue }}>
          <h3>{t.mainPagesTitle}</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li><a href="/">{t.home}</a></li>
            <li><a href="/services">{t.services}</a></li>
            <li><a href="/about">{t.about}</a></li>
          </ul>
        </div>

        {/* Policies */}
        <div className="footer-column" style={{ textAlign: textAlignValue }}>
          <h3>{t.policiesTitle}</h3>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            <li><a href="/policies">{t.policies}</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-column" style={{ textAlign: textAlignValue }}>
          <h3>{t.contactTitle}</h3>
          <div
            className="social-icons"
            style={{
              display: "flex",
              gap: 10,
              justifyContent: lang === "ar" ? "flex-end" : "center",
            }}
          >
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
      </div>

      <FooterBottom />
    </>
  );
}
