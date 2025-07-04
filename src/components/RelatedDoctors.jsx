import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, MapPin, Clock, ArrowRight, Users, Sparkles } from "lucide-react";

import { AppContext } from "../context/AppContext";

const RelatedDoctors = ({ docId, speciality }) => {
  const navigate = useNavigate();
  const [relDoc, setRelDoc] = useState([]);

  const { doctors } = useContext(AppContext);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter(
        (doc) => doc.speciality === speciality && doc._id !== docId
      );
      setRelDoc(doctorsData);
    }
  }, [doctors, speciality, docId]);

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
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            x: [0, 30, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.1, 1, 1.1],
            rotate: [360, 180, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 right-10 w-72 h-72 bg-gradient-to-r from-accent/5 to-primary/5 rounded-full blur-3xl"
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
          <Users className="w-8 h-8 text-primary" />
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-800">
            Related <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Doctors</span>
          </h2>
          <Users className="w-8 h-8 text-secondary" />
        </motion.div>
        <motion.p 
          className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Discover more specialists in {speciality} to find the perfect match for your healthcare needs.
        </motion.p>
      </motion.div>

      {relDoc.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-8xl mb-6"
          >
            👨‍⚕️
          </motion.div>
          <h3 className="text-3xl font-bold text-neutral-700 mb-4">No Related Doctors Found</h3>
          <p className="text-xl text-neutral-500 max-w-md mx-auto mb-8">
            We're working on expanding our network of specialists in this area.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/doctors")}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <Sparkles className="w-5 h-5" />
            Browse All Doctors
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      ) : (
        <>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-16"
          >
            {relDoc.slice(0, 5).map((doctor, index) => (
              <motion.div
                key={doctor._id}
                variants={cardVariants}
                whileHover={{ y: -12, scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  navigate(`/appointments/${doctor._id}`);
                  scrollTo(0, 0);
                }}
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
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-700"
                    whileHover={{ scale: 1.1 }}
                  />
                  
                  {/* Availability badge */}
                  <motion.div 
                    className="absolute top-4 right-4"
                    whileHover={{ scale: 1.1 }}
                  >
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md border ${
                      doctor.available 
                        ? "bg-green-100/80 text-green-700 border-green-200" 
                        : "bg-red-100/80 text-red-700 border-red-200"
                    }`}>
                      <motion.div 
                        className={`w-2 h-2 rounded-full ${
                          doctor.available ? "bg-green-500" : "bg-red-500"
                        }`}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      {doctor.available ? "Available" : "Busy"}
                    </div>
                  </motion.div>
                </div>

                <div className="p-6 relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <motion.h3 
                        className="text-lg font-bold text-neutral-800 group-hover:text-primary transition-colors duration-300"
                        whileHover={{ scale: 1.02 }}
                      >
                        {doctor.name}
                      </motion.h3>
                      <motion.p 
                        className="text-primary font-semibold"
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
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold text-neutral-600">4.8</span>
                    </motion.div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <motion.div 
                      className="flex items-center gap-2 text-sm text-neutral-600"
                      whileHover={{ x: 3 }}
                    >
                      <MapPin className="w-4 h-4 text-primary" />
                      <span>{doctor.address.line1}</span>
                    </motion.div>
                    <motion.div 
                      className="flex items-center gap-2 text-sm text-neutral-600"
                      whileHover={{ x: 3 }}
                    >
                      <Clock className="w-4 h-4 text-secondary" />
                      <span>{doctor.experience} Experience</span>
                    </motion.div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <motion.span 
                        className="text-2xl font-bold text-neutral-800"
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
                        boxShadow: "0 8px 20px rgba(95, 111, 255, 0.3)" 
                      }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-xl font-bold text-sm hover:shadow-lg transition-all duration-300"
                    >
                      Book Now
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>

                {/* Decorative elements */}
                <motion.div
                  className="absolute bottom-2 right-2 w-2 h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
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
                boxShadow: "0 15px 30px rgba(95, 111, 255, 0.3)",
                y: -2
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                navigate("/doctors");
                scrollTo(0, 0);
              }}
              className="group inline-flex items-center gap-3 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              />
              <Sparkles className="w-5 h-5 relative z-10" />
              <span className="relative z-10">View All Doctors</span>
              <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-5 h-5 relative z-10" />
              </motion.div>
            </motion.button>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default RelatedDoctors;