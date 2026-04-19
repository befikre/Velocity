import { Variants } from "framer-motion";

// Ensure animations respect user preference for reduced motion
export const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] } 
  },
};

export const fadeInVariant: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { duration: 0.5, ease: "easeOut" } 
  },
};

export const pulseVariant: Variants = {
  hidden: { opacity: 0.6, scale: 0.98 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { 
      duration: 2, 
      ease: "easeInOut", 
      repeat: Infinity, 
      repeatType: "reverse" 
    } 
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};
