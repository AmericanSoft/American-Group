// src/components/Header.jsx
import React, { useEffect } from "react";
import { Box, Container, Flex, HStack, Link as CLink, Button, Image, Text } from "@chakra-ui/react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaTools, FaPhoneAlt, FaGlobe, FaShieldAlt } from "react-icons/fa";

const logoSrc = "/assets/logo.png";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  const isEn = location.pathname.startsWith("/en");
  const dir = isEn ? "ltr" : "rtl";
  const prefix = isEn ? "/en" : "";

  const labels = {
    home: isEn ? "Home" : "الرئيسية",
    services: isEn ? "Services" : "خدمات الصيانة",
    contact: isEn ? "Contact Us" : "تواصل معنا",
    consult: isEn ? "Free Consultation" : "استشارة مجانية",
    switch: isEn ? "العربية" : "English",
  };
const waMsg = encodeURIComponent(isEn ? "Hello, I need a free consultation." : "عايز استشارة مجانية.");

  const toggleLang = () => {
    const p = location.pathname;
    if (isEn) {
      const next = p.replace(/^\/en/, "") || "/";
      navigate(next + location.search + location.hash);
    } else {
      const next = p === "/" ? "/en" : `/en${p}`;
      navigate(next + location.search + location.hash);
    }
  };

  // ===== Helpers: Smooth scroll with sticky header offset =====
  const scrollWithOffsetById = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const headerOffset = 90; // عدّلها حسب ارتفاع الهيدر
    const y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  // لو المسار فيه هاش، اسكرول تلقائي بعد الانتقال/الرندر
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => scrollWithOffsetById(id), 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.hash]);

  // هاندل موحّد للهاش لينكات باستخدام Chakra فقط
  const handleAnchorClick = (e, id) => {
    e.preventDefault();
    const homePath = `${prefix}/`;
    if (location.pathname !== homePath) {
      // روح للهوم ثم اسكروول
      navigate(homePath + `#${id}`);
    } else {
      // نفس الصفحة: سكرول مباشر وتحديث الهاش
      scrollWithOffsetById(id);
      if (location.hash !== `#${id}`) {
        window.history.replaceState(null, "", `#${id}`);
      }
    }
  };

  // تأكيد الرجوع لأعلى الصفحة عند الضغط على الرئيسية/اللوجو حتى لو أنت بالفعل هناك
  const homePath = `${prefix}/`;
  const handleHomeClick = (e) => {
    if (location.pathname === homePath) {
      e.preventDefault();
      // امسح أي هاش واطلع لأعلى
      window.history.replaceState(null, "", homePath);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // هل الرابط نشط؟
  const isActiveHash = (hash) =>
    location.hash === hash && (location.pathname === `${prefix}/` || location.pathname === "/");

  return (
    <Box
      bg="gray.900"
      color="white"
      dir={dir}
      position="sticky"
      top="0"
      zIndex="1000"
      sx={{ ".active-link": { color: "blue.300" } }}
    >
      <Container maxW="6xl" px={{ base: 4, md: 8 }} py={3}>
        <Flex align="center" justify="space-between" gap={6} wrap="wrap">
          {/* الشعار */}
          <HStack>
            <CLink as={NavLink} to={homePath} end onClick={handleHomeClick}>
              <Image src={logoSrc} alt="American Group" boxSize="80px" objectFit="contain" />
            </CLink>
          </HStack>

          {/* الروابط */}
          <HStack spacing={{ base: 4, md: 6 }} flex="1" justify="center">
            <CLink
              as={NavLink}
              to={homePath}
              end
              onClick={handleHomeClick}
              fontWeight="bold"
              _activeLink={{ color: "blue.300" }}
            >
              <HStack>
                <FaHome />
                <Text>{labels.home}</Text>
              </HStack>
            </CLink>

            {/* خدمات - هاش لينك Chakra فقط */}
            <CLink
              as="a"
              href={`${prefix}/#services-section`}
              onClick={(e) => handleAnchorClick(e, "services-section")}
              className={isActiveHash("#services-section") ? "active-link" : ""}
            >
              <HStack>
                <FaTools />
                <Text>{labels.services}</Text>
              </HStack>
            </CLink>

            {/* تواصل - هاش لينك Chakra فقط */}
            <CLink
              as="a"
              href={`${prefix}/#contact-section`}
              onClick={(e) => handleAnchorClick(e, "contact-section")}
              className={isActiveHash("#contact-section") ? "active-link" : ""}
            >
              <HStack>
                <FaPhoneAlt />
                <Text>{labels.contact}</Text>
              </HStack>
            </CLink>
          </HStack>

          {/* أزرار اليمين */}
          <HStack spacing={3}>
            {/* زر الاستشارة يروح للفورم */}
            <Button
              as="a"
              href={`https://wa.me/201211114528?text=${waMsg}`}
              target="_blank"
              rel="noreferrer"
              colorScheme="blue"
              borderRadius="full"
              px={6}
            >
              {labels.consult}
            </Button>
            <Button
              variant="outline"
              borderRadius="full"
              borderColor="blue.300"
              color="blue.300"
              _hover={{ bg: "blue.300", color: "white" }}
              onClick={toggleLang}
              leftIcon={<FaGlobe />}
            >
              {labels.switch}
            </Button>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
