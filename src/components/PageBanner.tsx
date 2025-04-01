import { motion } from "motion/react";

interface PageBannerProps {
  desktop: string;
  mobile: string;
  alt: string;
}

export default function PageBanner({ desktop, mobile, alt }: PageBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <img
        src={`/banners/${desktop}.webp`}
        width={1920}
        height={1080}
        alt={alt}
        className="hidden md:block"
      />
      <img
        src={`/${mobile}.webp`}
        width={1080}
        height={1920}
        alt={alt}
        className="block md:hidden"
      />
    </motion.div>
  );
}
