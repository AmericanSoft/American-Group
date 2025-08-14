// src/components/request/StepApplianceIssue.jsx
import React from "react";
import { VStack, FormControl, FormLabel, Input, Textarea, Select, Text } from "@chakra-ui/react";

const ErrorText = ({ children }) =>
  children ? (
    <Text color="red.500" fontSize="sm">
      {children}
    </Text>
  ) : null;

export default function StepApplianceIssue({ t, isEn, form, errors, onChange }) {
  return (
    <VStack spacing={4} align="stretch">
      <FormControl isRequired isInvalid={!!errors.brand}>
        <FormLabel>{t.fields.brand}</FormLabel>
        <Input name="brand" value={form.brand} onChange={onChange} borderRadius="lg" />
        <ErrorText>{errors.brand}</ErrorText>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors.device}>
        <FormLabel>{t.fields.device}</FormLabel>
        <Textarea
          name="device"
          value={form.device}
          onChange={onChange}
          rows={2}
          placeholder={isEn ? "e.g., Samsung Side-by-Side 24ft" : "مثال: ثلاجة سامسونج 24 قدم نوفروست"}
          borderRadius="lg"
        />
        <ErrorText>{errors.device}</ErrorText>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors.issue}>
        <FormLabel>{t.fields.issue}</FormLabel>
        <Textarea name="issue" value={form.issue} onChange={onChange} rows={4} borderRadius="lg" />
        <ErrorText>{errors.issue}</ErrorText>
      </FormControl>

      <FormControl isRequired isInvalid={!!errors.warranty}>
        <FormLabel>{t.fields.warranty}</FormLabel>
        <Select
          name="warranty"
          value={form.warranty}
          onChange={onChange}
          placeholder={isEn ? "Select…" : "اختر…"}
          borderRadius="lg"
          pr={3}
        >
          <option value="داخل الضمان">{isEn ? "Yes (under warranty)" : "نعم (ضمن الضمان)"}</option>
          <option value="خارج الضمان">{isEn ? "No (out of warranty)" : "لا (خارج الضمان)"}</option>
        </Select>
        <ErrorText>{errors.warranty}</ErrorText>
      </FormControl>

      <FormControl>
        <FormLabel>{t.fields.notes}</FormLabel>
        <Textarea name="notes" value={form.notes} onChange={onChange} rows={3} borderRadius="lg" />
      </FormControl>
    </VStack>
  );
}
