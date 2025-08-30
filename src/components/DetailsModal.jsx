import React, { useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Mail, Shield, Sparkles, CheckCircle } from "lucide-react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const DetailsModal = ({ phoneNumber, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userDetails, setUserDetails] = useState({
    phone: phoneNumber,
    name: "",
    email: "",
  });
  const { backendUrl, Loader, setToken } = useContext(AppContext);

  const handleSubmit = async () => {
    if (!userDetails.name || !userDetails.email)
      return toast.error("Fill all details");
    setLoading(true);
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/update-details",
        { userDetails }
      );

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        onClose();
        toast.success("Account created successfully!");
      } else {
        setError("Error Occurred");
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
      >
        {/* Enhanced Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Enhanced Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-sm sm:max-w-md bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-white/20"
        >
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
                x: [0, 30, 0],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-10 right-10 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-2xl"
            />
            <motion.div
              animate={{
                scale: [1.1, 1, 1.1],
                rotate: [360, 180, 0],
                y: [0, -20, 0],
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-10 left-10 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full blur-xl"
            />
          </div>

          {/* Header with gradient */}
          <div className="relative bg-gradient-to-r from-primary to-secondary p-4 sm:p-6 text-white overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-white/10 rounded-full blur-xl"></div>

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-8 h-8 sm:w-12 sm:h-12 bg-white/20 rounded-lg sm:rounded-2xl flex items-center justify-center backdrop-blur-sm"
                >
                  <User className="w-4 h-4 sm:w-6 sm:h-6" />
                </motion.div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold">
                    Complete Your Profile
                  </h3>
                  <p className="text-white/80 text-xs sm:text-sm">
                    Just a few more details
                  </p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-6 h-6 sm:w-10 sm:h-10 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors backdrop-blur-sm"
              >
                <X className="w-3 h-3 sm:w-5 sm:h-5" />
              </motion.button>
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 p-4 sm:p-8 space-y-4 sm:space-y-6">
            {/* Welcome Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                Welcome! Please provide your details to complete your account
                setup.
              </p>
            </motion.div>

            {/* Form Fields */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4 sm:space-y-6"
            >
              {/* Name Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-neutral-700">
                  Full Name
                </label>
                <div className="relative group">
                  <User className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 group-focus-within:text-primary transition-colors" />
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border-2 border-neutral-200 rounded-lg sm:rounded-2xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 bg-white/80 backdrop-blur-sm text-sm sm:text-base"
                    value={userDetails.name}
                    onChange={(e) =>
                      setUserDetails((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-neutral-700">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 group-focus-within:text-primary transition-colors" />
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="email"
                    placeholder="Enter your email address"
                    className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 border-2 border-neutral-200 rounded-lg sm:rounded-2xl focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-300 bg-white/80 backdrop-blur-sm text-sm sm:text-base"
                    value={userDetails.email}
                    onChange={(e) =>
                      setUserDetails((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>

              {/* Validation Messages */}
              {error && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-red-500 text-xs sm:text-sm flex items-center gap-2"
                >
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-100 rounded-full flex items-center justify-center">
                    <X className="w-2 h-2 sm:w-3 sm:h-3 text-red-500" />
                  </div>
                  {error}
                </motion.p>
              )}

              {userDetails.name && userDetails.email && !error && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-green-500 text-xs sm:text-sm flex items-center gap-2"
                >
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                  All details look good!
                </motion.p>
              )}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-2 sm:gap-3"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="flex-1 py-3 px-4 border-2 border-neutral-200 text-neutral-600 rounded-lg sm:rounded-2xl font-semibold hover:bg-neutral-50 transition-all duration-300 text-sm sm:text-base"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 10px 25px rgba(95, 111, 255, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={!userDetails.name || !userDetails.email || loading}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg sm:rounded-2xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden text-sm sm:text-base"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {loading ? (
                    <Loader color="#fff" />
                  ) : (
                    <>
                      <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                      Complete Setup
                    </>
                  )}
                </span>
              </motion.button>
            </motion.div>

            {/* Security Note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-blue-50 to-cyan-50 p-3 sm:p-4 rounded-lg sm:rounded-2xl border border-blue-100"
            >
              <div className="flex items-start gap-2 sm:gap-3">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-blue-900">
                    Privacy Protected
                  </p>
                  <p className="text-xs text-blue-700 mt-1">
                    Your information is encrypted and secure. We never share
                    your data.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default DetailsModal;
