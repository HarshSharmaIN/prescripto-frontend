import React, { useState, useRef, useEffect, useContext } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

const OTPModal = ({ phoneNumber, onClose, setIsDetailsModalOpen }) => {
  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputRefs = useRef([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { backendUrl, Loader, setToken } = useContext(AppContext);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (index, event) => {
    const value = event.target.value;
    if (value.length <= 1 && /^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < otp.length - 1 && value) {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (value.length > 1) {
      const pastedOtp = value.slice(0, otp.length);
      setOtp(pastedOtp.split(""));
      if (inputRefs.current[otp.length - 1]) {
        inputRefs.current[otp.length - 1].focus();
      }
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace") {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else if (otp[index] && index >= 0) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
        if (index > 0) {
          inputRefs.current[index - 1]?.focus();
        }
      }
    }
  };

  const handleClearOTP = () => {
    setOtp(Array(6).fill(""));
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const enteredOTP = otp.join("");

      const { data } = await axios.post(backendUrl + "/api/user/phone-login", {
        phone: phoneNumber,
        otp: enteredOTP,
      });

      if (data.success) {
        if (data.existing) {
          setToken(data.token);
          onClose();
        } else {
          setIsDetailsModalOpen(true);
        }
        
        toast.success(data.message);
      } else {
        setError("Invalid OTP");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-transparent bg-opacity-30 backdrop-filter backdrop-blur-md transition-opacity"
        aria-hidden="true"
      ></div>
      <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="absolute top-3 right-3">
            <button
              type="button"
              className="focus:outline-none"
              onClick={onClose}
            >
              <img src={assets.cross_icon} alt="Cancel" className="w-5 h-5" />
            </button>
          </div>
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3
                className="text-lg leading-6 font-medium text-gray-900"
                id="modal-title"
              >
                Enter verification code
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  We have sent an OTP to{" "}
                  <span className="font-semibold">{phoneNumber}</span>.
                </p>
                <div className="mt-4 flex justify-center space-x-2">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="tel"
                      maxLength="1"
                      className="w-10 h-10 border border-gray-300 rounded text-center focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      value={digit}
                      onChange={(e) => handleChange(index, e)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      ref={(el) => (inputRefs.current[index] = el)}
                    />
                  ))}
                </div>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                <div className="mt-4 flex justify-center space-x-4">
                  <button
                    type="button"
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={handleClearOTP}
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={handleSubmit}
                    disabled={otp.some((digit) => digit === "") || loading}
                  >
                    {loading ? <Loader color="#fff" /> : "Submit"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPModal;
