import React, { useEffect, useMemo, useState } from "react";
import "../styles/Footer.css";
import LogoMarquee from "./LogoMarquee";
import { useLocation } from "react-router-dom";

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

// Hook بسيط لتحديد الموبايل
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

export default function Footer({
  lang: forcedLang,
  footerBg = "/assets/FooterImgg.png",
  bgImage = "",
  logoSrc = "/assets/logo.png",
  logoTry = ["/assets/my-logo.png", "/assets/american-logo.png", "/assets/logo.png"],
}) {
  const location = useLocation();
  const navigate = useNavigate();

  const isEn = location.pathname.startsWith("/en");
  const prefix = isEn ? "/en" : "";
  const lang = forcedLang || (isEn ? "en" : "ar");
  const t = COPY[lang];
  const isLTR = t.dir === "ltr";
  const isMobile = useIsMobile(768);

  // محاذاة النص حسب اللغة
  const textAlignValue = lang === "ar" ? "right" : "center";

  // لوجو: جرّب مسارات متعددة
  const candidates = useMemo(() => {
    const set = new Set([logoSrc, ...(logoTry || [])].filter(Boolean));
    return Array.from(set);
  }, [logoSrc, logoTry]);

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
        } catch {}
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [candidates]);

  // سكرول ناعم مع أوفست للهيدر
  const scrollWithOffsetById = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const headerOffset = 90; // عدّل حسب ارتفاع الهيدر
    const y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  // لو فيه هاش في URL بعد التنقّل
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => scrollWithOffsetById(id), 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.hash]);

  // الهوم: امسح الهاش واطلع فوق لو أنت عليها بالفعل
  const homePath = `${prefix}/`;
  const handleHomeClick = (e) => {
    if (location.pathname === homePath) {
      e.preventDefault();
      window.history.replaceState(null, "", homePath);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // هاندل الهاش من الفوتر (services)
  const handleAnchorClick = (e, id) => {
    e.preventDefault();
    if (location.pathname !== homePath) {
      navigate(homePath + `#${id}`);
    } else {
      scrollWithOffsetById(id);
      if (location.hash !== `#${id}`) {
        window.history.replaceState(null, "", `#${id}`);
      }
    }
  };

  // سياسات: مسار موحّد + Scroll لأعلى لو كنت فيها
  const policiesPath = `${prefix}/policies`;
  const handlePoliciesClick = (e) => {
    if (location.pathname === policiesPath) {
      e.preventDefault();
      window.history.replaceState(null, "", policiesPath);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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
              // لو عايز ترجع خلفية للبلوك كله: backgroundImage: bgImage ? `url('${bgImage}')` : "none",
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
                loading="lazy"
                style={{
                  display: "block",
                  maxWidth: 150,
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            ) : null}
            <h3 className="logo-word" style={{ margin: 0, background: "transparent" }}>
              American
            </h3>
          </div>

          <p className="company-desc">{t.companyDesc}</p>
        </div>

        {/* Main Pages */}
        <div className="footer-column" style={{ textAlign: textAlignValue }}>
          <h3>{t.mainPagesTitle}</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <RouterLink to={homePath} onClick={handleHomeClick}>
                {t.home}
              </RouterLink>
            </li>
            <li>
              {/* نفس أسلوب الهيدر: هاش لينك للسيرفيسز على الهوم */}
              <a href={`${prefix}/#services-section`} onClick={(e) => handleAnchorClick(e, "services-section")}>
                {t.services}
              </a>
            </li>
          </ul>
        </div>

        {/* Policies */}
        <div className="footer-column" style={{ textAlign: textAlignValue }}>
          <h3>{t.policiesTitle}</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <RouterLink to={policiesPath} onClick={handlePoliciesClick}>
                {t.policies}
              </RouterLink>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-column" style={{ textAlign: textAlignValue }}>
          <h3>{t.contactTitle}</h3>
          <div className="social-icons" style={{ display: "flex", gap: 10, justifyContent: "center" }}>
            <a href="mailto:egyamircan6@gmail.com" aria-label="Email">
              <img src="https://img.icons8.com/color/48/gmail-new.png" alt="Gmail" loading="lazy" />
            </a>
            {/* واتساب لازم بصيغة دولية صحيحة: مصر 20 */}
            <a href="https://wa.me/201211114528" target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <img src="https://img.icons8.com/color/48/whatsapp--v1.png" alt="WhatsApp" loading="lazy" />
            </a>
            <a href="https://www.facebook.com/americangruop/" target="_blank" rel="noreferrer" aria-label="Facebook">
              <img src="https://img.icons8.com/color/48/facebook.png" alt="Facebook" loading="lazy" />
            </a>
          </div>
        </div>
      </div>

      <FooterBottom />
    </>
  );
}
