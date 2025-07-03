import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Users, Calendar, Shield } from "lucide-react";

import { assets } from "../assets/assets";

const Header = () => {
  const stats = [
    { icon: Users, value: "100+", label: "Trusted Doctors" },
    { icon: Calendar, value: "50K+", label: "Appointments" },
    { icon: Shield, value: "99%", label: "Success Rate" },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 rounded-3xl mx-4 md:mx-8 my-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-primary rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-accent rounded-full"></div>
        <div className="absolute bottom-20 left-32 w-12 h-12 bg-secondary rounded-full"></div>
      </div>

      <div className="relative flex flex-col lg:flex-row items-center px-6 md:px-12 lg:px-20 py-12 lg:py-20">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:w-1/2 space-y-8 text-center lg:text-left"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-800 leading-tight"
          >
            Book Appointment{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              With Trusted Doctors
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col md:flex-row items-center gap-4 text-neutral-600"
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              src={assets.group_profiles}
              alt="Trusted doctors"
              className="w-32 h-auto"
            />
            <p className="text-lg leading-relaxed">
              Simply browse through our extensive list of trusted doctors,{" "}
              <br className="hidden lg:block" />
              schedule your appointment hassle-free.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.a
              href="#speciality"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-primary text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:bg-secondary transition-all duration-300"
            >
              Book Appointment
              <ArrowRight className="w-5 h-5" />
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 bg-white text-primary border-2 border-primary px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-primary hover:text-white transition-all duration-300"
            >
              Learn More
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-3 gap-6 pt-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-2">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-neutral-800">{stat.value}</div>
                <div className="text-sm text-neutral-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:w-1/2 mt-12 lg:mt-0 relative"
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <img
              src={assets.header_img}
              alt="Healthcare professionals"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-white p-4 rounded-2xl shadow-lg"
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-neutral-700">24/7 Available</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 bg-white p-4 rounded-2xl shadow-lg"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-neutral-700">Easy Booking</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Header;