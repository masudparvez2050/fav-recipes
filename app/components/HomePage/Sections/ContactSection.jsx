import { motion } from "motion/react";

export default function ContactSection() {
  return (
    <motion.section
      className="mb-16 bg-orange-100 p-8 rounded-lg overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h2
        className="text-3xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Deliciousness to your inbox
      </motion.h2>
      <motion.p
        className="text-gray-600 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        Enjoy weekly hand-picked recipes and recommendations
      </motion.p>
      <motion.form
        className="flex flex-col md:flex-row gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <motion.input
          type="email"
          placeholder="Email Address"
          className="flex-grow px-4 py-2 rounded-full border border-gray-300 focus:ring focus:ring-orange-300 outline-none"
          whileFocus={{ scale: 1.02 }}
        />
        <motion.button
          type="submit"
          className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Join
        </motion.button>
      </motion.form>
    </motion.section>
  );
}
