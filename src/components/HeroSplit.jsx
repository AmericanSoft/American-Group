// src/components/HeroSplit.jsx
import React from "react";
import {
  Box, Container, Grid, GridItem, Heading, Text, HStack, Button, Image
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
// 👇 عدّل المسار حسب مكان الملف عندك
import { useRequestModal } from "../contexts/RequestModalContext";

export default function HeroSplit({
  lang: forcedLang,                    // "ar" | "en" | undefined
  imageSrc = "/assets/features.png",
  primaryHref = "#",
  secondaryHref = "#",
  onPrimary,
  onSecondary,
  brandName = "",                      // ✅ جديدة: اسم البراند لو عايز تبعته للمودال
}) {
  const { pathname } = useLocation();
  const isEn = (forcedLang || (pathname.startsWith("/en") ? "en" : "ar")) === "en";
  const { open } = useRequestModal();  // ✅ هانستخدمها لفتح المودال

  const t = isEn
    ? {
        dir: "ltr",
        accentLabel: "American Group",
        titleRest: "Partners’ Authorized Agent",
        sub: (
          <>
            American Group for <strong>home appliances maintenance</strong> — Authorized for:
            Glem Gas, Fagor, Daewoo, Westinghouse, Carrier, LG, Toshiba.
            Most requested: <strong>Fridges, Washers, Cookers/Ovens, Microwaves, Deep Freezers, Water Heaters, ACs</strong> — fast home visit, genuine parts, and <strong>warranty</strong>.
          </>
        ),
        primary: "Book Service Now",
        ghost: "Free Consultation",
        textAlign: "left",
      }
    : {
        dir: "rtl",
        accentLabel: "الامريكية جروب",
        titleRest: "وكيل شركاء النجاح",
        sub: (
          <>
            الأمريكية جروب لخدمات <strong>صيانة الأجهزة المنزلية</strong> المعتمدة لعلامات:
            جليم جاز، فاجور، دايو، وستنجهاوس، كراير، إل-جي، وتوشيبا.
            نخدم الأكثر طلبًا: <strong>ثلاجات، غسالات، بوتاجازات/أفران، ميكروويف، ديب فريزر، سخانات، ومكيفات</strong> —
            زيارة منزلية سريعة، قطع غيار أصلية، و<strong>ضمان على الإصلاح</strong>.
          </>
        ),
        primary: "احجز صيانة الآن",
        ghost: "استشارة مجانية",
        textAlign: "right",
      };

  return (
    <Box as="section" dir={t.dir} bg="white" py={{ base: 8, md: 12 }}>
      <Container maxW="6xl">
        <Grid
          templateAreas={{ base: `"text" "image"`, md: `"text image"` }}
          templateColumns={{ base: "1fr", md: "1fr 1fr" }}
          gap={{ base: 8, md: 12 }}
          alignItems="center"
        >
          {/* النص */}
          <GridItem area="text">
            <Box textAlign={t.textAlign}>
              <Box as="span" display="inline-block" w="72px" h="6px" borderRadius="6px" bg="#0B63FF" mb={4} />

              <Heading
                as="h1"
                lineHeight="1.22"
                fontWeight="800"
                fontSize={{ base: "30px", md: "42px", lg: "50px" }}
                color="gray.900"
                mb={3}
              >
                <Box as="span" display="block" color="#0B63FF" fontWeight="800" fontSize={{ base: "28px", md: "36px", lg: "42px" }}>
                  {t.accentLabel}
                </Box>
                {t.titleRest}
              </Heading>

              <Text color="#6B7180" fontSize="17px" lineHeight="32px" mb={6}>
                {t.sub}
              </Text>

              <HStack spacing={3} justify="flex-start" flexWrap="wrap">
                {/* ✅ زرار الحجز — أضفت className وفتح المودال شغال */}
                <Button
                  as="a"
                  href={primaryHref}
                  onClick={(e) => {
                    onPrimary?.(e);
                    // افتح المودال مع البراند (لو مبعوت) + device فاضي
                    open({ brand: brandName || "", device: "" });
                  }}
                  className="btn-main"
                  h="56px"
                  px="24px"
                  borderRadius="12px"
                  fontWeight="800"
                  bg="#0B63FF"
                  color="#fff"
                  boxShadow="0 12px 26px rgba(11,99,255,.25)"
                  _hover={{ bg: "#0A53D4", transform: "translateY(-1px)" }}
                >
                  {t.primary}
                </Button>

                <Button
                  as="a"
                  href={secondaryHref}
                  onClick={onSecondary}
                  h="56px"
                  px="24px"
                  borderRadius="12px"
                  fontWeight="800"
                  bg="white"
                  color="#171a21"
                  border="2px solid #E7EAF2"
                  _hover={{ bg: "#F8FAFF", borderColor: "#D9DEEA" }}
                >
                  {t.ghost}
                </Button>
              </HStack>
            </Box>
          </GridItem>

          {/* الصورة */}
          <GridItem area="image">
            <Box>
              <Image
                src={imageSrc}
                alt={isEn ? "Home appliances" : "أجهزة منزلية"}
                w="100%"
                objectFit="cover"
                borderRadius="18px"
              />
            </Box>
          </GridItem>
        </Grid>
      </Container>
    </Box>
  );
}
