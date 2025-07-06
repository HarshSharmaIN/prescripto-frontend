import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Shield, Clock, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

import OTPModal from './OTPModal';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import DetailsModal from './DetailsModal';

const PhoneInputModal = ({ onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { backendUrl, Loader } = useContext(AppContext);

  const features = [
    { icon: Shield, text: "Secure & Safe" },
    { icon: Clock, text: "Quick Verification" },
    { icon: CheckCircle, text: "Instant Access" }
  ];

  const handlePhoneNumberChange = (event) => {
    const value = event.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setPhoneNumber(value);
      setError('');
    }
  };

  const handleGetOTPRequest = async () => {
    try {
      setLoading(true);

      if (phoneNumber.length !== 10) {
        setError('Please enter a valid 10-digit phone number');
        return;
      }

      const { data } = await axios.post(backendUrl + '/api/user/generate-otp', { phone: phoneNumber });

      if (data.success) {
        toast.success(data.message);
        setIsOTPModalOpen(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseOTPModal = () => {
    setIsOTPModalOpen(false);
    onClose();
  };

  const handleCloseDetailsModal = () => {
    setIsOTPModalOpen(false);
    setIsDetailsModalOpen(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-sm sm:max-w-md bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-primary to-secondary p-4 sm:p-6 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-white/10 rounded-full blur-xl"></div>
            
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-12 sm:h-12 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <Phone className="w-4 h-4 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold">Phone Verification</h3>
                  <p className="text-white/80 text-xs sm:text-sm">Secure login with OTP</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <X className="w-3 h-3 sm:w-5 sm:h-5" />
              </motion.button>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Features */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-1 sm:mb-2">
                    <feature.icon className="w-4 h-4 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <p className="text-xs font-medium text-neutral-600">{feature.text}</p>
                </motion.div>
              ))}
            </div>

            {/* Phone Input */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3 sm:space-y-4"
            >
              <label className="block text-sm font-semibold text-neutral-700">
                Enter your mobile number
              </label>
              
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <img src={assets.flag} alt="India" className="w-4 h-3 sm:w-6 sm:h-4 mr-1 sm:mr-2" />
                  <span className="text-neutral-600 font-medium text-sm sm:text-base">+91</span>
                  <div className="w-px h-4 sm:h-6 bg-neutral-300 mx-2 sm:mx-3"></div>
                </div>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  placeholder="Enter 10-digit number"
                  className="w-full pl-16 sm:pl-20 pr-3 sm:pr-4 py-3 sm:py-4 border border-neutral-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 text-base sm:text-lg font-medium"
                  maxLength="10"
                />
              </div>

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

              {phoneNumber.length === 10 && !error && (
                <motion.p
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-green-500 text-xs sm:text-sm flex items-center gap-2"
                >
                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                  Valid phone number
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
                className="flex-1 py-3 px-4 border border-neutral-200 text-neutral-600 rounded-lg sm:rounded-xl font-semibold hover:bg-neutral-50 transition-colors text-sm sm:text-base"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(95, 111, 255, 0.3)" }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGetOTPRequest}
                disabled={phoneNumber.length !== 10 || loading}
                className="flex-1 py-3 px-4 bg-gradient-to-r from-primary to-secondary text-white rounded-lg sm:rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 relative overflow-hidden text-sm sm:text-base"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                <span className="relative z-10">
                  {loading ? <Loader color="#fff" /> : 'Send OTP'}
                </span>
              </motion.button>
            </motion.div>

            {/* Security Note */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-r from-blue-50 to-cyan-50 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-blue-100"
            >
              <div className="flex items-start gap-2 sm:gap-3">
                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-xs sm:text-sm font-medium text-blue-900">Secure & Private</p>
                  <p className="text-xs text-blue-700 mt-1">
                    Your phone number is encrypted and never shared with third parties.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Modals */}
        {isOTPModalOpen && (
          <OTPModal 
            phoneNumber={'+91' + phoneNumber} 
            onClose={handleCloseOTPModal} 
            setIsDetailsModalOpen={setIsDetailsModalOpen} 
          />
        )}
        {isDetailsModalOpen && (
          <DetailsModal 
            phoneNumber={'+91' + phoneNumber} 
            onClose={handleCloseDetailsModal} 
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default PhoneInputModal;