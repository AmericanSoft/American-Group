import React from "react";
import { useLocation } from "react-router-dom";
import {
  Box, Heading, Text, HStack, Flex, Avatar, Icon
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const TESTIMONIALS = [
  {
    quote: "كان عندي مشكلة في تكييف Carrier والتبريد كان ضعيف. تم تنظيف الوحدة وضبط الفريون.",
    name: "خالد سمير",
    role: "صاحب متجر",
    avatar: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
  },
  {
    quote: "ثلاجة White Westinghouse كانت بتسرب مية. الفني غيّر الترموستات ونضّف المواسير.",
    name: "سارة حسن",
    role: "معلمة",
    avatar: "https://cdn-icons-png.flaticon.com/128/2922/2922579.png",
  },
  {
    quote: "بوتاجاز Glem Gas الشعلة فيه ضعيفة. بعد التنظيف الشعلة بقت ثابتة.",
    name: "محمود علي",
    role: "محاسب",
    avatar: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
  },
  {
    quote: "مكيف Samsung كان بيقطع تبريد. بعد تنظيف الفلاتر وفحص الضاغط رجع يبرد بكفاءة.",
    name: "داليا يوسف",
    role: "مصممة",
    avatar: "https://cdn-icons-png.flaticon.com/128/2922/2922579.png",
  },
  {
    quote: "غسالة LG كانت بتقف في نص الدورة. استبدلوا حساس الباب وبقت تمام.",
    name: "عمر خليل",
    role: "رائد أعمال",
    avatar: "https://cdn-icons-png.flaticon.com/128/149/149071.png",
  },
];

export default function TestimonialsSlider({ lang, autoplay = true }) {
  const { pathname } = useLocation();
  const isEn = (lang || (pathname.startsWith("/en") ? "en" : "ar")) === "en";
  const dir = isEn ? "ltr" : "rtl";

  const title = isEn ? "What our customers say" : "آراء عملائنا";
  const subtitle = isEn
    ? "Some of our customers’ feedback about our services"
    : "بعض من آراء عملائنا حول خدماتنا ومدى رضاهم عنها";

  return (
    <Box as="section" dir={dir} maxW="1300px" mx="auto" mt={12} px={5}>
      <Heading as="h2" size="lg" textAlign="center" color="gray.800" mb={2}>
        {title}
      </Heading>
      <Text textAlign="center" color="gray.500" mb={8}>
        {subtitle}
      </Text>

      <Box
  sx={{
    ".swiper-slide": { height: "auto" },
    ".swiper-pagination": {
      position: "static",      // ننزّلها تحت المحتوى
      marginTop: "24px",       // المسافة قبل الدوتس
    },
    ".swiper-pagination-bullet": {
      background: "#1f4c8f",
      opacity: 0.4,
      transition: "0.3s",
    },
    ".swiper-pagination-bullet-active": {
      opacity: 1,
      width: "20px",
      borderRadius: "10px",
    },
  }}
      >
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={3}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          autoplay={
            autoplay ? { delay: 3500, disableOnInteraction: false } : false
          }
        >
          {TESTIMONIALS.map((t, i) => (
            <SwiperSlide key={i}>
              <Box
                bg="white"
                p={12}
                rounded="xl"
                boxShadow="0 10px 25px rgba(0,0,0,0.06)"
                textAlign="center"
                h="100%"
              >
                <HStack justify="center" spacing={1} color="yellow.400" mb={4}>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Icon as={StarIcon} key={j} />
                  ))}
                </HStack>

                <Text color="gray.700" fontSize="md" lineHeight="1.8" mb={6}>
                  “{t.quote}”
                </Text>

                <Flex align="center" justify="center" gap={3}>
                  <Avatar size="sm" src={t.avatar} name={t.name} />
                  <Box textAlign={dir === "rtl" ? "right" : "left"}>
                    <Text fontWeight="bold" color="gray.800">
                      {t.name}
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                      {t.role}
                    </Text>
                  </Box>
                </Flex>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
}
