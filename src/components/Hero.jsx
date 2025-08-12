import { Box, Container, HStack, VStack, Button, Text, Badge } from "@chakra-ui/react";
import { SearchIcon, StarIcon } from "@chakra-ui/icons";
import { useLocation } from "react-router-dom";
import { useRequestModal } from "../contexts/RequestModalContext";

const STRINGS = {
  ar: {
    badge: "مركز صيانة معتمد",
    titleL1: "الامريكية جروب لصيانة منتجات الاجهزة",
    titleL2: "المنزلية في مصر",
    cta: "أحجز صيانة الآن",
    dir: "rtl",
    align: "center",
  },
  en: {
    badge: "Authorized Service Center",
    titleL1: "American Group for Home Appliances",
    titleL2: "Maintenance in Egypt",
    cta: "Book Service Now",
    dir: "ltr",
    align: "center",
  },
};

export default function Hero({ lang: forcedLang }) {
  const { pathname } = useLocation();
  const isEnPath = pathname.startsWith("/en");
  const lang = forcedLang || (isEnPath ? "en" : "ar");
  const t = STRINGS[lang];
  const { open } = useRequestModal();

  return (
    <Box
      as="section"
      color="white"
      bgGradient="linear(to-b, gray.900, gray.800)"
      position="relative"
      minH={{ base: "70vh", md: "80vh" }} // ارتفاع مرن
      display="grid"
      placeItems="center" // سنتر رأسي وأفقي
      overflow="hidden"
      px={4}
      dir={t.dir}
      _before={{
        content: '""',
        position: "absolute",
        inset: 0,
        opacity: 0.15,
        bgImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.08) 0 2px, transparent 2px 16px)",
        pointerEvents: "none",
        zIndex: 0, // خلف المحتوى
      }}
    >
      <Container maxW="6xl" zIndex={1}>
        {/* badge */}
        <HStack justify="center" mb={4}>
          <Badge
            px={4}
            py={4}
            borderRadius="full"
            bg="gray.700"
            color="white"
            fontWeight="semibold"
            display="inline-flex"
            alignItems="center"
            gap={2}
          >
            {t.badge}
            <StarIcon color="yellow.300" />
          </Badge>
        </HStack>

        {/* title + CTA */}
        <VStack spacing={12} align="center">
          <Text
            as="h1"
            textAlign={t.align}
            fontWeight="800"
            lineHeight="1.2"
            mt={2}
            fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}
          >
            {t.titleL1}
            <br />
            {t.titleL2}
          </Text>

          <Button colorScheme="blue" size="lg" borderRadius="xl" px={8} height="50px" onClick={() => open({})}>
            {t.cta}
          </Button>
        </VStack>
      </Container>
    </Box>
  );
}
