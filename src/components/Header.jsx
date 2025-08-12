// src/components/Header.jsx
import React from "react";
import { Box, Container, Flex, HStack, Link as CLink, Button, Image, Text } from "@chakra-ui/react";
import { Link as RouterLink, NavLink, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaTools, FaPhoneAlt, FaGlobe } from "react-icons/fa";

const logoSrc = "/assets/logo.png";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  // نحدد اللغة من المسار الحالي
  const isEn = location.pathname.startsWith("/en");
  const lang = isEn ? "en" : "ar";
  const dir = isEn ? "ltr" : "rtl";
  const prefix = isEn ? "/en" : ""; // العربي بدون بادئة

  // نصوص الروابط
  const labels = {
    home: isEn ? "Home" : "الرئيسية",
    services: isEn ? "Services" : "خدمات الصيانة",
    contact: isEn ? "Contact Us" : "تواصل معنا",
    consult: isEn ? "Free Consultation" : "استشارة مجانية",
    switch: isEn ? "العربية" : "English",
  };

  // تبديل اللغة مع الحفاظ على نفس الصفحة
  const toggleLang = () => {
    const p = location.pathname;
    if (isEn) {
      // من /en/... إلى النسخة العربية (بدون /en)
      const next = p.replace(/^\/en/, "") || "/";
      navigate(next + location.search);
    } else {
      // من العربية إلى /en...
      const next = p === "/" ? "/en" : `/en${p}`;
      navigate(next + location.search);
    }
  };

  return (
    <Box bg="gray.900" color="white" dir={dir} position="sticky" top="0" zIndex="1000">
      <Container maxW="6xl" px={{ base: 4, md: 8 }} py={3}>
        <Flex align="center" justify="space-between" gap={6} wrap="wrap">
          {/* الشعار */}
          <HStack>
            <Image src={logoSrc} alt="American Group" boxSize="80px" objectFit="contain" />
          </HStack>

          {/* الروابط */}
          <HStack spacing={{ base: 4, md: 6 }} flex="1" justify="center">
            <CLink as={NavLink} to={`${prefix}/`} end fontWeight="bold" _activeLink={{ color: "blue.300" }}>
              <HStack>
                <FaHome />
                <Text>{labels.home}</Text>
              </HStack>
            </CLink>

            <CLink as={NavLink} to={`${prefix}/services`} _activeLink={{ color: "blue.300" }}>
              <HStack>
                <FaTools />
                <Text>{labels.services}</Text>
              </HStack>
            </CLink>

            <CLink as={NavLink} to={`${prefix}/contact`} _activeLink={{ color: "blue.300" }}>
              <HStack>
                <FaPhoneAlt />
                <Text>{labels.contact}</Text>
              </HStack>
            </CLink>
          </HStack>

          {/* أزرار اليمين */}
          <HStack spacing={3}>
            <Button colorScheme="blue" borderRadius="full" px={6}>
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
