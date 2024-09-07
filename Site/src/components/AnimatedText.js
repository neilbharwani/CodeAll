import { motion } from 'framer-motion';

const AnimatedText = () => {
  return (
    <motion.h1 
      initial={{ opacity: 0, y: -100 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 1.5 }}
    >
      Welcome to Codeall: Learn to Code with AI
    </motion.h1>
  );
};

export default AnimatedText;
