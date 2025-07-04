import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Users, Shield, ArrowRight, Star, Clock, Sparkles, Heart } from "lucide-react";

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
      {/* Enhanced Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            x: [0, 50, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-2xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            x: [0, -40, 0],
            y: [0, 40, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-32 right-20 w-32 h-32 bg-white rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            y: [0, -30, 0],
            x: [0, 30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-32 w-24 h-24 bg-white rounded-full blur-lg"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.7, 0.3],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 right-10 w-28 h-28 bg-white rounded-full blur-xl"
        />
        <motion.div
          animate={{ 
            x: [0, 60, 0],
            y: [0, -20, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/4 w-20 h-20 bg-white rounded-full blur-lg"
        />
      </div>

      <div className="relative flex flex-col lg:flex-row items-center px-6 md:px-12 lg:px-20 py-16 lg:py-20">
        {/* Enhanced Left Content */}
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
            <motion.span
              animate={{ 
                textShadow: [
                  "0 0 20px rgba(255,255,255,0.5)",
                  "0 0 40px rgba(255,255,255,0.8)",
                  "0 0 20px rgba(255,255,255,0.5)"
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
                whileHover={{ 
                  scale: 1.08, 
                  y: -3,
                  boxShadow: "0 10px 30px rgba(255,255,255,0.3)"
                }}
                className="flex items-center gap-3 bg-white/25 backdrop-blur-md rounded-2xl px-5 py-4 border border-white/40 shadow-lg"
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
                >
                  <feature.icon className="w-6 h-6 text-cyan-100" />
                </motion.div>
                <span className="text-white font-semibold text-lg">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Stats */}
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
                whileHover={{ scale: 1.1, y: -5 }}
                className="text-center group"
              >
                <div className="flex justify-center mb-3">
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="p-3 bg-white/25 backdrop-blur-md rounded-2xl border border-white/30 group-hover:bg-white/35 transition-all duration-300"
                  >
                    <stat.icon className="w-6 h-6 text-cyan-100" />
                  </motion.div>
                </div>
                <motion.div 
                  className="text-3xl font-bold text-white mb-1"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                >
                  {stat.value}
                </motion.div>
                <div className="text-sm text-cyan-200 font-medium">{stat.label}</div>
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
                boxShadow: "0 25px 50px rgba(255, 255, 255, 0.4)",
                y: -3
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                navigate("/login");
                scrollTo(0, 0);
              }}
              className="group inline-flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:bg-neutral-50 transition-all duration-300 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <Heart className="w-5 h-5 relative z-10 text-red-500" />
              <span className="relative z-10">Create Account</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </motion.button>

            <motion.button
              whileHover={{ 
                scale: 1.05, 
                y: -3,
                boxShadow: "0 20px 40px rgba(255,255,255,0.2)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/doctors")}
              className="group inline-flex items-center gap-3 bg-transparent border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-primary transition-all duration-300 backdrop-blur-sm"
            >
              <Sparkles className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
              Browse Doctors
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Enhanced Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="lg:w-1/2 mt-12 lg:mt-0 relative"
        >
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <motion.img
              whileHover={{ scale: 1.02 }}
              src={assets.appointment_img}
              alt="Book appointment"
              className="w-full max-w-md mx-auto h-auto drop-shadow-2xl rounded-2xl"
            />
            
            {/* Enhanced Floating Elements */}
            <motion.div
              animate={{ 
                y: [0, -15, 0], 
                rotate: [0, 8, 0],
                scale: [1, 1.08, 1]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -left-6 bg-white/95 backdrop-blur-md p-5 rounded-3xl shadow-2xl border border-white/50"
            >
              <div className="flex items-center gap-3">
                <motion.div 
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-4 h-4 bg-green-500 rounded-full shadow-lg"
                />
                <span className="text-sm font-bold text-neutral-700">Available Now</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ 
                y: [0, 12, 0], 
                rotate: [0, -8, 0],
                scale: [1, 1.08, 1]
              }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 bg-white/95 backdrop-blur-md p-5 rounded-3xl shadow-2xl border border-white/50"
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <span className="text-sm font-bold text-neutral-700">Quick Booking</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ 
                x: [0, 15, 0],
                y: [0, -8, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 -left-8 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50"
            >
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-bold text-neutral-700">4.9★</span>
              </div>
            </motion.div>

            <motion.div
              animate={{ 
                x: [0, -10, 0],
                y: [0, 10, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 -right-4 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-white/50"
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-blue-500" />
                <span className="text-xs font-bold text-neutral-700">Secure</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;