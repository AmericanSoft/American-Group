// src/components/request/useRequestForm.js
import { useEffect, useMemo, useState } from "react";

// نصوص + اختيارات المحافظات
const COPY = {
  en: {
    title: "Book Service",
    steps: [ "Appliance & Issue","Contact & Location"],
    next: "Next",
    back: "Back",
    save: "Send request",
    cancel: "Close",
    fields: {
      name: "Full name",
      phone: "Phone",
      whatsapp: "WhatsApp",
      email: "Email (optional)",
      city: "City",
      governorate: "Governorate",
      area: "Area",
      address: "Address",
      brand: "Brand",
      device: "Device",
      issue: "Describe the issue",
      warranty: "Warranty status",
      notes: "Notes (optional)",
    },
    govOptions: [
      { value: "giza", label: "Giza" },
      { value: "cairo", label: "Cairo" },
      { value: "other", label: "Other" },
    ],
    reqMsg: "This field is required",
    reqToast: "Please fill all required fields.",
    nameInvalid: "Please enter a valid name",
    phoneDigits: "Phone must be numbers only",
    phoneEgypt: "Invalid Egyptian phone number",
    waDigits: "WhatsApp must be numbers only",
    sentOk: "Sent successfully.",
    serverInvalid: "Invalid server response.",
    serverError: "Server error.",
    ignored: "Request ignored.",
  },
  ar: {
    title: "حجز صيانة",
    steps: [ "الجهاز والمشكلة","التواصل والموقع"],
    next: "التالي",
    back: "رجوع",
    save: "إرسال الطلب",
    cancel: "إغلاق",
    fields: {
      name: "الاسم بالكامل",
      phone: "رقم الهاتف",
      whatsapp: "رقم الواتساب",
      email: "البريد الإلكتروني (اختياري)",
      city: "المدينة",
      governorate: "المحافظة",
      area: "المنطقة",
      address: "العنوان",
      brand: " ماركة الجهاز",
      device: "نوع الجهاز",
      issue: "وصف المشكلة",
      warranty: "حالة الضمان",
      notes: "ملاحظات (اختياري)",
    },
    govOptions: [
      { value: "giza", label: "الجيزة" },
      { value: "cairo", label: "القاهرة" },
      { value: "other", label: "أخرى" },
    ],
    reqMsg: "هذا الحقل إلزامي",
    reqToast: "املأ الحقول الإلزامية.",
    nameInvalid: "الاسم يجب أن يحتوي على حروف فقط",
    phoneDigits: "رقم الهاتف يجب أن يكون أرقام فقط",
    phoneEgypt: "رقم الهاتف المصري غير صحيح",
    waDigits: "رقم الواتساب يجب أن يكون أرقام فقط",
    sentOk: "تم الإرسال بنجاح.",
    serverInvalid: "استجابة غير صالحة من الخادم.",
    serverError: "خطأ من الخادم.",
    ignored: "تم تجاهل الطلب.",
  },
};

const REQUIRED_STEP_1 = ["brand", "device", "issue", "warranty"];
const REQUIRED_STEP_2 = ["name", "phone", "whatsapp", "city", "governorate", "area", "address"];
const EMPTY_FORM = {
  name: "",
  phone: "",
  whatsapp: "",
  email: "",
  city: "",
  governorate: "",
  area: "",
  address: "",
  brand: "",
  device: "",
  issue: "",
  warranty: "",
  notes: "",
  hp: "",
};

const NAME_REGEX = /^[\u0621-\u064Aa-zA-Z\s]+$/;
const DIGITS_ONLY = /^[0-9]+$/;
const EGYPT_PHONE = /^(010|011|012|015)[0-9]{8}$/;

function validateFieldValue(key, value, t) {
  const v = String(value ?? "").trim();
  if (!v) return t.reqMsg;
  if (key === "name" && !NAME_REGEX.test(v)) return t.nameInvalid;
  if (key === "phone") {
    if (!DIGITS_ONLY.test(v)) return t.phoneDigits;
    if (!EGYPT_PHONE.test(v)) return t.phoneEgypt;
  }
  if (key === "whatsapp" && !DIGITS_ONLY.test(v)) return t.waDigits;
  return "";
}
function validateManyFields(form, fields, t) {
  const errs = {};
  for (const f of fields) {
    const e = validateFieldValue(f, form[f], t);
    if (e) errs[f] = e;
  }
  return errs;
}

export function useRequestForm({ isEn, prefill, endpoint, onSuccess, onError }) {
  const t = useMemo(() => COPY[isEn ? "en" : "ar"], [isEn]);
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({ ...EMPTY_FORM, brand: prefill?.brand || "", device: prefill?.device || "" });

  useEffect(() => {
    setForm((f) => ({ ...f, brand: prefill?.brand || "", device: prefill?.device || "" }));
  }, [prefill]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateFieldValue(name, value, t) || "" }));
  };

  const handleNext = () => {
    const stepErrors = validateManyFields(form, REQUIRED_STEP_1, t);
    if (Object.keys(stepErrors).length) {
      setErrors((prev) => ({ ...prev, ...stepErrors }));
      return false;
    }
    setStep(2);
    return true;
  };

  const resetForm = () => {
    setStep(1);
    setErrors({});
    setForm({ ...EMPTY_FORM });
  };

  const submit = async () => {
    const stepErrors = validateManyFields(form, REQUIRED_STEP_2, t);
    if (Object.keys(stepErrors).length) {
      setErrors((prev) => ({ ...prev, ...stepErrors }));
      return false;
    }

    if (!endpoint) {
      onError?.(new Error("SERVER_ERROR"), t);
      return false;
    }

    setLoading(true);
    try {
      const pairs = Object.entries(form).map(([k, v]) => [k, String(v ?? "")]);
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
        body: new URLSearchParams(pairs),
      });

      // tolerant parsing: اعتبر 200 نجاح حتى لو الهيدر مش JSON
      const ct = res.headers.get("content-type") || "";
      const raw = await res.text();
      let data;
      if (ct.includes("application/json")) {
        try {
          data = JSON.parse(raw);
        } catch {
          /* ignore */
        }
      } else {
        try {
          data = JSON.parse(raw);
        } catch {
          /* ignore */
        }
      }
      if (data && data.ok === false) throw new Error(data.error || "SERVER_ERROR");

      onSuccess?.("ok", t, { form });
      return true;
    } catch (e) {
      onError?.(e, t);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { t, form, errors, step, loading, onChange, handleNext, submit, resetForm, setStep, setErrors, setForm };
}
