import { motion } from "motion/react";

interface PageBannerProps {
    desktop: string;
    mobile: string;
}


export default function PageBanner({ desktop, mobile }: PageBannerProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            
        >
            <img
                src={`/${desktop}.webp`}
                width={1920}
                height={1080}
                alt="Events"
                className="hidden md:block"
            />
            <img
                src={`/${mobile}.webp`}
                width={1080}
                height={1920}
                alt="Events"
                className="block md:hidden"
            />
        </motion.div>
    )
}