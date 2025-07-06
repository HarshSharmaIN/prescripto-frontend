import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Calendar, Edit3, Save, X, Camera, Shield, Award } from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";

import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets.js";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [isloading, setIsloading] = useState(false);

  const {
    userData,
    setUserData,
    token,
    backendUrl,
    loadUserProfileData,
    Loader,
  } = useContext(AppContext);

  const updateUserProfileData = async () => {
    try {
      setIsloading(true);
      const formData = new FormData();

      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsloading(false);
    }
  };

  const cancelUpdateProfile = async () => {
    try {
      await loadUserProfileData();
      setIsEdit(false);
      setImage(null);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50/30 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50/30 py-4 sm:py-8">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            x: [0, 30, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.1, 1, 1.1],
            rotate: [360, 180, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-10 w-56 h-56 sm:w-72 sm:h-72 bg-gradient-to-r from-accent/5 to-primary/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-4xl mx-auto px-3 sm:px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6"
          >
            <User className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-800">
              My <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Profile</span>
            </h1>
            <User className="w-6 h-6 sm:w-8 sm:h-8 text-secondary" />
          </motion.div>
          <motion.p 
            className="text-lg sm:text-xl text-neutral-600 max-w-2xl mx-auto px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Manage your personal information and account settings.
          </motion.p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-xl border border-neutral-100 overflow-hidden relative"
        >
          {/* Decorative elements */}
          <motion.div
            className="absolute top-4 right-4 opacity-10"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Shield className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
          </motion.div>

          <div className="p-4 sm:p-6 lg:p-8 relative z-10">
            {/* Profile Image Section */}
            <div className="flex flex-col items-center mb-6 sm:mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                {isEdit ? (
                  <label htmlFor="image" className="cursor-pointer">
                    <div className="relative">
                      <motion.img
                        whileHover={{ scale: 1.02 }}
                        className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-2xl sm:rounded-3xl object-cover shadow-xl border-4 border-white group-hover:opacity-80 transition-opacity duration-300"
                        src={image ? URL.createObjectURL(image) : userData.image}
                        alt="Profile"
                      />
                      <motion.div
                        className="absolute inset-0 bg-black/50 rounded-2xl sm:rounded-3xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Camera className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </motion.div>
                    </div>
                    <input
                      onChange={(e) => setImage(e.target.files[0])}
                      type="file"
                      id="image"
                      hidden
                      accept="image/*"
                    />
                  </label>
                ) : (
                  <motion.img
                    whileHover={{ scale: 1.02 }}
                    className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-2xl sm:rounded-3xl object-cover shadow-xl border-4 border-white"
                    src={userData.image}
                    alt="Profile"
                  />
                )}
              </motion.div>

              {/* Name Section */}
              {isEdit ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-4 sm:mt-6 w-full max-w-md"
                >
                  <div className="flex items-center gap-2 sm:gap-3 bg-neutral-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-neutral-200">
                    <Edit3 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    <input
                      className="bg-transparent text-lg sm:text-xl md:text-2xl font-bold w-full focus:outline-none text-neutral-800"
                      type="text"
                      value={userData.name}
                      onChange={(e) =>
                        setUserData((prev) => ({ ...prev, name: e.target.value }))
                      }
                      placeholder="Enter your name"
                    />
                  </div>
                </motion.div>
              ) : (
                <motion.h2
                  className="text-xl sm:text-2xl md:text-3xl font-bold text-neutral-800 mt-4 sm:mt-6 text-center px-4"
                  whileHover={{ scale: 1.02 }}
                >
                  {userData.name}
                </motion.h2>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-4 sm:space-y-6"
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-800">Contact Information</h3>
                </div>

                {/* Email */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="bg-neutral-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-neutral-200"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-semibold text-neutral-600">Email Address</p>
                      <p className="text-sm sm:text-base lg:text-lg font-medium text-blue-600 truncate">{userData.email}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="bg-neutral-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-neutral-200"
                >
                  {isEdit ? (
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Edit3 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm font-semibold text-neutral-600 mb-2">Phone Number</p>
                        <input
                          className="w-full bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                          type="text"
                          value={userData.phone}
                          onChange={(e) =>
                            setUserData((prev) => ({ ...prev, phone: e.target.value }))
                          }
                          placeholder="Enter phone number"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-semibold text-neutral-600">Phone Number</p>
                        <p className="text-sm sm:text-base lg:text-lg font-medium text-blue-600 truncate">{userData.phone}</p>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Address */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="bg-neutral-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-neutral-200"
                >
                  {isEdit ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <Edit3 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                        <p className="text-xs sm:text-sm font-semibold text-neutral-600">Address</p>
                      </div>
                      <input
                        className="w-full bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                        type="text"
                        value={userData.address.line1}
                        onChange={(e) =>
                          setUserData((prev) => ({
                            ...prev,
                            address: { ...prev.address, line1: e.target.value },
                          }))
                        }
                        placeholder="Address line 1"
                      />
                      <input
                        className="w-full bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                        type="text"
                        value={userData.address.line2}
                        onChange={(e) =>
                          setUserData((prev) => ({
                            ...prev,
                            address: { ...prev.address, line2: e.target.value },
                          }))
                        }
                        placeholder="Address line 2"
                      />
                    </div>
                  ) : (
                    <div className="flex items-start gap-2 sm:gap-3">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-accent mt-1" />
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-semibold text-neutral-600">Address</p>
                        <p className="text-sm sm:text-base lg:text-lg font-medium text-neutral-700 break-words">
                          {userData.address.line1}
                          {userData.address.line2 && <><br />{userData.address.line2}</>}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </motion.div>

              {/* Basic Information */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="space-y-4 sm:space-y-6"
              >
                <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-800">Basic Information</h3>
                </div>

                {/* Gender */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="bg-neutral-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-neutral-200"
                >
                  {isEdit ? (
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Edit3 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm font-semibold text-neutral-600 mb-2">Gender</p>
                        <select
                          className="w-full bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                          value={userData.gender}
                          onChange={(e) =>
                            setUserData((prev) => ({ ...prev, gender: e.target.value }))
                          }
                        >
                          <option value="">Select Gender</option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 sm:gap-3">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-neutral-600">Gender</p>
                        <p className="text-sm sm:text-base lg:text-lg font-medium text-neutral-700">{userData.gender || "Not specified"}</p>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Date of Birth */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="bg-neutral-50 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-neutral-200"
                >
                  {isEdit ? (
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Edit3 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm font-semibold text-neutral-600 mb-2">Date of Birth</p>
                        <input
                          className="w-full bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                          type="date"
                          value={userData.dob}
                          onChange={(e) =>
                            setUserData((prev) => ({ ...prev, dob: e.target.value }))
                          }
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 sm:gap-3">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                      <div>
                        <p className="text-xs sm:text-sm font-semibold text-neutral-600">Date of Birth</p>
                        <p className="text-sm sm:text-base lg:text-lg font-medium text-neutral-700">{userData.dob || "Not specified"}</p>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Member Since */}
                <motion.div
                  whileHover={{ x: 5 }}
                  className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl sm:rounded-2xl p-3 sm:p-4 border border-primary/20"
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    <div>
                      <p className="text-xs sm:text-sm font-semibold text-neutral-600">Member Since</p>
                      <p className="text-sm sm:text-base lg:text-lg font-medium text-primary">2024</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 sm:mt-12 justify-center"
            >
              {isEdit ? (
                <>
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={cancelUpdateProfile}
                    className="flex items-center justify-center gap-2 sm:gap-3 bg-red-100 hover:bg-red-500 text-red-600 hover:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 border border-red-200 text-sm sm:text-base"
                  >
                    <X className="w-4 h-4 sm:w-5 sm:h-5" />
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ 
                      scale: 1.02, 
                      boxShadow: "0 10px 25px rgba(95, 111, 255, 0.3)",
                      y: -2
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={updateUserProfileData}
                    disabled={isloading}
                    className="flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-primary to-secondary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 text-sm sm:text-base"
                  >
                    {isloading ? (
                      <Loader color="#ffffff" />
                    ) : (
                      <>
                        <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                        Save Changes
                      </>
                    )}
                  </motion.button>
                </>
              ) : (
                <motion.button
                  whileHover={{ 
                    scale: 1.02, 
                    boxShadow: "0 10px 25px rgba(95, 111, 255, 0.3)",
                    y: -2
                  }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsEdit(true)}
                  className="flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-primary to-secondary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 text-sm sm:text-base"
                >
                  <Edit3 className="w-4 h-4 sm:w-5 sm:h-5" />
                  Edit Profile
                </motion.button>
              )}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;