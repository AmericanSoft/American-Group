// src/components/request/StepContactLocation.jsx
import React from "react";
import {
  HStack, VStack, FormControl, FormLabel, Input, Select,
  InputGroup, InputLeftElement, Divider, Text
} from "@chakra-ui/react";
import { PhoneIcon, EmailIcon, ChevronDownIcon } from "@chakra-ui/icons";

const ErrorText = ({ children }) => children ? <Text color="red.500" fontSize="sm">{children}</Text> : null;

export default function StepContactLocation({ t, isEn, form, errors, onChange }) {
  return (
    <VStack spacing={4} align="stretch">
      <HStack spacing={4} flexDir={isEn ? "row" : "row-reverse"}>
        <FormControl isRequired isInvalid={!!errors.phone}>
          <FormLabel>{t.fields.phone}</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none"><PhoneIcon color="gray.400" /></InputLeftElement>
            <Input
              name="phone"
              value={form.phone}
              onChange={onChange}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={11}
              borderRadius="lg"
            />
          </InputGroup>
          <ErrorText>{errors.phone}</ErrorText>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.name}>
          <FormLabel>{t.fields.name}</FormLabel>
          <Input name="name" value={form.name} onChange={onChange} borderRadius="lg" />
          <ErrorText>{errors.name}</ErrorText>
        </FormControl>
      </HStack>

      <HStack spacing={4} flexDir={isEn ? "row" : "row-reverse"}>
        <FormControl isRequired isInvalid={!!errors.whatsapp}>
          <FormLabel>{t.fields.whatsapp}</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none"><PhoneIcon color="green.400" /></InputLeftElement>
            <Input
              name="whatsapp"
              value={form.whatsapp}
              onChange={onChange}
              inputMode="numeric"
              pattern="[0-9]*"
              borderRadius="lg"
            />
          </InputGroup>
          <ErrorText>{errors.whatsapp}</ErrorText>
        </FormControl>

        <FormControl>
          <FormLabel>{t.fields.email}</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none"><EmailIcon color="gray.400" /></InputLeftElement>
            <Input name="email" value={form.email} onChange={onChange} borderRadius="lg" />
          </InputGroup>
        </FormControl>
      </HStack>

      <Divider />

      <FormControl isRequired isInvalid={!!errors.city}>
        <FormLabel>{t.fields.city}</FormLabel>
        <Input name="city" value={form.city} onChange={onChange} borderRadius="lg" />
        <ErrorText>{errors.city}</ErrorText>
      </FormControl>

      <HStack spacing={4} flexDir={isEn ? "row" : "row-reverse"}>
        <FormControl isRequired isInvalid={!!errors.governorate}>
          <FormLabel>{t.fields.governorate}</FormLabel>
          <Select
            name="governorate" value={form.governorate} onChange={onChange}
            placeholder={isEn ? "Select governorate…" : "اختر المحافظة…"}
            borderRadius="lg" icon={<ChevronDownIcon />} iconSize="1.2rem" iconColor="gray.500"
                      pr={3}

          >
            {t.govOptions.map((opt) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
          </Select>
          <ErrorText>{errors.governorate}</ErrorText>
        </FormControl>

        <FormControl isRequired isInvalid={!!errors.area}>
          <FormLabel>{t.fields.area}</FormLabel>
          <Input name="area" value={form.area} onChange={onChange} borderRadius="lg" />
          <ErrorText>{errors.area}</ErrorText>
        </FormControl>
      </HStack>

      <FormControl isRequired isInvalid={!!errors.address}>
        <FormLabel>{t.fields.address}</FormLabel>
        <Input name="address" value={form.address} onChange={onChange} borderRadius="lg" />
        <ErrorText>{errors.address}</ErrorText>
      </FormControl>
    </VStack>
  );
}
