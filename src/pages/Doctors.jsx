import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Filter, Star, MapPin, Clock, ArrowRight, Search } from "lucide-react";

import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const navigate = useNavigate();
  const { speciality } = useParams();
  const { doctors } = useContext(AppContext);

  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const specialities = [
    "General physician",
    "Gynecologist", 
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist"
  ];

  const applyFilter = () => {
    let filtered = doctors;
    
    if (speciality) {
      filtered = filtered.filter((doc) => doc.speciality === speciality);
    }
    
    if (searchTerm) {
      filtered = filtered.filter((doc) => 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.speciality.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilterDoc(filtered);
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality, searchTerm]);

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
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50/30 py-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-neutral-800 mb-4">
          Find Your <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Perfect Doctor</span>
        </h1>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Browse through our extensive list of trusted doctors and find the specialist that's right for you.
        </p>
      </motion.div>

      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="max-w-md mx-auto mb-8"
      >
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search doctors by name or speciality..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-4 border border-neutral-200 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm"
          />
        </div>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filter Sidebar */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="lg:w-80"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`lg:hidden w-full flex items-center gap-3 py-3 px-6 border rounded-2xl text-sm font-semibold transition-all mb-6 ${
              showFilter 
                ? "bg-primary text-white border-primary" 
                : "bg-white border-neutral-200 text-neutral-700 hover:border-primary"
            }`}
            onClick={() => setShowFilter((prev) => !prev)}
          >
            <Filter className="w-5 h-5" />
            Filters
          </motion.button>

          <div className={`${showFilter ? "block" : "hidden lg:block"}`}>
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 shadow-lg border border-neutral-200">
              <h3 className="text-xl font-bold text-neutral-800 mb-6 flex items-center gap-2">
                <Filter className="w-5 h-5 text-primary" />
                Specialities
              </h3>
              
              <div className="space-y-3">
                <motion.button
                  whileHover={{ x: 5 }}
                  onClick={() => navigate("/doctors")}
                  className={`w-full text-left p-4 rounded-2xl transition-all duration-300 ${
                    !speciality
                      ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                      : "bg-neutral-50 hover:bg-neutral-100 text-neutral-700"
                  }`}
                >
                  All Doctors
                </motion.button>
                
                {specialities.map((spec, index) => (
                  <motion.button
                    key={spec}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                    onClick={() => 
                      speciality === spec
                        ? navigate("/doctors")
                        : navigate(`/doctors/${spec}`)
                    }
                    className={`w-full text-left p-4 rounded-2xl transition-all duration-300 ${
                      speciality === spec
                        ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                        : "bg-neutral-50 hover:bg-neutral-100 text-neutral-700"
                    }`}
                  >
                    {spec}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Doctors Grid */}
        <div className="flex-1">
          {filterDoc.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-neutral-700 mb-2">No doctors found</h3>
              <p className="text-neutral-500">Try adjusting your search or filter criteria</p>
            </motion.div>
          ) : (
            <motion.div
              variants={containerVariants}
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filterDoc.map((doctor, index) => (
                <motion.div
                  key={doctor._id}
                  variants={cardVariants}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/appointments/${doctor._id}`)}
                  className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-neutral-100"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                        doctor.available 
                          ? "bg-green-100/80 text-green-700" 
                          : "bg-red-100/80 text-red-700"
                      }`}>
                        <div className={`w-2 h-2 rounded-full ${
                          doctor.available ? "bg-green-500" : "bg-red-500"
                        }`}></div>
                        {doctor.available ? "Available" : "Busy"}
                      </div>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-neutral-800 group-hover:text-primary transition-colors">
                          {doctor.name}
                        </h3>
                        <p className="text-primary font-semibold">{doctor.speciality}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-semibold text-neutral-600">4.8</span>
                      </div>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <MapPin className="w-4 h-4" />
                        <span>{doctor.address.line1}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-neutral-600">
                        <Clock className="w-4 h-4" />
                        <span>{doctor.experience} Experience</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-neutral-800">₹{doctor.fees}</span>
                        <span className="text-sm text-neutral-500 ml-1">/ session</span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 rounded-xl font-semibold text-sm hover:shadow-lg transition-all"
                      >
                        Book Now
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;