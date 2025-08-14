import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  HStack,
  VStack,
  Text,
  Link as ChakraLink,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import FooterBottom from "./FooterBottom";

const COPY = {
  ar: {
    dir: "rtl",
    brand: "الأمريكية جروب",
    companyDesc:
      "الأمريكية جروب هي شركة رائدة في مجال الأجهزة المنزلية وحلول الصيانة المتكاملة، تقدم خدمات معتمدة ومعايير جودة عالية لتلبية احتياجات العملاء في جميع أنحاء مصر. نحرص على توفير أفضل المنتجات وقطع الغيار الأصلية، مع دعم فني متواصل يضمن راحة بالك وأداء مثالي لأجهزتك.",
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
      "American Group is a leading company in the field of home appliances and comprehensive maintenance solutions, providing certified services and high-quality standards to meet customers' needs across Egypt. We are committed to offering the best products and original spare parts, with continuous technical support to ensure your peace of mind and optimal performance for your devices.",
    mainPagesTitle: "Main Pages",
    home: "Home",
    services: "Maintenance Services",
    about: "About Us",
    policiesTitle: "Policies & Privacy",
    policies: "Policies",
    contactTitle: "Contact Us",
  },
};

export default function Footer({
  lang: forcedLang,
  footerBg = "/assets/FooterImgg.png",
  logoSrc = "/assets/logo.png",
  logoTry = ["/assets/my-logo.png", "/assets/american-logo.png", "/assets/logo.png"],
}) {
  const location = useLocation();
  const navigate = useNavigate();
  const isEn = location.pathname.startsWith("/en");
  const prefix = isEn ? "/en" : "";
  const lang = forcedLang || (isEn ? "en" : "ar");
  const t = COPY[lang];

  // موبايل؟
  const isMobile = useBreakpointValue({ base: true, md: false });

  // محاذاة ريسبونسف: موبايل سنتر، دسك توب يمين/شمال حسب اللغة
  const textAlignProp = useBreakpointValue({
    base: "center",
    md: lang === "ar" ? "right" : "left",
  });

  // اتجاه بلوك اللوجو: موبايل عمودي، دسك توب صف عادي (من غير row-reverse)
  const logoBlockDirection = useBreakpointValue({
    base: "column-reverse",
    md: "row",
  });

  // جرّب مسارات متعددة للّوجو
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
            const img = new window.Image();
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
    const headerOffset = 90;
    const y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      setTimeout(() => scrollWithOffsetById(id), 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.hash]);

  const homePath = `${prefix}/`;
  const handleHomeClick = (e) => {
    if (location.pathname === homePath) {
      e.preventDefault();
      window.history.replaceState(null, "", homePath);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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

  const policiesPath = `${prefix}/policies`;
  const handlePoliciesClick = (e) => {
    if (location.pathname === policiesPath) {
      e.preventDefault();
      window.history.replaceState(null, "", policiesPath);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <Box
        as="footer"
        dir={t.dir}
        color="white"
        bgImage={footerBg ? `url('${footerBg}')` : "none"}
        bgSize="cover"
        bgPosition="center"
        px={{ base: 4, sm: 6, md: 8 }}
        py={{ base: 6, sm: 8, md: 10, lg: 14 }}
      >
        <Container maxW="7xl">
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 6, md: 8, lg: 10 }}>
            {/* Logo + Description */}
            <Stack spacing={4} align={isMobile ? "center" : "stretch"} textAlign={textAlignProp}>
              <HStack
                spacing={{ base: 2, md: 3 }}
                align="center"
                justify={{ base: "center", md: "flex-start" }} // في RTL flex-start = يمين، و LTR = شمال
                flexDirection={logoBlockDirection}
                w="full"
              >
                <Text as="h3" m={0} fontSize={{ base: "lg", md: "xl" }} fontWeight="extrabold">
                  {t.brand}
                </Text>
                {resolvedLogo ? (
                  <Image
                    src={resolvedLogo}
                    alt={lang === "en" ? "American Logo" : "شعار الأمريكية جروب"}
                    loading="lazy"
                    maxW={{ base: "140px", md: "180px" }}
                    objectFit="contain"
                  />
                ) : null}
              </HStack>

              <Text
                fontSize={{ base: "sm", md: "md" }}
                lineHeight="1.9"
                color="whiteAlpha.800"
                maxW={{ base: "full", md: "720px" }}
                mx={{ base: "auto", md: "unset" }}
              >
                {t.companyDesc}
              </Text>
            </Stack>

            {/* Main Pages */}
            <Stack spacing={3} textAlign={textAlignProp} align={isMobile ? "center" : "stretch"}>
              <Text as="h3" fontSize="lg" fontWeight="bold">
                {t.mainPagesTitle}
              </Text>
              <VStack align={isMobile ? "center" : "stretch"} spacing={1}>
                <ChakraLink
                  as={RouterLink}
                  to={homePath}
                  onClick={handleHomeClick}
                  px={2}
                  py={2}
                  rounded="md"
                  _hover={{ bg: "whiteAlpha.200" }}
                  w={isMobile ? "full" : "auto"}
                >
                  {t.home}
                </ChakraLink>

                <ChakraLink
                  href={`${prefix}/#services-section`}
                  onClick={(e) => handleAnchorClick(e, "services-section")}
                  px={2}
                  py={2}
                  rounded="md"
                  _hover={{ bg: "whiteAlpha.200" }}
                  w={isMobile ? "full" : "auto"}
                >
                  {t.services}
                </ChakraLink>
              </VStack>
            </Stack>

            {/* Policies + Contact */}
            <Stack spacing={4} textAlign={textAlignProp} align={isMobile ? "center" : "stretch"}>
              <Stack spacing={3}>
                <Text as="h3" fontSize="lg" fontWeight="bold">
                  {t.policiesTitle}
                </Text>
                <ChakraLink
                  as={RouterLink}
                  to={policiesPath}
                  onClick={handlePoliciesClick}
                  px={2}
                  py={2}
                  rounded="md"
                  _hover={{ bg: "whiteAlpha.200" }}
                  w={isMobile ? "full" : "auto"}
                >
                  {t.policies}
                </ChakraLink>
              </Stack>

              <Stack spacing={3} pt={{ base: 2, md: 4 }}>
                <Text as="h3" fontSize="lg" fontWeight="bold">
                  {t.contactTitle}
                </Text>
                <HStack spacing={3} justify={isMobile ? "center" : "flex-start"}>
                  <ChakraLink
                    href="mailto:egyamircan6@gmail.com"
                    aria-label="Email"
                    w="44px"
                    h="44px"
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    rounded="lg"
                    bg="whiteAlpha.200"
                    _hover={{ transform: "translateY(-1px)", bg: "whiteAlpha.300" }}
                    transition="all .15s ease"
                  >
                    <Image src="https://img.icons8.com/color/48/gmail-new.png" alt="Gmail" boxSize="24px" />
                  </ChakraLink>

                  <ChakraLink
                    href="https://wa.me/201211114528"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="WhatsApp"
                    w="44px"
                    h="44px"
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    rounded="lg"
                    bg="whiteAlpha.200"
                    _hover={{ transform: "translateY(-1px)", bg: "whiteAlpha.300" }}
                    transition="all .15s ease"
                  >
                    <Image src="https://img.icons8.com/color/48/whatsapp--v1.png" alt="WhatsApp" boxSize="24px" />
                  </ChakraLink>

                  <ChakraLink
                    href="https://www.facebook.com/americangruop/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Facebook"
                    w="44px"
                    h="44px"
                    display="inline-flex"
                    alignItems="center"
                    justifyContent="center"
                    rounded="lg"
                    bg="whiteAlpha.200"
                    _hover={{ transform: "translateY(-1px)", bg: "whiteAlpha.300" }}
                    transition="all .15s ease"
                  >
                    <Image src="https://img.icons8.com/color/48/facebook.png" alt="Facebook" boxSize="24px" />
                  </ChakraLink>
                </HStack>
              </Stack>
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>

      {/* شريط الشعارات السفلي */}
      <FooterBottom
        gap={isMobile ? 24 : 64}
        logoH={isMobile ? 38 : 70}
        duration={isMobile ? 14 : 10}
        px={isMobile ? 2 : 0}
        py={isMobile ? 3 : 4}
        softEdges
        pauseOnHover={!isMobile}
      />
    </>
  );
}
