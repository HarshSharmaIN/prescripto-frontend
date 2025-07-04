import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, MapPin, Clock, ArrowRight, Heart, Award, Sparkles } from "lucide-react";

import { AppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="py-20 px-4 md:px-8 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            x: [0, 60, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            y: [0, -40, 0]
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-accent/5 to-primary/5 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="inline-flex items-center gap-3 mb-6"
        >
          <Award className="w-8 h-8 text-primary" />
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-800">
            Top <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Doctors</span> to Book
          </h2>
          <Award className="w-8 h-8 text-secondary" />
        </motion.div>
        <motion.p 
          className="text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Simply browse through our extensive list of trusted doctors and schedule your appointment hassle-free.
        </motion.p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16"
      >
        {doctors.slice(0, 8).map((doctor, index) => (
          <motion.div
            key={doctor._id}
            variants={cardVariants}
            whileHover={{ y: -12, scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(`/appointments/${doctor._id}`)}
            className="group bg-white/80 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 cursor-pointer overflow-hidden border border-neutral-100 relative"
          >
            {/* Animated background on hover */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />

            <div className="relative overflow-hidden">
              <motion.img
                src={doctor.image}
                alt={doctor.name}
                className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-700"
                whileHover={{ scale: 1.1 }}
              />
              
              {/* Availability badge */}
              <motion.div 
                className="absolute top-4 right-4"
                whileHover={{ scale: 1.1 }}
              >
                <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold backdrop-blur-md border ${
                  doctor.available 
                    ? "bg-green-100/80 text-green-700 border-green-200" 
                    : "bg-red-100/80 text-red-700 border-red-200"
                }`}>
                  <motion.div 
                    className={`w-3 h-3 rounded-full ${
                      doctor.available ? "bg-green-500" : "bg-red-500"
                    }`}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  {doctor.available ? "Available" : "Busy"}
                </div>
              </motion.div>

              {/* Floating heart icon */}
              <motion.div
                className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg">
                  <Heart className="w-5 h-5 text-red-500" />
                </div>
              </motion.div>
            </div>

            <div className="p-6 relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <motion.h3 
                    className="text-xl font-bold text-neutral-800 group-hover:text-primary transition-colors duration-300"
                    whileHover={{ scale: 1.02 }}
                  >
                    {doctor.name}
                  </motion.h3>
                  <motion.p 
                    className="text-primary font-semibold text-lg"
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                  >
                    {doctor.speciality}
                  </motion.p>
                </div>
                <motion.div 
                  className="flex items-center gap-1"
                  whileHover={{ scale: 1.1 }}
                >
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-bold text-neutral-600">4.8</span>
                </motion.div>
              </div>

              <div className="space-y-3 mb-6">
                <motion.div 
                  className="flex items-center gap-3 text-sm text-neutral-600"
                  whileHover={{ x: 5 }}
                >
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{doctor.address.line1}</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-3 text-sm text-neutral-600"
                  whileHover={{ x: 5 }}
                >
                  <Clock className="w-4 h-4 text-secondary" />
                  <span>{doctor.experience} Experience</span>
                </motion.div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <motion.span 
                    className="text-3xl font-bold text-neutral-800"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
                  >
                    ₹{doctor.fees}
                  </motion.span>
                  <span className="text-sm text-neutral-500 ml-1">/ session</span>
                </div>
                <motion.button
                  whileHover={{ 
                    scale: 1.08, 
                    boxShadow: "0 10px 25px rgba(95, 111, 255, 0.3)" 
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-2xl font-bold text-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  />
                  <span className="relative z-10">Book Now</span>
                  <motion.div
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <ArrowRight className="w-4 h-4 relative z-10" />
                  </motion.div>
                </motion.button>
              </div>
            </div>

            {/* Decorative elements */}
            <motion.div
              className="absolute bottom-2 right-2 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="absolute top-1/2 left-2 w-1.5 h-1.5 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <motion.button
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(95, 111, 255, 0.3)",
            y: -3
          }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            navigate("/doctors");
            scrollTo(0, 0);
          }}
          className="group inline-flex items-center gap-4 bg-gradient-to-r from-primary via-secondary to-accent text-white px-10 py-5 rounded-3xl font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
          />
          <Sparkles className="w-6 h-6 relative z-10" />
          <span className="relative z-10">View All Doctors</span>
          <motion.div
            animate={{ x: [0, 5, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ArrowRight className="w-6 h-6 relative z-10" />
          </motion.div>
        </motion.button>
      </motion.div>
    </div>
  );
};

export default TopDoctors;