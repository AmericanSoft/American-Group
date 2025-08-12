import React, { useEffect, useMemo, useRef, useState } from "react";
import { Box, Container, Heading, Input, Button, HStack, VStack, Text, Image } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useRequestModal } from "../contexts/RequestModalContext";

const STRINGS = {
  ar: {
    title: "اعرف اكتر عن خدماتنا",
    placeholder: "ابحث عن جهازك",
    btn: "احجز صيانة الآن",
    empty: "لا توجد نتائج مطابقة.",
    dir: "rtl",
  },
  en: {
    title: "Learn more about our services",
    placeholder: "Search your device",
    btn: "Book Service Now",
    empty: "No matching results.",
    dir: "ltr",
  },
};

const normalize = (s) =>
  (s || "")
    .toLowerCase()
    .replace(/[إأآا]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ؤ|ئ/g, "ئ")
    .replace(/ة/g, "ه")
    .replace(/[^a-z0-9\u0600-\u06FF\s]/g, "")
    .trim();

const fetchWithTimeout = async (url, ms = 6000) => {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), ms);
  try {
    const res = await fetch(url, { cache: "no-cache", signal: controller.signal });
    if (!res.ok) throw new Error("HTTP " + res.status);
    try { return await res.json(); } catch { return JSON.parse(await res.text()); }
  } finally { clearTimeout(t); }
};

export default function BrandsSlider({
  json = "/brands.json",
  titleAr = STRINGS.ar.title,
  titleEn = STRINGS.en.title,
  placeholderAr = STRINGS.ar.placeholder,
  placeholderEn = STRINGS.en.placeholder,
  btnAr = STRINGS.ar.btn,
  btnEn = STRINGS.en.btn,
  ph = "https://americangroup-eg.com/wp-content/uploads/placeholder.png",
  lang: forcedLang,
  autoplayDelay = 3500,
  speed = 600,
}) {
  const { pathname } = useLocation();
  const isEn = pathname.startsWith("/en");
  const lang = forcedLang || (isEn ? "en" : "ar");
  const L = STRINGS[lang];

  const [brands, setBrands] = useState([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);

  const nextRef = useRef(null);
  const prevRef = useRef(null);
  const { open } = useRequestModal();

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const ver = "v1";
      const key = "brands_json_" + ver + "_" + btoa(json);
      let data = null;
      try {
        const cached = localStorage.getItem(key);
        if (cached) data = JSON.parse(cached);
      } catch {}
      try {
        if (!data) {
          data = await fetchWithTimeout(json, 6000);
          try { localStorage.setItem(key, JSON.stringify(data)); } catch {}
        }
        if (mounted) setBrands(Array.isArray(data) ? data : []);
      } catch (e) {
        if (mounted) setBrands([]);
        console.error("Brands JSON load failed:", e);
      } finally { if (mounted) setLoading(false); }
    })();
    return () => { mounted = false; };
  }, [json]);

  const filtered = useMemo(() => {
    const nq = normalize(q);
    if (!nq) return brands;
    return (brands || []).filter((b) => {
      const hay = [b?.name, b?.en, ...(b?.keywords || [])].map(normalize).join(" ");
      return hay.includes(nq) || hay.split(" ").some((w) => w.startsWith(nq));
    });
  }, [brands, q]);

  // أكبر slidesPerView = 4 → فعّل الـloop فقط لو عدد السلايدز أكبر من 4
  const slidesCount = filtered?.length || 0;
  const canLoop = slidesCount > 4;

  // الكارت باستايلك القديم تمامًا
  const Card = ({ b }) => (
    <Box
      position="relative"
      bg="#fff"
      border="1px solid #E7E9F2"
      borderRadius="22px"
      minH="350px"
      p="26px"
      pt="96px"
      display="flex"
      flexDir="column"
      alignItems="center"
      textAlign="center"
      boxShadow="0 16px 32px rgba(0,0,0,.08)"
    >
      <Box
        position="absolute"
        left="50%"
        transform="translateX(-50%)"
        top="-68px"
        w={{ base: "120px", md: "140px" }}
        h={{ base: "140px", md: "140px" }}
        borderRadius="50%"
        bg="#fff"
        display="grid"
        placeItems="center"
        border="1px solid #E7E9F2"
        boxShadow="0 12px 28px rgba(0,0,0,.12)"
      >
        <Image
          src={b?.logo || ph}
          onError={(e) => (e.currentTarget.src = ph)}
          alt={b?.en || b?.name || "brand"}
          w="100%"
          h="100%"
          objectFit="contain"
          p="12px"
          borderRadius="50%"
          bg="#fff"
        />
      </Box>

      <Box mt="10px" mb="10px">
        <Text as="strong" display="block" fontWeight="800" fontSize="22px" lineHeight="1.3" color="#0E0E0E">
          {lang === "ar" ? `صيانة ${b?.name}` : `${b?.en || b?.name} Maintenance`}
        </Text>
        {b?.en && (
          <Text mt="2px" fontWeight="700" fontSize="16px" color="#1f1f1f" letterSpacing=".2px" dir="ltr">
            {b.en}
          </Text>
        )}
      </Box>

      <Text color="#6A6D75" fontSize="16px" lineHeight="1.95" mb="18px">
        {lang === "ar"
          ? `لو عندك أي جهاز ${b?.name} فيه مشكلة اطلب صيانة دلوقتي`
          : `If any ${b?.en || b?.name} device has an issue, book service now.`}
      </Text>

      <Button
        as="a"
        href={b?.href || "#"}
        target={b?.href ? "_self" : undefined}
        rel="noopener"
        mt="auto"
        w="100%"
        h="56px"
        bg="#0B63FF"
        _hover={{ bg: "#0A53D4" }}
        color="#fff"
        fontWeight="800"
        fontSize="16px"
        borderRadius="12px"
        boxShadow="0 12px 26px rgba(11,99,255,.25)"
        onClick={() => open({ brand: b?.name, device: "" })}
      >
        {lang === "ar" ? btnAr : btnEn}
      </Button>
    </Box>
  );

  return (
    <Box
      as="section"
      dir={L.dir}
      py={{ base: 12, md: 16 }}
      px={4}
      bgImage={[
        "radial-gradient(900px 900px at 0% 10%, rgba(11,99,255,0.05) 1px, transparent 2px), radial-gradient(900px 900px at 120% 40%, rgba(11,99,255,0.05) 1px, transparent 2px)",
      ]}
      bgSize="120px 120px, 140px 140px"
    >
      <Container maxW="1248px" mx="auto">
        {/* العنوان */}
        <VStack spacing={4} mb={6}>
          <Box w="72px" h="6px" borderRadius="6px" bg="#0B63FF" />
          <Heading as="h2" m={0} fontWeight="800" fontSize={{ base: "32px", md: "48px" }} letterSpacing="-0.02em" color="#0E0E0E" textAlign="center">
            {lang === "ar" ? titleAr : titleEn}
          </Heading>
        </VStack>

        {/* البحث */}
        <Box maxW="560px" mx="auto" mb="6">
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={lang === "ar" ? placeholderAr : placeholderEn}
            h="60px"
            borderRadius="999px"
            border="1px solid #E3E6EF"
            bg="#fff"
            px="22px"
            fontSize="16px"
            color="#111"
            boxShadow="inset 0 6px 18px rgba(0,0,0,.05), 0 8px 20px rgba(0,0,0,.04)"
          />
        </Box>

        {/* أزرار السابق/التالي */}
        <HStack gap="10px" mb="3" justify={{ base: "center", md: "flex-start" }}>
          <Button
            ref={prevRef}
            w="42px"
            h="42px"
            borderRadius="12px"
            border="1px solid #E3E6EF"
            bg="#fff"
            boxShadow="0 6px 14px rgba(0,0,0,.06)"
            fontSize="22px"
            lineHeight="1"
            color="#1b1b1b"
            _hover={{ bg: "#F7FAFF", transform: "translateY(-1px)", boxShadow: "0 10px 20px rgba(0,0,0,.09)" }}
          >
            {L.dir === "rtl" ? "›" : "‹"}
          </Button>
          <Button
            ref={nextRef}
            w="42px"
            h="42px"
            borderRadius="12px"
            border="1px solid #E3E6EF"
            bg="#fff"
            boxShadow="0 6px 14px rgba(0,0,0,.06)"
            fontSize="22px"
            lineHeight="1"
            color="#1b1b1b"
            _hover={{ bg: "#F7FAFF", transform: "translateY(-1px)", boxShadow: "0 10px 20px rgba(0,0,0,.09)" }}
          >
            {L.dir === "rtl" ? "‹" : "›"}
          </Button>
        </HStack>

        {/* السلايدر */}
        <Box>
          <Swiper
            key={`${canLoop}-${slidesCount}`}
            modules={[Autoplay, Navigation]}
            slidesPerView={1}
            spaceBetween={20}
            loop={canLoop}
            speed={speed}
            autoplay={canLoop ? { delay: autoplayDelay, disableOnInteraction: false, pauseOnMouseEnter: true } : false}
            slidesPerGroup={1}
            allowTouchMove={slidesCount > 1}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = prevRef.current;
              swiper.params.navigation.nextEl = nextRef.current;
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            style={{ padding: "0 6px" }}
          >
            {loading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <SwiperSlide key={`skeleton-${i}`}>
                  {/* ➊ فراغ علوي داخل السلايد نفسه علشان الدائرة تبان كاملة */}
                  <Box pt="78px">
                    <Box
                      h="360px"
                      borderRadius="22px"
                      border="1px solid #E7E9F2"
                      bg="#fff"
                      boxShadow="0 16px 32px rgba(0,0,0,.08)"
                    />
                  </Box>
                </SwiperSlide>
              ))
            ) : filtered?.length ? (
              filtered.map((b, idx) => (
                <SwiperSlide key={`brand-${idx}-${b?.id ?? b?.slug ?? b?.en ?? b?.name ?? "x"}`}>
                  {/* ➋ نفس الفكرة: ندي السلايد نفسه paddingTop بدل ما نغيّر overflow */}
                  <Box pt="78px">
                    <Card b={b} />
                  </Box>
                </SwiperSlide>
              ))
            ) : (
              <SwiperSlide key="empty">
                <Box pt="78px" textAlign="center" color="gray.600" py={10}>
                  {L.empty}
                </Box>
              </SwiperSlide>
            )}
          </Swiper>
        </Box>
      </Container>
    </Box>
  );
}
