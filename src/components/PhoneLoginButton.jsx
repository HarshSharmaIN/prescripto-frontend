import React, { useState } from "react";
import PhoneInputModal from "./PhoneInputModal";
import { assets } from "../assets/assets";

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
      <button
        className="flex items-center justify-center gap-4 border border-zinc-400 w-full bg-white hover:bg-gray-100 text-blacktext-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-all"
        onClick={handleContinueWithPhone}
        type="button"
      >
        <img src={assets.phone_icon} alt="" className="w-4" />
        Continue with Phone
      </button>

      {isPhoneModalOpen && <PhoneInputModal onClose={handleClosePhoneModal} />}
    </>
  );
};

export default PhoneLoginButton;
