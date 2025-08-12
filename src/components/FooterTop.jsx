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

export default function FooterTop() {
  return (
    <Box bg="white" py={{ base: 4, md: 6 }} borderTop="1px solid" borderColor="gray.100">
      <Container maxW="1100px">
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 6, md: 8 }}
          alignItems="center"
          dir="rtl"
        >
          {/* تواصل معنا */}
          <HStack spacing={5} align="center">
            <Image
               src="/assets/operator 1.png"
              alt="Support"
              boxSize={{ base: "48px", md: "70px" }} // تم التصغير
              objectFit="contain"
            />

            <VStack spacing={2} align="start">
              <Heading as="h3" size="md" lineHeight="1.1">
                تواصل معنا
              </Heading>

              <HStack spacing={2} color="gray.600" fontSize="sm">
                <Icon as={FiMail} />
                <Link href="mailto:egyamerican6@gmail.com" _hover={{ color: "gray.800" }}>
                  egyamerican6@gmail.com
                </Link>
              </HStack>

              <HStack spacing={2} color="gray.600" fontSize="sm">
                <Icon as={FiPhone} transform="scaleX(-1)" />
                <Link href="tel:01211114528" _hover={{ color: "gray.800" }}>
                  01211114528
                </Link>
              </HStack>
            </VStack>
          </HStack>

          {/* العنوان الرئيسي */}
          <HStack spacing={5} align="center">
            <Image
              src="/assets/map 1.png"
              alt="Location"
              boxSize={{ base: "48px", md: "70px" }} // تم التصغير
              objectFit="contain"
            />

            <VStack spacing={2} align="start">
              <Heading as="h3" size="md" lineHeight="1.1">
                العنوان الرئيسي
              </Heading>

              <Text color="gray.600" fontSize="sm">
                شارع الهرم، أمام محطة مترو الجيزة،
              </Text>
              <Text color="gray.600" fontSize="sm">
                الهرم، الجيزة، مصر
              </Text>
            </VStack>
          </HStack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
