import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Users, Shield, ArrowRight } from "lucide-react";

import { assets } from "../assets/assets";

const Banner = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Calendar, text: "Easy Scheduling" },
    { icon: Users, text: "100+ Doctors" },
    { icon: Shield, text: "Secure & Safe" },
  ];

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary via-secondary to-primary rounded-3xl mx-4 md:mx-8 my-20 shadow-2xl">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute top-32 right-20 w-24 h-24 bg-white rounded-full"></div>
        <div className="absolute bottom-20 left-32 w-16 h-16 bg-white rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 bg-white rounded-full"></div>
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
            <span className="text-cyan-200">With 100+ Trusted Doctors</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap justify-center lg:justify-start gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2"
              >
                <feature.icon className="w-5 h-5 text-cyan-200" />
                <span className="text-white font-medium">{feature.text}</span>
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
              whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255, 255, 255, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                navigate("/login");
                scrollTo(0, 0);
              }}
              className="inline-flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-neutral-100 transition-all duration-300"
            >
              Create Account
              <ArrowRight className="w-5 h-5" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
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
            
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg"
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-semibold text-neutral-700">Available Now</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-neutral-700">Quick Booking</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;