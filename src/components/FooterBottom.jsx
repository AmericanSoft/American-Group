
import React from "react";
import { Box, HStack, Image, Link, usePrefersReducedMotion } from "@chakra-ui/react";

// لوجوهات افتراضية — بدّل زي ما تحب
const DEFAULT_LOGOS = [
  { src: "/assets/samsung.webp", alt: "Samsung" },
  { src: "/assets/Chiller-Egypt.png", alt: "Chiller Egypt" },
  { src: "/assets/toshiba.png", alt: "Toshiba" },
  { src: "/assets/LG.webp", alt: "LG" },
  { src: "/assets/miele.webp", alt: "Miele" },
  { src: "/assets/Westinghouse.webp", alt: "Westinghouse" },
];

export default function FooterBottom({
  logos = DEFAULT_LOGOS,
  gap = 64,           // px المسافة بين الشعارات
  logoH = 70,         // px ارتفاع الشعار
  duration = 10,      // ثواني: قللها تبقى أسرع (مثلاً 6)
  px = 0,
  py = 4,
  softEdges = true,   // قناع ناعم على الحواف
  pauseOnHover = false,
}) {
  const prefersReduced = usePrefersReducedMotion();
  const safeLogos = Array.isArray(logos) && logos.length ? logos : DEFAULT_LOGOS;

  return (
    <Box
      as="section"
      w="100%"
      bg="#142442" // ✅ خلفية شفافة
      px={px}
      py={py}
      overflow="hidden"
      role="region"
      aria-label="Brand logos"
      sx={
        softEdges
          ? {
              WebkitMaskImage:
                "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
              maskImage:
                "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)",
            }
          : {}
      }
    >
      {/* Keyframes محلية: دخول من اليمين -> خروج من الشمال */}
      <Box
        as="style"
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes flow-left {
              from { transform: translate3d(0,0,0); }
              to   { transform: translate3d(-50%,0,0); }
            }
            @media (prefers-reduced-motion: reduce){
              .logo-track { animation: none !important; }
            }
          `,
        }}
      />

      {/* التِراك: نكرر المجموعة مرتين علشان اللوب يبقى ناعم */}
      <Box
        className="logo-track"
        display="flex"
        alignItems="center"
        w="max-content"
        willChange="transform"
        style={{
          animation: prefersReduced ? "none" : `flow-left ${duration}s linear infinite`,
          ...(pauseOnHover ? { animationPlayState: "running" } : {}),
        }}
        _hover={pauseOnHover ? { animationPlayState: "paused" } : undefined}
      >
        {/* SET A */}
        <HStack align="center" spacing={0} pl="40px" sx={{ columnGap: `${gap}px` }}>
          {safeLogos.map((l, i) => (
            <Link key={`a-${i}`} href={l.href || "#"} _hover={{ opacity: 0.9 }}>
              <Image
                src={l.src}
                alt={l.alt || ""}
                h={`${logoH}px`}
                w="auto"
                objectFit="contain"
                background="transparent" // ✅ الصورة نفسها بدون خلفية
                loading={i < 3 ? "eager" : "lazy"}
                decoding="async"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </Link>
          ))}
        </HStack>

        {/* SET B (نفس الأولى تمامًا) */}
        <HStack align="center" spacing={0} pl="40px" sx={{ columnGap: `${gap}px` }} aria-hidden="true">
          {safeLogos.map((l, i) => (
            <Link key={`b-${i}`} href={l.href || "#"} _hover={{ opacity: 0.9 }}>
              <Image
                src={l.src}
                alt=""
                h={`${logoH}px`}
                w="auto"
                objectFit="contain"
                background="transparent"
                loading="lazy"
                decoding="async"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </Link>
          ))}
        </HStack>
      </Box>
    </Box>
  );
}
