import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Users, Shield, ArrowRight, Star, Clock } from "lucide-react";

import { assets } from "../assets/assets";

const Banner = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Calendar, text: "Easy Scheduling" },
    { icon: Users, text: "100+ Doctors" },
    { icon: Shield, text: "Secure & Safe" },
  ];

  const stats = [
    { icon: Star, value: "4.9", label: "Rating" },
    { icon: Users, value: "50K+", label: "Patients" },
    { icon: Clock, value: "24/7", label: "Support" },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-accent rounded-3xl mx-4 md:mx-8 my-20 shadow-2xl">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-32 right-20 w-24 h-24 bg-white rounded-full"
        />
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            x: [0, 20, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-32 w-16 h-16 bg-white rounded-full"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 right-10 w-20 h-20 bg-white rounded-full"
        />
      </div>

      <div className="relative flex flex-col lg:flex-row items-center px-6 md:px-12 lg:px-20 py-12 lg:py-16">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 space-y-8 text-center lg:text-left"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
          >
            Book Appointment
            <br />
            <motion.span
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              className="bg-gradient-to-r from-cyan-200 via-white to-cyan-200 bg-clip-text text-transparent bg-[length:200%_100%]"
            >
              With 100+ Trusted Doctors
            </motion.span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center lg:justify-start gap-4"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/30"
              >
                <feature.icon className="w-5 h-5 text-cyan-200" />
                <span className="text-white font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-3 gap-6 max-w-sm mx-auto lg:mx-0"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-2">
                  <div className="p-2 bg-white/20 rounded-xl">
                    <stat.icon className="w-5 h-5 text-cyan-200" />
                  </div>
                </div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-cyan-200">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 20px 40px rgba(255, 255, 255, 0.3)",
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                navigate("/login");
                scrollTo(0, 0);
              }}
              className="inline-flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-neutral-100 transition-all duration-300 relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="relative z-10">Create Account</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/doctors")}
              className="inline-flex items-center gap-3 bg-transparent border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-primary transition-all duration-300"
            >
              Browse Doctors
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:w-1/2 mt-12 lg:mt-0 relative"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <img
              src={assets.appointment_img}
              alt="Book appointment"
              className="w-full max-w-md mx-auto h-auto drop-shadow-2xl"
            />
            
            {/* Enhanced Floating Elements */}
            <motion.div
              animate={{ 
                y: [0, -10, 0], 
                rotate: [0, 5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-white/50"
            >
              <div className="flex items-center gap-2">
                <motion.div 
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 bg-green-500 rounded-full"
                />
                <span className="text-sm font-semibold text-neutral-700">Available Now</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ 
                y: [0, 10, 0], 
                rotate: [0, -5, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -right-4 bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-white/50"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-neutral-700">Quick Booking</span>
              </div>
            </motion.div>

            {/* Additional floating element */}
            <motion.div
              animate={{ 
                x: [0, 10, 0],
                y: [0, -5, 0],
                rotate: [0, 3, 0]
              }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 -left-6 bg-white/95 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-white/50"
            >
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-xs font-semibold text-neutral-700">4.9★</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;