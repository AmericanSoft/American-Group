import React from "react";
import {
  Box,
  Container,
  SimpleGrid,
  HStack,
  VStack,
  Heading,
  Text,
  Link,
  Icon,
  Image,
} from "@chakra-ui/react";
import { FiMail, FiPhone } from "react-icons/fi";
import { useLocation } from "react-router-dom";

// النصوص بلغتين
const COPY = {
  ar: {
    dir: "rtl",
    contactTitle: "تواصل معنا",
    email: "egyamerican6@gmail.com",
    phone: "01211114528",
    addressTitle: "العنوان الرئيسي",
    addressLine1: "شارع الهرم، أمام محطة مترو الجيزة،",
    addressLine2: "الهرم، الجيزة، مصر",
  },
  en: {
    dir: "ltr",
    contactTitle: "Contact Us",
    email: "egyamerican6@gmail.com",
    phone: "01211114528",
    addressTitle: "Main Address",
    addressLine1: "Al-Haram Street, in front of Giza Metro Station,",
    addressLine2: "Al-Haram, Giza, Egypt",
  },
};

export default function FooterTop({ lang: forcedLang }) {
  const { pathname } = useLocation();
  const isEn = pathname.startsWith("/en");
  const lang = forcedLang || (isEn ? "en" : "ar");
  const t = COPY[lang];

  return (
    <Box bg="white" mt={20} py={{ base: 4, md: 6 }} borderTop="1px solid" borderColor="gray.100">
      <Container maxW="1100px">
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 6, md: 8 }}
          alignItems="center"
          dir={t.dir}
        >
          {/* Contact Section */}
          <HStack
            spacing={5}
            align={{ base: "center", md: "center" }}
            justify={{ base: "center", md: "flex-start" }} // 📌 موبايل Center
            textAlign={{ base: "center", md: "start" }}
          >
            <Image
              src="/assets/operator 1.png"
              alt={t.contactTitle}
              boxSize={{ base: "48px", md: "70px" }}
              objectFit="contain"
            />
            <VStack spacing={2} align={{ base: "center", md: "start" }}>
              <Heading as="h3" size="md" lineHeight="1.1">
                {t.contactTitle}
              </Heading>
              <HStack spacing={2} color="gray.600" fontSize="sm">
                <Icon as={FiMail} />
                <Link href={`mailto:${t.email}`} _hover={{ color: "gray.800" }}>
                  {t.email}
                </Link>
              </HStack>
              <HStack spacing={2} color="gray.600" fontSize="sm">
                <Icon as={FiPhone} transform="scaleX(-1)" />
                <Link href={`tel:${t.phone}`} _hover={{ color: "gray.800" }}>
                  {t.phone}
                </Link>
              </HStack>
            </VStack>
          </HStack>

          {/* Address Section */}
          <HStack
            spacing={5}
            align={{ base: "center", md: "center" }}
            justify={{ base: "center", md: "flex-start" }} // 📌 موبايل Center
            textAlign={{ base: "center", md: "start" }}
          >
            <Image
              src="/assets/map 1.png"
              alt={t.addressTitle}
              boxSize={{ base: "48px", md: "70px" }}
              objectFit="contain"
            />
            <VStack spacing={2} align={{ base: "center", md: "start" }}>
              <Heading as="h3" size="md" lineHeight="1.1">
                {t.addressTitle}
              </Heading>
              <Text color="gray.600" fontSize="sm">
                {t.addressLine1}
              </Text>
              <Text color="gray.600" fontSize="sm">
                {t.addressLine2}
              </Text>
            </VStack>
          </HStack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
