// // src/components/Header.jsx
// import React from "react";
// import {
//   Box,
//   Container,
//   Flex,
//   HStack,
//   Link as CLink,
//   Button,
//   Image,
//   Text,
// } from "@chakra-ui/react";
// import { Link as RouterLink, NavLink, useLocation, useNavigate } from "react-router-dom";
// import { FaHome, FaTools, FaPhoneAlt, FaGlobe, FaShieldAlt } from "react-icons/fa";

// const logoSrc = "/assets/logo.png";

// export default function Header() {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const isEn = location.pathname.startsWith("/en");
//   const lang = isEn ? "en" : "ar";
//   const dir = isEn ? "ltr" : "rtl";
//   const prefix = isEn ? "/en" : "";

//   const labels = {
//     home: isEn ? "Home" : "الرئيسية",
//     services: isEn ? "Services" : "خدمات الصيانة",
//     contact: isEn ? "Contact Us" : "تواصل معنا",
//     policies: isEn ? "politics" : "السياسات",
//     consult: isEn ? "Free Consultation" : "استشارة مجانية",
//     switch: isEn ? "العربية" : "English",
//   };

//   const toggleLang = () => {
//     const p = location.pathname;
//     if (isEn) {
//       const next = p.replace(/^\/en/, "") || "/";
//       navigate(next + location.search);
//     } else {
//       const next = p === "/" ? "/en" : `/en${p}`;
//       navigate(next + location.search);
//     }
//   };

//   return (
//     <Box bg="gray.900" color="white" dir={dir} position="sticky" top="0" zIndex="1000">
//       <Container maxW="6xl" px={{ base: 4, md: 8 }} py={3}>
//         <Flex align="center" justify="space-between" gap={6} wrap="wrap">
//           {/* الشعار */}
//           <HStack>
//             <Image src={logoSrc} alt="American Group" boxSize="80px" objectFit="contain" />
//           </HStack>

//           {/* الروابط */}
//           <HStack spacing={{ base: 4, md: 6 }} flex="1" justify="center">
//             <CLink as={NavLink} to={`${prefix}/`} end fontWeight="bold" _activeLink={{ color: "blue.300" }}>
//               <HStack><FaHome /><Text>{labels.home}</Text></HStack>
//             </CLink>

//             <CLink as={NavLink} to={`${prefix}/services`} _activeLink={{ color: "blue.300" }}>
//               <HStack><FaTools /><Text>{labels.services}</Text></HStack>
//             </CLink>

//             <CLink as={NavLink} to={`${prefix}/contact`} _activeLink={{ color: "blue.300" }}>
//               <HStack><FaPhoneAlt /><Text>{labels.contact}</Text></HStack>
//             </CLink>

//             {/* الجديد: صفحة السياسات */}
//             <CLink as={NavLink} to={`${prefix}/politics`} _activeLink={{ color: "blue.300" }}>
//               <HStack><FaShieldAlt /><Text>{labels.policies}</Text></HStack>
//             </CLink>
//           </HStack>

//           {/* أزرار اليمين */}
//           <HStack spacing={3}>
//             <Button colorScheme="blue" borderRadius="full" px={6}>
//               {labels.consult}
//             </Button>
//             <Button
//               variant="outline"
//               borderRadius="full"
//               borderColor="blue.300"
//               color="blue.300"
//               _hover={{ bg: "blue.300", color: "white" }}
//               onClick={toggleLang}
//               leftIcon={<FaGlobe />}
//             >
//               {labels.switch}
//             </Button>
//           </HStack>
//         </Flex>
//       </Container>
//     </Box>
//   );
// }
// src/components/Header.jsx
import React from "react";
import {
  Box,
  Container,
  Flex,
  HStack,
  VStack,
  Link as CLink,
  Button,
  IconButton,
  Image,
  Text,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  Link as RouterLink,
  NavLink,
  useLocation,
  useNavigate,
} from "react-router-dom";
import {
  FaHome,
  FaTools,
  FaPhoneAlt,
  FaGlobe,
  FaShieldAlt,
  FaBars,
} from "react-icons/fa";

const logoSrc = "/assets/logo.png";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const isEn = location.pathname.startsWith("/en");
  const lang = isEn ? "en" : "ar";
  const dir = isEn ? "ltr" : "rtl";
  const prefix = isEn ? "/en" : "";

  const labels = {
    home: isEn ? "Home" : "الرئيسية",
    services: isEn ? "Services" : "خدمات الصيانة",
    contact: isEn ? "Contact Us" : "اتصل بنا",
    policies: isEn ? "Policies" : "السياسات",
    consult: isEn ? "Free Consultation" : "استشارة مجانية",
    switch: isEn ? "العربية" : "English",
    menu: isEn ? "Menu" : "القائمة",
  };

  const toggleLang = () => {
    const p = location.pathname;
    if (isEn) {
      const next = p.replace(/^\/en/, "") || "/";
      navigate(next + location.search);
    } else {
      const next = p === "/" ? "/en" : `/en${p}`;
      navigate(next + location.search);
    }
  };

  // Drawer (mobile)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  // عنصر رابط موحد
  const NavItem = ({ to, icon, children, onClick }) => (
    <CLink
      as={NavLink}
      to={to}
      onClick={onClick}
      end={to === `${prefix}/`}
      _activeLink={{
        bg: "blue.700",
        color: "white",
      }}
      px={4}
      py={3}
      borderRadius="lg"
      fontWeight="700"
      display="flex"
      alignItems="center"
      gap={3}
      _hover={{ bg: "blue.50", color: "blue.700" }}
    >
      {icon}
      <Text>{children}</Text>
    </CLink>
  );

  return (
    <Box bg="gray.900" color="white" dir={dir} position="sticky" top="0" zIndex="1000">
      <Container maxW="6xl" px={{ base: 4, md: 8 }} py={3}>
        {/* شريط علوي */}
        <Flex align="center" justify="space-between" gap={6}>
          {/* موبايل: زرار Menu  |  لوجو في الجهة المقابلة */}
          {isMobile ? (
            <>
              {/* زرار Menu أزرق */}
              <Button
                onClick={onOpen}
                leftIcon={<FaBars />}
                bg="#154BA7"
                _hover={{ bg: "#0F3E8F" }}
                color="white"
                borderRadius="lg"
                px={5}
                h="42px"
              >
                {labels.menu}
              </Button>

              {/* اللوجو */}
              <Image
                src={logoSrc}
                alt="American Group"
                boxSize="74px"
                objectFit="contain"
              />
            </>
          ) : (
            // ديسكتوب: لوجو + روابط + أزرار
            <>
              {/* اللوجو */}
              <HStack>
                <Image src={logoSrc} alt="American Group" boxSize="80px" objectFit="contain" />
              </HStack>

              {/* الروابط (منتصف الشريط) */}
              <HStack spacing={8} flex="1" justify="center" fontWeight="700">
                <CLink
                  as={NavLink}
                  to={`${prefix}/`}
                  end
                  _activeLink={{ color: "blue.300" }}
                >
                  <HStack>
                    <FaHome />
                    <Text>{labels.home}</Text>
                  </HStack>
                </CLink>

                <CLink
                  as={NavLink}
                  to={`${prefix}/services`}
                  _activeLink={{ color: "blue.300" }}
                >
                  <HStack>
                    <FaTools />
                    <Text>{labels.services}</Text>
                  </HStack>
                </CLink>

                <CLink
                  as={NavLink}
                  to={`${prefix}/contact`}
                  _activeLink={{ color: "blue.300" }}
                >
                  <HStack>
                    <FaPhoneAlt />
                    <Text>{labels.contact}</Text>
                  </HStack>
                </CLink>

                <CLink
                  as={NavLink}
                  to={`${prefix}/politics`}
                  _activeLink={{ color: "blue.300" }}
                >
                  <HStack>
                    <FaShieldAlt />
                    <Text>{labels.policies}</Text>
                  </HStack>
                </CLink>
              </HStack>

              {/* أزرار يمين */}
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
            </>
          )}
        </Flex>
      </Container>

      {/* Drawer (القائمة على الموبايل) */}
      <Drawer placement={isEn ? "left" : "right"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton color="white" />
          <DrawerHeader
            bg="#154BA7"
            color="white"
            borderBottomWidth="1px"
            fontWeight="800"
          >
            {labels.menu}
          </DrawerHeader>

          <DrawerBody p={4}>
            <VStack align="stretch" spacing={3}>
              <NavItem to={`${prefix}/`} icon={<FaHome />} onClick={onClose}>
                {labels.home}
              </NavItem>

              <NavItem to={`${prefix}/services`} icon={<FaTools />} onClick={onClose}>
                {labels.services}
              </NavItem>

              <NavItem to={`${prefix}/contact`} icon={<FaPhoneAlt />} onClick={onClose}>
                {labels.contact}
              </NavItem>

              <NavItem to={`${prefix}/politics`} icon={<FaShieldAlt />} onClick={onClose}>
                {labels.policies}
              </NavItem>

              {/* زر استشارة مجانية داخل القائمة */}
              <Button
                mt={2}
                bg="#154BA7"
                _hover={{ bg: "#0F3E8F" }}
                color="white"
                h="46px"
                borderRadius="lg"
                onClick={onClose}
              >
                {labels.consult}
              </Button>

              {/* زر تغيير اللغة */}
              <Button
                variant="outline"
                borderColor="#154BA7"
                color="#154BA7"
                leftIcon={<FaGlobe />}
                h="46px"
                borderRadius="lg"
                onClick={() => {
                  onClose();
                  toggleLang();
                }}
              >
                {labels.switch}
              </Button>
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
}
