// src/components/request/StepConfirm.jsx
import React from "react";
import { VStack, Text, Button, Box, Icon, Divider } from "@chakra-ui/react";
import { CheckCircleIcon, CloseIcon } from "@chakra-ui/icons";

export default function StepConfirm({ name, isEn, onClose }) {
  return (
    <Box
      role="status"
      aria-live="polite"
      bgGradient={isEn ? "linear(to-b, blue.50, white)" : "linear(to-b, blue.50, white)"}
      _dark={{ bgGradient: "linear(to-b, gray.800, gray.900)" }}
      borderRadius="2xl"
      boxShadow="xl"
      px={{ base: 6, md: 10 }}
      py={{ base: 8, md: 10 }}
      textAlign={isEn ? "left" : "right"}
      dir={isEn ? "ltr" : "rtl"}
    >
      <VStack spacing={4} align="center">
        <Icon as={CheckCircleIcon} boxSize={16} color="green.400" />
        <Text fontSize="2xl" fontWeight="extrabold">
          {isEn ? "We received your request" : "استلمنا طلبك"}
        </Text>

        <Text fontSize="lg" color="gray.600" _dark={{ color: "gray.300" }}>
          {isEn ? "Thanks," : "شكرًا يا"}{" "}
          <Text as="span" fontWeight="bold" bgGradient="linear(to-r, blue.500, teal.400)" bgClip="text">
            {name || (isEn ? "dear customer" : "عميلنا العزيز")}
          </Text>
          {isEn ? ". Our team will contact you shortly." : "، فريقنا هيتواصل معاك قريبًا."}
        </Text>

        <Divider my={2} />

        <Button
          onClick={onClose}
          colorScheme="blue"
          leftIcon={<CloseIcon boxSize="0.75em" />}
          size="lg"
          borderRadius="xl"
          px={8}
          boxShadow="sm"
          _hover={{ boxShadow: "md", transform: "translateY(-1px)" }}
          transition="all .15s ease"
          w={{ base: "100%", sm: "auto" }}
        >
          {isEn ? "Close" : "إغلاق"}
        </Button>

        <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
          {isEn ? "You can close this window now." : "تقدر تقفل النافذة دلوقتي."}
        </Text>
      </VStack>
    </Box>
  );
}
