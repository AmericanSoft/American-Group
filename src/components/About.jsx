import React from "react";
import {
  Box, Container, Grid, GridItem, Heading, Text, Button, Image, VStack
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
// ✅ استيراد الهوك لفتح المودال — عدّل المسار حسب مشروعك
import { useRequestModal } from "../contexts/RequestModalContext"; // <-- عدّل المسار

const aboutSrc = "/assets/About.png";
const COPY = {
  ar: {
    title: "من نحن ؟",
    p1: "تأسست شركة أمريكان جروب لتكون واحدة من أبرز الشركات المتخصصة في مجال التوكيلات التجارية وتوزيع الأجهزة المنزلية في السوق المصري. على مدار سنوات من العمل الجاد والابتكار، نجحنا في بناء سمعة قوية قائمة على الثقة، الجودة، وخدمة العملاء المميزة.",
    p2: "نحرص على تقديم أحدث المنتجات التي تلبي تطلعات عملائنا، مع التركيز على توفير حلول متكاملة تشمل البيع، التركيب، وخدمات ما بعد البيع، مدعومة بفريق عمل محترف ومدرب على أعلى المستويات. رؤيتنا تتمثل في أن نكون الخيار الأول للأسر المصرية الباحثة عن الراحة، الجودة، والتصميم العصري.",
    cta: "احجز صيانة الآن",
    imgAlt: "فني صيانة",
    dir: "rtl",
  },
  en: {
    title: "About Us",
    p1: "American Group has grown into one of Egypt’s leading companies in agency distribution and home appliances. Through years of hard work and innovation, we’ve built a strong reputation based on trust, quality, and outstanding customer service.",
    p2: "We deliver the latest products that meet customer expectations, offering integrated solutions including sales, installation, and after-sales support—powered by a highly trained professional team. Our vision is to be the first choice for families seeking comfort, quality, and modern design.",
    cta: "Book Service Now",
    imgAlt: "Service Technician",
    dir: "ltr",
  },
};

export default function About({
  lang: forcedLang,
  image = aboutSrc,
  onCta = () => {},
}) {
  const { pathname } = useLocation();
  const isEn = pathname.startsWith("/en");
  const lang = forcedLang || (isEn ? "en" : "ar");
  const t = COPY[lang];

  // ✅ جيب دالة open من الكونتكست
  const { open } = useRequestModal?.() || { open: () => {} };

  return (
    <Box
      as="section"
      dir={t.dir}
      bgImage={[
        "radial-gradient(900px 900px at 0% 10%, rgba(11,99,255,0.05) 1px, transparent 2px), radial-gradient(900px 900px at 120% 40%, rgba(11,99,255,0.05) 1px, transparent 2px)"
      ]}
      bgSize="120px 120px, 140px 140px"
      py={{ base: 10, md: 16 }}
      px={4}
    >
      <Container maxW="6xl">
        {/* العنوان مع الشُرطة العلوية */}
<Box 
  textAlign={{ base: "center", md: "start" }}
  mb={8}
  position="relative"
  display={{ base: "block", md: "inline-block"  }} // 📌 خليها block على الموبايل
>
  <Heading
    as="h2"
    fontWeight="800"
    fontSize={{ base: "28px", md: "44px" }}
    color="gray.900"
    textAlign={{ base: "center", md: "start" }} // 📌 نفس الفكرة للعنوان
  >
    {t.title}
  </Heading>
  <Box
    position="absolute"
    {...(t.dir === "rtl" ? { right: 0 } : { left: 0 })}
    top="-10px"
    w="64px"
    h="6px"
    bg="#0b63ff"
    borderRadius="6px"
  />
</Box>


        {/* الشبكة */}
<Grid
  templateColumns={{ base: "1fr", md: "1.05fr 1fr" }}
  alignItems="center"
  gap={{ base: 7, md: 6 }}
>
  {/* الصورة */}
  <GridItem order={{ base: 1, md: 2 }}>
    <Image
      src={image}
      alt={t.imgAlt}
      w="100%"
      maxH="520px"
      objectFit="cover"
      borderRadius="18px"
      boxShadow="0 18px 40px rgba(0,0,0,0.12)"
    />
  </GridItem>

  {/* النص */}
  <GridItem order={{ base: 2, md: 1 }}>
    <VStack align="stretch" spacing={4}>
      <Box
        position="relative"
        {...(t.dir === "rtl"
          ? { pr: { base: 0, md: 6 } }
          : { pl: { base: 0, md: 6 } })}
      >
        <Box
          display={{ base: "none", md: "block" }}
          position="absolute"
          {...(t.dir === "rtl" ? { right: 0 } : { left: 0 })}
          top="10px"
          bottom="160px"
          w="6px"
          borderRadius="6px"
          bg="#0b63ff"
        />
        <Text color="gray.600" lineHeight="2" fontSize="18px" mb={2}>
          {t.p1}
        </Text>
        <Text color="gray.600" lineHeight="2" fontSize="18px">
          {t.p2}
        </Text>
      </Box>

      <Button
        className="my-custom-class"
        onClick={() => {
          try {
            onCta?.();
          } catch {}
          open?.({ brand: "", device: "" });
        }}
        alignSelf={{ base: "center", md: "flex-start" }}
        bg="#0b63ff"
        _hover={{ bg: "#0a53d4" }}
        color="white"
        fontWeight="800"
  fontSize="20px"       
  px={8}               
  py={8}             
  borderRadius="14px"   

        boxShadow="0 10px 22px rgba(11,99,255,0.25)"
      >
        {t.cta}
      </Button>
    </VStack>
  </GridItem>
</Grid>

      </Container>
    </Box>
  );
}
