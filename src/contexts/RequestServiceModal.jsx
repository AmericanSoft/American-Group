import React, { useEffect, useState } from "react";
import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter,
  FormControl, FormLabel, Input, Textarea, Select, Button, HStack, useToast
} from "@chakra-ui/react";
import { useLocation } from "react-router-dom";

const endpoint = import.meta.env.VITE_GAS_ENDPOINT;

export default function RequestServiceModal({ isOpen, onClose, prefill = {} }) {
  const toast = useToast();
  const { pathname } = useLocation();
  const isEn = pathname.startsWith("/en");

  const [form, setForm] = useState({
    name: "", phone: "", city: "",
    brand: prefill.brand || "", device: prefill.device || "",
    issue: "", lang: isEn ? "en" : "ar", page: pathname,
    hp: "" // honeypot
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setForm(f => ({
      ...f,
      brand: prefill.brand || "",
      device: prefill.device || "",
      lang: isEn ? "en" : "ar",
      page: pathname
    }));
  }, [prefill, isEn, pathname]);

  const t = isEn ? {
    title: "Book Service",
    save: "Send request",
    cancel: "Close",
    fields: {
      name: "Full name",
      phone: "Phone",
      city: "City",
      brand: "Brand",
      device: "Device",
      issue: "Describe the issue"
    }
  } : {
    title: "حجز صيانة",
    save: "إرسال الطلب",
    cancel: "إغلاق",
    fields: {
      name: "الاسم بالكامل",
      phone: "رقم الهاتف",
      city: "المدينة",
      brand: "العلامة التجارية",
      device: "نوع الجهاز",
      issue: "وصف المشكلة"
    }
  };

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    // فالييديشن بسيطة
    if (!form.name || !form.phone) {
      toast({ status: "warning", title: isEn ? "Name & phone are required." : "الاسم ورقم الهاتف إلزاميان." });
      return;
    }
    setLoading(true);
    try {
      // لتجنب CORS preflight هنستخدم x-www-form-urlencoded
      const body = new URLSearchParams(form); // hp = honeypot
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body
      });
      // مش مهم نقرأ الرد — هنعرض نجاح لِطّيف
      toast({ status: "success", title: isEn ? "Sent successfully." : "تم الإرسال بنجاح." });
      onClose();
      setForm(f => ({ ...f, name: "", phone: "", city: "", issue: "" }));
    } catch (e) {
      console.error(e);
      toast({ status: "error", title: isEn ? "Something went wrong." : "حدث خطأ أثناء الإرسال." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={loading ? () => {} : onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{t.title}</ModalHeader>
        <ModalBody>
          {/* Honeypot hidden field لمكافحة السبام */}
          <Input name="hp" value={form.hp} onChange={onChange} display="none" />

          <HStack spacing={4}>
            <FormControl isRequired>
              <FormLabel>{t.fields.name}</FormLabel>
              <Input name="name" value={form.name} onChange={onChange} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>{t.fields.phone}</FormLabel>
              <Input name="phone" value={form.phone} onChange={onChange} />
            </FormControl>
          </HStack>

          <HStack spacing={4} mt={4}>
            <FormControl>
              <FormLabel>{t.fields.city}</FormLabel>
              <Input name="city" value={form.city} onChange={onChange} />
            </FormControl>
            <FormControl>
              <FormLabel>{t.fields.brand}</FormLabel>
              <Input name="brand" value={form.brand} onChange={onChange} />
            </FormControl>
          </HStack>

          <FormControl mt={4}>
            <FormLabel>{t.fields.device}</FormLabel>
            <Select name="device" value={form.device} onChange={onChange}>
              <option value="">{isEn ? "Select…" : "اختر…"}</option>
              <option value="Refrigerator">{isEn ? "Refrigerator" : "ثلاجة"}</option>
              <option value="Washer">{isEn ? "Washing Machine" : "غسالة"}</option>
              <option value="Oven">{isEn ? "Cooker/Oven" : "بوتاجاز/فرن"}</option>
              <option value="Microwave">{isEn ? "Microwave" : "ميكروويف"}</option>
              <option value="AC">{isEn ? "Air Conditioner" : "تكييف"}</option>
              <option value="Heater">{isEn ? "Water Heater" : "سخان"}</option>
              <option value="Freezer">{isEn ? "Deep Freezer" : "ديب فريزر"}</option>
            </Select>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>{t.fields.issue}</FormLabel>
            <Textarea name="issue" value={form.issue} onChange={onChange} rows={4} />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} variant="ghost" onClick={onClose} isDisabled={loading}>
            {t.cancel}
          </Button>
          <Button colorScheme="blue" onClick={submit} isLoading={loading}>
            {t.save}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
