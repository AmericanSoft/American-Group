// src/pages/Policies.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  List,
  ListItem,
  Link,
  Divider,
  Badge,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Button,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

const COPY = {
en: {
  dir: "ltr",
  title: "Policies & Privacy",
  subtitle:
    "American Group for Home Appliance Maintenance in Egypt — service policies, terms, and privacy practices.",
  lastUpdated: "Last updated: August 16, 2025",
  tocTitle: "On this page",
  print: "Print",
  sections: [
    {
      id: "about",
      title: "About American Group",
      paragraphs: [
        "American Group is specialized in servicing and repairing home appliances across Egypt. We adhere to certified service standards and use genuine spare parts, with fast technical support that ensures the safety and efficient operation of your devices.",
        "We are an independent service company and not the legal manufacturer of the brands we service unless otherwise stated. Brand names and logos may be used for identification purposes only."
      ]
    },
    {
      id: "scope",
      title: "Scope of Service",
      paragraphs: [
        "We provide diagnostics, maintenance, and repairs for major home appliances (such as refrigerators, washing machines, ovens, microwaves, air conditioners, water heaters, and deep freezers). Service availability may vary by area and brand.",
        "Some complex cases may require workshop service, special-order parts, or follow-up visits. We will inform you of appointments and costs before proceeding."
      ]
    },
    {
      id: "booking",
      title: "Booking & Process",
      paragraphs: [
        "You can book through the website form or via WhatsApp. Please enter accurate contact details, appliance information, and a clear problem description.",
        "After booking, our team will contact you to confirm the visit time and any initial inspection fee (if applicable)."
      ]
    },
    {
      id: "pricing",
      title: "Pricing & Payment",
      paragraphs: [
        "Inspection fees (if any), labor charges, and spare parts prices are transparent and will be clarified before starting the repair.",
        "Payment can be in cash or other available methods specified by our team. A receipt or invoice is issued upon completion."
      ]
    },
    {
      id: "warranty",
      title: "Warranty & Spare Parts",
      paragraphs: [
        "Repairs performed by American Group may include a limited service warranty on replaced parts and labor as specified on the invoice (terms and duration apply).",
        "We use genuine parts or high-quality alternatives according to availability and brand policies. The warranty does not cover misuse, accidental damage, power surges, or faults unrelated to the serviced component."
      ]
    },
    {
      id: "cancellation",
      title: "Cancellation & Rescheduling",
      paragraphs: [
        "You may cancel or reschedule by contacting us in advance. Fees may apply for late cancellations or no-shows to cover technician travel costs."
      ]
    },
    {
      id: "liability",
      title: "Liability",
      paragraphs: [
        "American Group is not responsible for pre-existing faults, hidden defects, or damage resulting from misuse or improper installation not performed by us.",
        "To the extent permitted by law, liability does not include indirect or consequential losses and is limited to the value of the service in question."
      ]
    },
    {
      id: "coverage",
      title: "Service Coverage",
      paragraphs: [
        "We serve multiple areas in Cairo and Giza and selected other regions. Coverage may change over time — please confirm at booking."
      ]
    },
    {
      id: "privacy",
      title: "Privacy & Data Protection",
      paragraphs: [
        "We collect only the data necessary to provide and improve our services (such as name, phone number, address, and appliance details).",
        "Data is stored securely and accessed only by authorized staff. We do not sell your personal data. We may use third-party tools (e.g., analytics or form processing), which are subject to their own policies."
      ]
    },
    {
      id: "changes",
      title: "Policy Updates",
      paragraphs: [
        "We may update these policies from time to time. Any material changes will be reflected on this page with a “Last updated” date."
      ]
    },
    {
      id: "contact",
      title: "Contact Us",
      paragraphs: [
        "Email: egyamircan6@gmail.com",
        "WhatsApp: +20 121 111 4528",
        "Facebook: facebook.com/americangruop/"
      ]
    }
  ]
},
  ar: {
    dir: "rtl",
    title: "السياسات والخصوصية",
    subtitle:
      "الأمريكية جروب لصيانة الأجهزة المنزلية في مصر — سياسات الخدمة والشروط وممارسات الخصوصية.",
    lastUpdated: "آخر تحديث: 16 أغسطس 2025",
    tocTitle: "محتويات الصفحة",
    print: "طباعة",
    sections: [
      {
        id: "about",
        title: "عن الأمريكية جروب",
        paragraphs: [
          "الأمريكية جروب شركة متخصصة في صيانة وإصلاح الأجهزة المنزلية بمختلف أنحاء مصر. نلتزم بمعايير خدمة معتمدة واستخدام قطع غيار أصلية  مع دعم فني سريع يضمن أمان وكفاءة تشغيل أجهزتك.",
          "نحن شركة خدمة مستقلة ولسنا المُصنِّع القانوني للعلامات التي نخدمها ما لم يُذكر خلاف ذلك. قد تُستخدم أسماء وشعارات العلامات التجارية فقط بغرض التعريف.",
        ],
      },
      {
        id: "scope",
        title: "نطاق الخدمة",
        paragraphs: [
          "نقدّم تشخيصًا وصيانة وإصلاحًا للأجهزة المنزلية الرئيسية (مثل الثلاجات والغسالات والأفران والميكروويف والتكييفات والسخانات والديب فريزر). وقد تختلف إتاحة الخدمة حسب المنطقة والعلامة.",
          "قد تتطلب بعض الحالات المعقدة ورشة صيانة أو طلب قطع خاصة أو زيارات متابعة. سنبلغكم بالمواعيد والتكاليف قبل التنفيذ.",
        ],
      },
      {
        id: "booking",
        title: "الحجز وآلية العمل",
        paragraphs: [
          "يمكنك الحجز عبر نموذج الموقع أو الواتساب. يرجى إدخال بيانات تواصل دقيقة ومعلومات الجهاز ووصف واضح للمشكلة.",
          "بعد الحجز، سيتواصل معك فريقنا لتأكيد موعد الزيارة وأي رسوم فحص أولية (إن وجدت).",
        ],
      },
      {
        id: "pricing",
        title: "التسعير والدفع",
        paragraphs: [
          "رسوم الفحص (إن وجدت) وأجور العمل وقطع الغيار تكون بشفافية ويتم توضيحها قبل بدء الإصلاح.",
          "الدفع نقدًا أو بطرق متاحة يحددها فريقنا. يتم إصدار إيصال أو فاتورة بعد إتمام الخدمة.",
        ],
      },
      {
        id: "warranty",
        title: "الضمان وقطع الغيار",
        paragraphs: [
          "قد تشمل الإصلاحات التي تقدّمها الأمريكية جروب ضمان خدمة محدودًا على القطع المستبدلة والعمل، كما هو موضح في الفاتورة (تسري الشروط والمدة).",
          "نستخدم قطعًا أصلية أو بدائل عالية الجودة وفقًا للتوافر وسياسات العلامة. لا يشمل الضمان سوء الاستخدام أو التلف العرضي أو ارتفاعات الكهرباء أو أعطال غير مرتبطة بالجزء المُصلح.",
        ],
      },
      {
        id: "cancellation",
        title: "الإلغاء وإعادة الجدولة",
        paragraphs: [
          "يمكنك الإلغاء أو تغيير الموعد بالتواصل مسبقًا. قد تُطبق رسوم عند الإلغاء المتأخر أو عدم التواجد لتغطية تكاليف انتقال الفني.",
        ],
      },
      {
        id: "liability",
        title: "المسؤولية",
        paragraphs: [
          "لا تتحمل الأمريكية جروب مسؤولية الأعطال السابقة أو العيوب الخفية أو الأضرار الناتجة عن سوء الاستخدام أو التركيب غير الصحيح الذي لم ننفذه.",
          "في حدود ما يسمح به القانون، لا تشمل المسؤولية الخسائر غير المباشرة أو التبعية. ويقتصر حد المسؤولية على قيمة الخدمة محل النزاع.",
        ],
      },
      {
        id: "coverage",
        title: "نطاق التغطية",
        paragraphs: [
          "نخدم مناطق متعددة في القاهرة والجيزة ومناطق مختارة أخرى. قد تتغير التغطية بمرور الوقت — يُرجى التأكد عند الحجز.",
        ],
      },
      {
        id: "privacy",
        title: "الخصوصية وحماية البيانات",
        paragraphs: [
          "نجمع البيانات اللازمة فقط لتقديم خدماتنا وتحسينها (مثل الاسم ورقم الهاتف والعنوان وتفاصيل الجهاز).",
          "نُخزّن البيانات بشكل آمن ويطّلع عليها موظفون مخولون فقط. لا نبيع بياناتك الشخصية. قد نستخدم أدوات طرف ثالث (مثل التحليلات أو معالجة النماذج) وتخضع سياساتها لأنظمتها.",
        ],
      },
      {
        id: "changes",
        title: "تحديثات السياسة",
        paragraphs: [
          "قد نقوم بتحديث هذه السياسات من حين لآخر. سيتم توضيح أي تغييرات جوهرية على هذه الصفحة مع تاريخ 'آخر تحديث'.",
        ],
      },
      {
        id: "contact",
        title: "تواصل معنا",
        paragraphs: [
          "البريد الإلكتروني: egyamircan6@gmail.com",
          "واتساب: ‎+20 121 111 4528",
          "فيسبوك: facebook.com/americangruop/",
        ],
      },
    ],
  },
};

export default function Policies() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const isEn = pathname.startsWith("/en");
  const t = COPY[isEn ? "en" : "ar"];

  // map section id -> index
  const ids = useMemo(() => t.sections.map((s) => s.id), [t.sections]);
  const idToIndex = useMemo(
    () => Object.fromEntries(ids.map((id, i) => [id, i])),
    [ids]
  );

  // controlled accordion indices
  const [expanded, setExpanded] = useState([0]);

  const scrollWithOffset = (el) => {
    const headerOffset = 90; // عدّل حسب ارتفاع الهيدر عندك
    const y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  // افتح السيكشن المطلوب لو فيه hash (أول تحميل وأي تغيير)
  useEffect(() => {
    if (!hash) return;
    const id = hash.replace("#", "");
    const idx = idToIndex[id];
    if (idx === undefined) return;

    // افتح البانل المطلوب
    setExpanded((prev) => Array.from(new Set([...(Array.isArray(prev) ? prev : []), idx])));

    // scroll بعد ما يترندر
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) scrollWithOffset(el);
    }, 0);
  }, [pathname, hash, idToIndex]);

  const onTocClick = (e, id) => {
    e.preventDefault();
    const idx = idToIndex[id];
    if (idx !== undefined) {
      setExpanded((prev) => Array.from(new Set([...(Array.isArray(prev) ? prev : []), idx])));
    }
    // حدّث الهاش واسمح للـuseEffect يشتغل
    navigate(`#${id}`, { replace: false });
  };

  return (
    <Box
      as="main"
      dir={t.dir}
      py={{ base: 8, md: 12 }}
      px={{ base: 4, md: 0 }}
      bg="gray.50"
      _dark={{ bg: "gray.900" }}
      minH="70vh"
    >
      <Container maxW="5xl">
        <Stack spacing={4} align={t.dir === "rtl" ? "flex-end" : "flex-start"}>
          <Heading as="h1" size="lg" textAlign={t.dir === "rtl" ? "right" : "left"}>
            {t.title}
          </Heading>
          <Text color="gray.600" _dark={{ color: "gray.300" }} textAlign={t.dir === "rtl" ? "right" : "left"}>
            {t.subtitle}
          </Text>

          <Stack direction={{ base: "column", sm: "row" }} spacing={3} align={{ base: "flex-start", sm: "center" }}>
            <Badge colorScheme="blue" variant="subtle" fontSize="0.9em" px={3} py={1} borderRadius="md">
              {t.lastUpdated}
            </Badge>
            <Button size="sm" onClick={() => window.print()} variant="outline">
              {t.print}
            </Button>
          </Stack>
        </Stack>

        <Divider my={6} />

        {/* Table of contents */}
        <Box mb={6}>
          <Heading as="h2" size="sm" mb={2} textAlign={t.dir === "rtl" ? "right" : "left"}>
            {t.tocTitle}
          </Heading>
          <List spacing={1} styleType="none">
            {t.sections.map((s) => (
              <ListItem key={s.id}>
                <Link href={`#${s.id}`} color="blue.600" _dark={{ color: "blue.300" }} onClick={(e) => onTocClick(e, s.id)}>
                  {s.title}
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Sections */}
        <Accordion
          allowMultiple
          index={expanded}
          onChange={(idx) => setExpanded(Array.isArray(idx) ? idx : [idx])}
          reduceMotion
        >
          {t.sections.map((s) => (
            <AccordionItem key={s.id} border="none" mb={2}>
              {/* مرساة خفية قبل العنوان علشان السكروول يزبط مع الأوفست */}
              <Box id={s.id} position="relative" top="-80px" />
              <h3>
                <AccordionButton px={4} py={3} borderRadius="lg" _expanded={{ bg: "blue.50", _dark: { bg: "whiteAlpha.100" } }}>
                  <Box as="span" flex="1" textAlign={t.dir === "rtl" ? "right" : "left"} fontWeight="bold">
                    {s.title}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h3>
              <AccordionPanel px={4} pb={4}>
                <Stack spacing={3} textAlign={t.dir === "rtl" ? "right" : "left"}>
                  {s.paragraphs.map((p, i) => (
                    <Text key={i} color="gray.700" _dark={{ color: "gray.200" }} lineHeight="1.9">
                      {p}
                    </Text>
                  ))}
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>

        <Divider my={10} />
        <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }} textAlign="center">
          © {new Date().getFullYear()} American Group — All rights reserved.
        </Text>
      </Container>
    </Box>
  );
}
