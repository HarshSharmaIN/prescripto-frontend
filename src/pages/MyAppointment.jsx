import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Star, Eye, CreditCard, X, CheckCircle, Sparkles } from "lucide-react";

import { AppContext } from "../context/AppContext";
import Pagination from "../components/Pagination";

const MyAppointment = () => {
  const navigate = useNavigate();
  const {
    appointments,
    joinMeeting,
    token,
    getUserAppointments,
    Loader,
    cancelAppointment,
    paymentRazorpay,
    isLoading,
    slotDateFormat
  } = useContext(AppContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Show 5 appointments per page

  const timeNow = new Date();

  const parseAppointmentDateTime = (slotDate, slotTime) => {
    const [day, month, year] = slotDate.split("_");
    const formattedDate = `${month}/${day}/${year}`;
    return new Date(`${formattedDate} ${slotTime}`);
  };
  
  useEffect(() => {
    if (token) {
      getUserAppointments();
    }
  }, [token]);

  useEffect(() => {
    appointments.forEach((item) => {
      const appointmentDate = parseAppointmentDateTime(item.slotDate, item.slotTime);
      
      if (timeNow > appointmentDate && !item.payment && !item.cancelled) {
        cancelAppointment(item._id);
      }
    });
  }, [appointments]);

  // Calculate pagination
  const totalPages = Math.ceil(appointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAppointments = appointments.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    hidden: { opacity: 0, y: 30 },
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
      {/* Background Decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            x: [0, 40, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.1, 1, 1.1],
            rotate: [360, 180, 0],
            y: [0, -30, 0]
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-accent/5 to-primary/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <Calendar className="w-8 h-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-800">
              My <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Appointments</span>
            </h1>
            <Calendar className="w-8 h-8 text-secondary" />
          </motion.div>
          <motion.p 
            className="text-xl text-neutral-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Manage your healthcare appointments and track your medical journey.
          </motion.p>
        </motion.div>

        {appointments.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center py-20"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-8xl mb-8"
            >
              📅
            </motion.div>
            <h3 className="text-3xl font-bold text-neutral-700 mb-4">No Appointments Yet</h3>
            <p className="text-xl text-neutral-500 max-w-md mx-auto mb-8">
              Start your healthcare journey by booking your first appointment with our trusted doctors.
            </p>
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 15px 30px rgba(95, 111, 255, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/doctors")}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <Sparkles className="w-5 h-5" />
              Book Your First Appointment
            </motion.button>
          </motion.div>
        ) : (
          <>
            {/* Results Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <p className="text-neutral-600">
                  You have <span className="font-semibold text-neutral-800">{appointments.length}</span> appointment{appointments.length !== 1 ? 's' : ''}
                </p>
                {totalPages > 1 && (
                  <p className="text-sm text-neutral-500">
                    Page {currentPage} of {totalPages}
                  </p>
                )}
              </div>
            </motion.div>

            <motion.div
              key={currentPage} // Re-animate when page changes
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-6 mb-12"
            >
              {currentAppointments.map((item, index) => {
                const appointmentDate = parseAppointmentDateTime(item.slotDate, item.slotTime);
                const isPastAppointment = timeNow > appointmentDate;

                return (
                  <motion.div
                    key={item._id}
                    variants={cardVariants}
                    whileHover={{ y: -5, scale: 1.01 }}
                    className="group bg-white/80 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-neutral-100 overflow-hidden relative"
                  >
                    {/* Animated background on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                    />

                    <div className="p-8 relative z-10">
                      <div className="flex flex-col lg:flex-row gap-8">
                        {/* Doctor Image */}
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="lg:w-48 flex-shrink-0"
                        >
                          <img
                            className="w-full h-48 lg:h-56 object-cover rounded-2xl shadow-lg bg-gradient-to-br from-primary/10 to-secondary/10"
                            src={item.docData.image}
                            alt={item.docData.name}
                          />
                        </motion.div>

                        {/* Appointment Details */}
                        <div className="flex-1 space-y-6">
                          <div>
                            <motion.h3 
                              className="text-2xl font-bold text-neutral-800 mb-2 group-hover:text-primary transition-colors duration-300"
                              whileHover={{ scale: 1.02 }}
                            >
                              {item.docData.name}
                            </motion.h3>
                            <motion.p 
                              className="text-lg font-semibold text-primary mb-4"
                              animate={{ opacity: [0.7, 1, 0.7] }}
                              transition={{ duration: 3, repeat: Infinity, delay: index * 0.2 }}
                            >
                              {item.docData.speciality}
                            </motion.p>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <motion.div 
                              className="flex items-center gap-3 text-neutral-600"
                              whileHover={{ x: 5 }}
                            >
                              <MapPin className="w-5 h-5 text-primary" />
                              <div>
                                <p className="font-medium">Address:</p>
                                <p className="text-sm">{item.docData.address.line1}</p>
                                <p className="text-sm">{item.docData.address.line2}</p>
                              </div>
                            </motion.div>

                            <motion.div 
                              className="flex items-center gap-3 text-neutral-600"
                              whileHover={{ x: 5 }}
                            >
                              <Calendar className="w-5 h-5 text-secondary" />
                              <div>
                                <p className="font-medium">Date & Time:</p>
                                <p className="text-sm font-semibold">
                                  {slotDateFormat(item.slotDate)} | {item.slotTime}
                                </p>
                              </div>
                            </motion.div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold text-neutral-700">4.8 Rating</span>
                            </div>
                            <div className="w-px h-6 bg-neutral-300"></div>
                            <div className="text-lg font-bold text-neutral-800">
                              ₹{item.docData.fees}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="lg:w-64 flex flex-col gap-3">
                          <motion.button
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate(`/my-appointments/${item._id}`)}
                            className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
                          >
                            <Eye className="w-5 h-5" />
                            View Details
                          </motion.button>

                          {!item.cancelled && item.payment && (
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              className="flex items-center justify-center gap-3 bg-green-100 text-green-700 py-3 px-6 rounded-2xl font-semibold border border-green-200"
                            >
                              <CheckCircle className="w-5 h-5" />
                              Paid
                            </motion.div>
                          )}

                          {!isPastAppointment && !item.cancelled && !item.payment && (
                            <motion.button
                              whileHover={{ scale: 1.02, y: -2 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => paymentRazorpay(item._id)}
                              className="flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-secondary text-white py-3 px-6 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
                            >
                              <CreditCard className="w-5 h-5" />
                              Pay Online
                            </motion.button>
                          )}

                          {!isPastAppointment && !item.cancelled && (
                            <motion.button
                              whileHover={{ scale: 1.02, y: -2 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => cancelAppointment(item._id)}
                              className="flex items-center justify-center gap-3 bg-red-100 hover:bg-red-500 text-red-600 hover:text-white py-3 px-6 rounded-2xl font-semibold transition-all duration-300 border border-red-200"
                            >
                              <X className="w-5 h-5" />
                              Cancel
                            </motion.button>
                          )}

                          {item.cancelled && !item.isCompleted && (
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              className="flex items-center justify-center gap-3 bg-red-100 text-red-600 py-3 px-6 rounded-2xl font-semibold border border-red-200"
                            >
                              <X className="w-5 h-5" />
                              Cancelled
                            </motion.div>
                          )}

                          {item.isCompleted && (
                            <motion.div
                              whileHover={{ scale: 1.02 }}
                              className="flex items-center justify-center gap-3 bg-green-100 text-green-600 py-3 px-6 rounded-2xl font-semibold border border-green-200"
                            >
                              <CheckCircle className="w-5 h-5" />
                              Completed
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Status indicator */}
                    <motion.div
                      className={`absolute top-4 right-4 w-4 h-4 rounded-full ${
                        item.isCompleted 
                          ? "bg-green-500" 
                          : item.cancelled 
                          ? "bg-red-500" 
                          : item.payment 
                          ? "bg-blue-500" 
                          : "bg-yellow-500"
                      }`}
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={itemsPerPage}
              totalItems={appointments.length}
              className="mt-12"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default MyAppointment;