import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Star,
  MapPin,
  Clock,
  Calendar,
  Shield,
  Award,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { toast } from "react-hot-toast";
import axios from "axios";

import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import Review from "../components/Review";

const Appointment = () => {
  const { docId } = useParams();
  const navigate = useNavigate();

  const [docInfo, setDocinfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");
  const [isLoading, setIsLoading] = useState("");

  const { doctors, currSymbol, backendUrl, token, getDoctorsData, Loader } =
    useContext(AppContext);

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let days = 7;

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocinfo(docInfo);
  };

  const getAvailableSlots = async () => {
    setDocSlots([]);
    let today = new Date();

    for (let i = 0; i < days; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(
          currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10
        );
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;

        const isSlotAvailable =
          docInfo?.slots_booked[slotDate] &&
          docInfo?.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvailable) {
          timeSlots.push({
            date: new Date(currentDate),
            time: formattedTime,
          });
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      timeSlots.length > 0
        ? setDocSlots((prev) => [...prev, timeSlots])
        : days++;
    }
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.error("Login to book appointment");
      return navigate("/login");
    }

    try {
      setIsLoading(true);
      const date = docSlots[slotIndex][0].date;

      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    getAvailableSlots();
  }, [docInfo]);

  return (
    docInfo && (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50/30 py-4 sm:py-8">
        {/* Background Decoration */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              x: [0, 30, 0],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-10 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl"
          />
          <motion.div
            animate={{
              scale: [1.1, 1, 1.1],
              rotate: [360, 180, 0],
              y: [0, -20, 0],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 right-10 w-56 h-56 sm:w-72 sm:h-72 bg-gradient-to-r from-accent/5 to-primary/5 rounded-full blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-3 sm:px-4">
          {/* Doctor Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row gap-6 sm:gap-8 mb-8 sm:mb-12"
          >
            {/* Doctor Image */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="w-full sm:w-80 lg:w-80 mx-auto lg:mx-0"
            >
              <img
                className="w-full h-64 sm:h-80 lg:h-auto object-cover rounded-2xl sm:rounded-3xl shadow-2xl bg-gradient-to-br from-primary/10 to-secondary/10"
                src={docInfo.image}
                alt={docInfo.name}
              />
            </motion.div>

            {/* Doctor Information */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-neutral-100 relative overflow-hidden"
            >
              {/* Decorative elements */}
              <motion.div
                className="absolute top-4 right-4 opacity-10"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
              </motion.div>

              <div className="relative z-10">
                <motion.div
                  className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-4 sm:mb-6"
                  whileHover={{ scale: 1.02 }}
                >
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-neutral-800 text-center sm:text-left">
                    {docInfo.name}
                  </h1>
                  <motion.img
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                    className="w-6 h-6 sm:w-8 sm:h-8 mx-auto sm:mx-0"
                    src={assets.verified_icon}
                    alt="Verified"
                  />
                </motion.div>

                <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6 justify-center sm:justify-start">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 px-3 sm:px-4 py-2 rounded-xl sm:rounded-2xl border border-primary/20"
                  >
                    <Award className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    <span className="font-semibold text-neutral-700 text-sm sm:text-base">
                      {docInfo.degree} - {docInfo.speciality}
                    </span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 bg-gradient-to-r from-accent/10 to-primary/10 px-3 sm:px-4 py-2 rounded-xl sm:rounded-2xl border border-accent/20"
                  >
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                    <span className="font-semibold text-neutral-700 text-sm sm:text-base">
                      {docInfo.experience}
                    </span>
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-4 sm:mb-6"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                    <h3 className="text-base sm:text-lg font-bold text-neutral-800">
                      About Doctor
                    </h3>
                  </div>
                  <p className="text-neutral-600 leading-relaxed text-sm sm:text-base lg:text-lg text-center sm:text-left">
                    {docInfo.about}
                  </p>
                </motion.div>

                <motion.div
                  className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 justify-center sm:justify-start"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-yellow-400 text-yellow-400" />
                    <span className="text-xl sm:text-2xl font-bold text-neutral-800">
                      4.8
                    </span>
                    <span className="text-neutral-600 text-sm sm:text-base">
                      (124 reviews)
                    </span>
                  </div>
                  <div className="w-px h-6 bg-neutral-300 hidden sm:block"></div>
                  <div className="text-xl sm:text-2xl font-bold text-neutral-800 text-center sm:text-left">
                    {currSymbol}
                    {docInfo.fees}
                    <span className="text-base sm:text-lg font-normal text-neutral-600 ml-1">
                      / session
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Booking Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-xl border border-neutral-100 mb-8 sm:mb-12"
          >
            <motion.h2
              className="text-xl sm:text-2xl font-bold text-neutral-800 mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 justify-center sm:justify-start"
              whileHover={{ scale: 1.02 }}
            >
              <Calendar className="w-5 h-5 sm:w-7 sm:h-7 text-primary" />
              Available Booking Slots
            </motion.h2>

            {/* Date Selection */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-semibold text-neutral-700 mb-3 sm:mb-4 text-center sm:text-left">
                Select Date:
              </h3>
              <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-4 px-2 sm:px-0">
                {docSlots.length &&
                  docSlots.map((item, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSlotIndex(index)}
                      className={`flex-shrink-0 text-center py-3 sm:py-6 px-3 sm:px-4 min-w-16 sm:min-w-20 rounded-xl sm:rounded-2xl cursor-pointer transition-all duration-300 ${
                        slotIndex === index
                          ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                          : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-200"
                      }`}
                    >
                      <p className="text-xs sm:text-sm font-semibold">
                        {item[0] && daysOfWeek[item[0].date.getDay()]}
                      </p>
                      <p className="text-lg sm:text-xl font-bold">
                        {item[0] && item[0].date.getDate()}
                      </p>
                    </motion.div>
                  ))}
              </div>
            </div>

            {/* Time Selection */}
            <div className="mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-semibold text-neutral-700 mb-3 sm:mb-4 text-center sm:text-left">
                Select Time:
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 sm:gap-3">
                {docSlots.length &&
                  docSlots[slotIndex].map((item, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSlotTime(item.time)}
                      className={`py-2 sm:py-3 px-2 sm:px-4 rounded-xl sm:rounded-2xl font-semibold transition-all duration-300 text-sm sm:text-base ${
                        item.time === slotTime
                          ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                          : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-200"
                      }`}
                    >
                      {item.time.toLowerCase()}
                    </motion.button>
                  ))}
              </div>
            </div>

            {/* Book Button */}
            <motion.button
              whileHover={{
                scale: 1.02,
                boxShadow: "0 15px 30px rgba(95, 111, 255, 0.3)",
                y: -2,
              }}
              whileTap={{ scale: 0.98 }}
              onClick={bookAppointment}
              disabled={!slotTime || isLoading}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white px-8 sm:px-12 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 sm:gap-3"
            >
              {isLoading ? (
                <Loader color="#fff" />
              ) : (
                <>
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                  Book Appointment
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </>
              )}
            </motion.button>
          </motion.div>

          {/* Reviews Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-8 sm:mb-12"
          >
            <motion.h2
              className="text-2xl sm:text-3xl font-bold text-neutral-800 mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3 justify-center sm:justify-start"
              whileHover={{ scale: 1.02 }}
            >
              <Star className="w-6 h-6 sm:w-8 sm:h-8 text-yellow-500" />
              Patient Reviews
            </motion.h2>
            {docInfo.reviews &&
            docInfo.reviews.some((r) => Object.keys(r).length > 0) ? (
              <div className="space-y-4 sm:space-y-6">
                {docInfo.reviews
                  .filter((review) => Object.keys(review).length > 0)
                  .map((review, index) => (
                    <Review key={index} review={review} />
                  ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8 sm:py-12 bg-white/50 backdrop-blur-sm rounded-2xl sm:rounded-3xl border border-neutral-200"
              >
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-4xl sm:text-6xl mb-3 sm:mb-4"
                >
                  ⭐
                </motion.div>
                <h3 className="text-lg sm:text-xl font-semibold text-neutral-700 mb-2">
                  No Reviews Yet
                </h3>
                <p className="text-neutral-500 text-sm sm:text-base">
                  Be the first to share your experience!
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Related Doctors */}
          <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
        </div>
      </div>
    )
  );
};

export default Appointment;
