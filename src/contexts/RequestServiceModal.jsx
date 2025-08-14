// src/components/request/RequestServiceModal.jsx
import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  HStack,
  Box,
  Badge,
  Progress,
  useToast,
  Text,
  Input,
  Stack,
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowForwardIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { useLocation } from "react-router-dom";

import StepContactLocation from "./StepContactLocation";
import StepApplianceIssue from "./StepApplianceIssue";
import StepConfirm from "./StepConfirm";
import { useRequestForm } from "./useRequestForm";

const StepBadge = ({ idx, label, active }) => (
  <HStack spacing={2}>
    <Badge
      rounded="full"
      px={3}
      py={1}
      fontWeight="bold"
      colorScheme={active ? "blue" : "gray"}
      variant={active ? "solid" : "subtle"}
    >
      {idx}. {label}
    </Badge>
  </HStack>
);

export default function RequestServiceModal({
  isOpen,
  onClose,
  prefill = {},
  endpoint: endpointProp, // ممكن تمرّره من الأب؛ لو مش موجود هنقرأ من env
}) {
  const toast = useToast();
  const { pathname } = useLocation();
  const isEn = pathname.startsWith("/en");

  // endpoint من الـ prop أو من env (مع trim)
  const endpoint = String(endpointProp ?? import.meta.env.VITE_GAS_ENDPOINT ?? "").trim();

  // اسم العميل لرسالة التأكيد
  const [submittedName, setSubmittedName] = useState("");

  const { t, form, errors, step, loading, onChange, handleNext, submit, resetForm, setStep } = useRequestForm({
    isEn,
    prefill,
    endpoint,
    onSuccess: (_status, tt, ctx) => {
      setSubmittedName((ctx?.form?.name ?? form.name) || "");
      setStep(3);
      toast({ status: "success", title: tt.sentOk });
    },
    onError: (e, tt) => {
      const map = { INVALID_RESPONSE: tt.serverInvalid, SERVER_ERROR: tt.serverError };
      toast({ status: "error", title: map[e.message] || e.message || tt.serverError });
    },
  });

  const closeAll = () => {
    onClose?.();
    resetForm();
    setSubmittedName("");
  };

  // Guard: لو الـ endpoint مش مُعرّف
  if (!endpoint) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEn ? "Configuration error" : "خطأ إعدادات"}</ModalHeader>
          <ModalBody>
            <Text>{isEn ? "Missing GAS endpoint." : "قيمة GAS endpoint غير مُعرّفة."}</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>{isEn ? "Close" : "إغلاق"}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={loading ? () => {} : closeAll} isCentered size="lg">
      <ModalOverlay bg="blackAlpha.500" backdropFilter="blur(3px)" />
      <ModalContent dir={isEn ? "ltr" : "rtl"} borderRadius="2xl" boxShadow="xl">
        <ModalHeader textAlign={isEn ? "left" : "right"}>
          <Text fontSize="xl" fontWeight="extrabold">
            {t.title}
          </Text>
          {step < 3 && (
            <Box mt={3}>
              <HStack justify="space-between">
                <StepBadge idx={1} label={t.steps[0]} active={step === 1} />
                <StepBadge idx={2} label={t.steps[1]} active={step === 2} />
              </HStack>
            </Box>
          )}
        </ModalHeader>

        {step < 3 && <Progress value={(step / 2) * 100} size="xs" colorScheme="blue" borderRadius="full" mx={6} />}

        <ModalBody px={6} py={4}>
          {/* honeypot */}
          <Input name="hp" value={form.hp} onChange={onChange} display="none" />

          {step === 1 && <StepApplianceIssue t={t} isEn={isEn} form={form} errors={errors} onChange={onChange} />}

          {step === 2 && <StepContactLocation t={t} isEn={isEn} form={form} errors={errors} onChange={onChange} />}

          {step === 3 && <StepConfirm name={submittedName} isEn={isEn} onClose={closeAll} />}
        </ModalBody>

        {step < 3 && (
          <ModalFooter
            bg="blackAlpha.50"
            _dark={{ bg: "whiteAlpha.100" }}
            borderTopWidth="1px"
            borderBottomRadius="2xl"
            justifyContent="center" // ← توسيط الأزرار
            flexWrap="wrap" // ← لو المساحة ضاقت تنزل سطر تاني
            gap={3} // ← مسافات متساوية بين الأزرار
          >
            {step > 1 && (
              <Button variant="ghost" onClick={() => setStep(step - 1)}>
                {t.back}
              </Button>
            )}

            {step < 2 && (
              <Button colorScheme="blue" onClick={handleNext}>
                {t.next}
              </Button>
            )}

            {step === 2 && (
              <Button colorScheme="blue" onClick={submit} isLoading={loading}>
                {t.save}
              </Button>
            )}

            <Button variant="ghost" onClick={closeAll}>
              {t.cancel}
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
}
