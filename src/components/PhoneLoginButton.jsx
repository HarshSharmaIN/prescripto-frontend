import React, { useState } from "react";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import PhoneInputModal from "./PhoneInputModal";

const PhoneLoginButton = () => {
  const [isPhoneModalOpen, setIsPhoneModalOpen] = useState(false);

  const handleContinueWithPhone = () => {
    setIsPhoneModalOpen(true);
  };

  const handleClosePhoneModal = () => {
    setIsPhoneModalOpen(false);
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="flex items-center justify-center gap-3 w-full bg-white border-2 border-neutral-200 hover:border-primary text-neutral-700 hover:text-primary py-4 px-6 rounded-2xl font-semibold transition-all duration-300 relative overflow-hidden group"
        onClick={handleContinueWithPhone}
        type="button"
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
        <Phone className="w-5 h-5 relative z-10" />
        <span className="relative z-10">Continue with Phone</span>
      </motion.button>

      {isPhoneModalOpen && <PhoneInputModal onClose={handleClosePhoneModal} />}
    </>
  );
};

export default PhoneLoginButton;