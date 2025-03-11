// variants.js
export const heartbeat = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: {
    scale: 1.2,
    opacity: 1,
    transition: { repeat: Infinity, repeatType: "reverse", duration: 0.6 },
  },
};

export const rotateIn = {
  hidden: { rotate: -180, opacity: 0 },
  visible: { rotate: 0, opacity: 1, transition: { duration: 0.6 } },
};

export const flip = {
  hidden: { rotateY: -180, opacity: 0 },
  visible: { rotateY: 0, opacity: 1, transition: { duration: 0.6 } },
};
export const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export const delayedFadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3 } },
};
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

export const shake = {
  hidden: { x: -5, rotate: -10 },
  visible: {
    x: 5,
    rotate: 10,
    transition: { repeat: Infinity, duration: 0.2, repeatType: "reverse" },
  },
};
export const slideInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, delay: 0.3 } },
};

export const scaleIn = {
  hidden: { scale: 0.6, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.6 } },
};

export const stagger = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    when: "beforeChildren",
    scale: 1,
    transition: { staggerChildren: 0.2 },
  },
};

// export const staggerChildren = {
//   initial: {},
//   animate: {
//     transition: {
//       when: "beforeChildren",

//       staggerChildren: 0.3,
//     },
//   },
// };
export const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

export const titleVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] },
  },
  hover: {
    scale: 1.05,
    boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

export const labelVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.2 },
  },
};
export const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};
