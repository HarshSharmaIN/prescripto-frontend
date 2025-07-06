import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Star } from "lucide-react";

import { specialityData } from "../assets/assets";

const Speciality = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
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
    <div id="speciality" className="py-12 sm:py-16 lg:py-20 px-4 md:px-8 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            x: [0, 50, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-10 w-60 h-60 sm:w-80 sm:h-80 bg-gradient-to-r from-accent/5 to-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            x: [0, 40, 0],
            y: [0, 20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-secondary/5 to-accent/5 rounded-full blur-3xl"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 sm:mb-16"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="inline-flex items-center gap-2 mb-4 sm:mb-6"
        >
          <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-neutral-800">
            Find by <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Speciality</span>
          </h2>
          <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-secondary" />
        </motion.div>
        <motion.p 
          className="text-base sm:text-lg lg:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed px-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.
        </motion.p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto"
      >
        {specialityData.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ y: -10, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group"
          >
            <Link
              to={`/doctors/${item.speciality}`}
              onClick={() => scrollTo(0, 0)}
              className="block"
            >
              <motion.div 
                className="bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-neutral-100 group-hover:border-primary/30 relative overflow-hidden"
                whileHover={{ 
                  boxShadow: "0 25px 50px rgba(95, 111, 255, 0.15)" 
                }}
              >
                {/* Animated background on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={false}
                />
                
                <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 lg:space-y-6 relative z-10">
                  <div className="relative">
                    <motion.div 
                      className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-2xl sm:rounded-3xl flex items-center justify-center group-hover:from-primary/20 group-hover:via-secondary/20 group-hover:to-accent/20 transition-all duration-500 shadow-lg"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <motion.img
                        src={item.image}
                        alt={item.speciality}
                        className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ scale: 1.2 }}
                      />
                    </motion.div>
                    
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ delay: index * 0.1 + 0.5, type: "spring", stiffness: 200 }}
                      className="absolute -top-1 -right-1 w-4 h-4 sm:w-6 sm:h-6 lg:w-8 lg:h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg"
                    >
                      <ArrowRight className="w-2 h-2 sm:w-3 sm:h-3 lg:w-4 lg:h-4 text-white" />
                    </motion.div>
                  </div>
                  
                  <motion.h3 
                    className="text-sm sm:text-base lg:text-lg font-bold text-neutral-700 group-hover:text-primary transition-colors duration-300 leading-tight"
                    whileHover={{ scale: 1.05 }}
                  >
                    {item.speciality}
                  </motion.h3>

                  {/* Rating stars - Hidden on mobile for space */}
                  <motion.div 
                    className="hidden sm:flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={{ y: 10 }}
                    whileInView={{ y: 0 }}
                    transition={{ delay: index * 0.1 + 0.7 }}
                  >
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 180, 360]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          delay: i * 0.1 
                        }}
                      >
                        <Star className="w-2 h-2 sm:w-3 sm:h-3 fill-yellow-400 text-yellow-400" />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>

                {/* Decorative elements */}
                <motion.div
                  className="absolute top-1 right-1 sm:top-2 sm:right-2 w-1 h-1 sm:w-2 sm:h-2 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <motion.div
                  className="absolute bottom-1 left-1 sm:bottom-2 sm:left-2 w-1 h-1 sm:w-1.5 sm:h-1.5 bg-secondary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
              </motion.div>
            </Link>
          </motion.div>
        ))}
      </motion.div>

      {/* Call to action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-center mt-12 sm:mt-16"
      >
        <motion.p
          className="text-base sm:text-lg text-neutral-600 mb-6 sm:mb-8 px-4"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Can't find your speciality? We have more options available!
        </motion.p>
        <motion.button
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 15px 30px rgba(95, 111, 255, 0.3)"
          }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-primary to-secondary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
        >
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
          View All Specialities
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Speciality;