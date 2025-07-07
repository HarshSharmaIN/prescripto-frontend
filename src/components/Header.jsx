import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Users, Calendar, Shield, Sparkles, Heart, Star } from "lucide-react";

import { assets } from "../assets/assets";

const Header = () => {
  const stats = [
    { icon: Users, value: "100+", label: "Trusted Doctors" },
    { icon: Calendar, value: "50K+", label: "Appointments" },
    { icon: Shield, value: "99%", label: "Success Rate" },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50 rounded-2xl sm:rounded-3xl mx-2 sm:mx-4 lg:mx-6 xl:mx-8 my-6 sm:my-8 shadow-xl">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-8">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            x: [0, 30, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 left-10 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-32 right-20 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r from-accent/20 to-primary/20 rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            x: [0, 40, 0],
            y: [0, -15, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-32 w-12 h-12 sm:w-20 sm:h-20 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-full blur-lg"
        />
      </div>

      <div className="relative flex flex-col lg:flex-row items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-8 sm:py-12 lg:py-16 xl:py-20">
        {/* Enhanced Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="lg:w-1/2 space-y-6 sm:space-y-8 text-center lg:text-left"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-neutral-800 leading-tight"
          >
            <motion.span
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(95,111,255,0.3)",
                  "0 0 40px rgba(95,111,255,0.5)",
                  "0 0 20px rgba(95,111,255,0.3)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              Book Appointment
            </motion.span>
            <br />
            <motion.span
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent bg-[length:200%_100%]"
            >
              With Trusted Doctors
            </motion.span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-neutral-600"
          >
            <motion.img
              whileHover={{ scale: 1.08, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300 }}
              src={assets.group_profiles}
              alt="Trusted doctors"
              className="w-24 sm:w-28 md:w-36 h-auto rounded-2xl shadow-lg"
            />
            <motion.p 
              className="text-sm sm:text-md leading-relaxed text-center sm:text-left"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Simply browse through our extensive list of trusted doctors,{" "}
              <br className="hidden lg:block" />
              <motion.span
                animate={{ color: ["#6b7280", "#5f6fff", "#6b7280"] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="font-semibold"
              >
                schedule your appointment hassle-free.
              </motion.span>
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4"
          >
            <motion.a
              href="#speciality"
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 15px 35px rgba(59, 130, 246, 0.4)",
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center justify-center gap-2 sm:gap-3 bg-gradient-to-r from-primary to-secondary text-white px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 text-red-300" />
              <span className="relative z-10">Book Appointment</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
              </motion.div>
            </motion.a>

            <motion.button
              whileHover={{ 
                scale: 1.05,
                y: -2,
                boxShadow: "0 10px 25px rgba(95, 111, 255, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center justify-center gap-2 sm:gap-3 bg-white text-primary border-2 border-primary px-4 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-lg hover:bg-primary hover:text-white transition-all duration-300 shadow-lg"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 group-hover:rotate-180 transition-transform duration-300" />
              <span className="hidden sm:inline">Learn More</span>
              <span className="sm:hidden">Learn</span>
            </motion.button>
          </motion.div>

          {/* Enhanced Stats - Hidden on small mobile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="hidden sm:grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.1, y: -5 }}
                className="text-center group"
              >
                <div className="flex justify-center mb-2 sm:mb-3">
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="p-2 sm:p-4 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl sm:rounded-2xl group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300 shadow-lg"
                  >
                    <stat.icon className="w-4 h-4 sm:w-7 sm:h-7 text-primary" />
                  </motion.div>
                </div>
                <motion.div 
                  className="text-xl sm:text-3xl font-bold text-neutral-800 mb-1"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-xs sm:text-sm text-neutral-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Enhanced Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:w-1/2 mt-8 sm:mt-12 lg:mt-0 relative w-full"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <motion.img
              whileHover={{ scale: 1.02 }}
              src={assets.header_img}
              alt="Healthcare professionals"
              className="w-full h-auto rounded-2xl sm:rounded-3xl"
            />
            
            {/* Enhanced Floating Elements - Responsive */}
            <motion.div
              animate={{ 
                y: [0, -20, 0], 
                rotate: [0, 8, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-3 sm:-top-6 -right-3 sm:-right-6 bg-white/95 backdrop-blur-md p-2 sm:p-5 rounded-xl sm:rounded-3xl shadow-2xl border border-white/50"
            >
              <div className="flex items-center gap-1 sm:gap-3">
                <motion.div 
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 sm:w-4 sm:h-4 bg-green-500 rounded-full animate-pulse shadow-lg"
                />
                <span className="text-xs sm:text-sm font-bold text-neutral-700">24/7 Available</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ 
                y: [0, 15, 0], 
                rotate: [0, -8, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-3 sm:-bottom-6 -left-3 sm:-left-6 bg-white/95 backdrop-blur-md p-2 sm:p-5 rounded-xl sm:rounded-3xl shadow-2xl border border-white/50"
            >
              <div className="flex items-center gap-1 sm:gap-3">
                <Calendar className="w-3 h-3 sm:w-5 sm:h-5 text-primary" />
                <span className="text-xs sm:text-sm font-bold text-neutral-700">Easy Booking</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ 
                x: [0, 12, 0],
                y: [0, -8, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 -left-2 sm:-left-4 bg-white/95 backdrop-blur-md p-2 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl border border-white/50"
            >
              <div className="flex items-center gap-1 sm:gap-2">
                <Star className="w-3 h-3 sm:w-5 sm:h-5 text-yellow-500" />
                <span className="text-xs sm:text-sm font-bold text-neutral-700">Top Rated</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Header;