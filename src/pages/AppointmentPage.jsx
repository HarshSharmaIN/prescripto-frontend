import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Upload, Eye, Trash2, FileText, Calendar, Clock, User, Award, Sparkles, Heart } from "lucide-react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";
import axios from "axios";

const AppointmentPage = () => {
  const { appointmentId } = useParams();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(false);

  const {
    appointmentData,
    getAppointmentData,
    Loader,
    token,
    slotDateFormat,
    joinMeeting,
    paymentRazorpay,
    cancelAppointment,
    isLoading,
    setIsLoading,
    backendUrl,
    userData,
  } = useContext(AppContext);

  const timeNow = new Date();

  useEffect(() => {
    if (token) {
      getAppointmentData(appointmentId);
      fetchUploadedFiles();
    }
  }, [token]);

  const fetchUploadedFiles = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/user/get-files",
        { appointmentId },
        { headers: { token } }
      );
      setUploadedFiles(response.data.files);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      toast.error("No valid file selected!");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("appointmentId", appointmentId);

    try {
      const response = await axios.post(
        backendUrl + "/api/user/upload-file",
        formData,
        { headers: { token } }
      );
      setUploadedFiles((prev) => [
        ...prev,
        { name: response.data.fileName, url: response.data.url },
      ]);
      setSelectedFile(null);
      toast.success("File uploaded successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteFile = async (fileName) => {
    try {
      setIsLoading(true);
      await axios.post(
        backendUrl + "/api/user/delete-file",
        { fileName },
        { headers: { token } }
      );
      setUploadedFiles(uploadedFiles.filter((file) => file.name !== fileName));
      toast.success("File deleted successfully.");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const validateFiles = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "application/pdf",
      "image/jpg",
      "image/png",
    ];
    const maxSize = 1 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      toast.error(
        `Invalid file type: ${file.name}. Only JPG and PDF are allowed.`
      );
      return;
    }
    if (file.size > maxSize) {
      toast.error(`File too large: ${file.name}. Max allowed size is 1MB.`);
      return;
    }

    setSelectedFile(file);
  };

  const prescriptionFiles = uploadedFiles.filter((file) =>
    file.name.toLowerCase().includes("prescription.pdf")
  );
  const otherFiles = uploadedFiles.filter(
    (file) => !file.name.toLowerCase().includes("prescription.pdf")
  );

  if (!appointmentData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50/30 flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  const parseAppointmentDateTime = (slotDate, slotTime) => {
    const [day, month, year] = slotDate.split("_");
    const formattedDate = `${month}/${day}/${year}`;
    return new Date(`${formattedDate} ${slotTime}`);
  };

  const appointmentDate = parseAppointmentDateTime(
    appointmentData?.slotDate,
    appointmentData?.slotTime
  );

  const isPastAppointment = timeNow > appointmentDate;

  const handleSubmitReview = async () => {
    try {
      setIsLoading(true);
      if (!rating) {
        return toast.error("Please fill in all details!");
      }

      const review = {
        docId: appointmentData.docData._id,
        userName: userData.name,
        date: new Date().toISOString().split('T')[0],
        content: content,
        stars: rating,
      };
      const { data } = await axios.post(
        backendUrl + "/api/doctor/add-review",
        { review }
      );

      if (data.success) {
        toast.success(data.message);
        setRating(false);
        setContent("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
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
              Appointment <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">Details</span>
            </h1>
            <Calendar className="w-8 h-8 text-secondary" />
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Appointment & Doctor Info */}
          <div className="xl:col-span-2 space-y-8">
            {/* Appointment Details Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-neutral-100 p-8 relative overflow-hidden"
            >
              <motion.div
                className="absolute top-4 right-4 opacity-10"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-12 h-12 text-primary" />
              </motion.div>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <Calendar className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-bold text-neutral-800">Appointment Information</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 bg-neutral-50 rounded-2xl p-4"
                  >
                    <Calendar className="w-5 h-5 text-primary" />
                    <div>
                      <p className="text-sm font-semibold text-neutral-600">Date & Time</p>
                      <p className="text-lg font-bold text-neutral-800">
                        {slotDateFormat(appointmentData.slotDate)} | {appointmentData.slotTime}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 bg-neutral-50 rounded-2xl p-4"
                  >
                    <Award className="w-5 h-5 text-secondary" />
                    <div>
                      <p className="text-sm font-semibold text-neutral-600">Payment Status</p>
                      <p className={`text-lg font-bold ${appointmentData.payment ? 'text-green-600' : 'text-red-600'}`}>
                        {appointmentData.payment ? "Paid" : "Not Paid"}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mt-8">
                  {!appointmentData.cancelled && appointmentData.payment && (
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-3 bg-green-100 text-green-700 px-6 py-3 rounded-2xl font-semibold border border-green-200"
                    >
                      <Award className="w-5 h-5" />
                      Paid
                    </motion.div>
                  )}

                  {!appointmentData.cancelled && appointmentData.payment && !appointmentData.isCompleted && (
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => joinMeeting(appointmentData._id)}
                      className="flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      {isLoading ? <Loader color="#fff" /> : <><Eye className="w-5 h-5" />Join Meeting</>}
                    </motion.button>
                  )}

                  {!isPastAppointment && !appointmentData.cancelled && !appointmentData.payment && (
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => paymentRazorpay(appointmentData._id)}
                      className="flex items-center gap-3 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300"
                    >
                      <Award className="w-5 h-5" />
                      Pay Online
                    </motion.button>
                  )}

                  {!isPastAppointment && !appointmentData.cancelled && (
                    <motion.button
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => cancelAppointment(appointmentData._id)}
                      className="flex items-center gap-3 bg-red-100 hover:bg-red-500 text-red-600 hover:text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 border border-red-200"
                    >
                      <Trash2 className="w-5 h-5" />
                      Cancel
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Doctor & Patient Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Doctor Details */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-neutral-100 p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <User className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold text-neutral-800">Doctor Details</h3>
                </div>

                <div className="text-center mb-6">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    src={appointmentData.docData.image}
                    alt={appointmentData.docData.name}
                    className="w-24 h-24 rounded-2xl mx-auto mb-4 object-cover shadow-lg"
                  />
                  <h4 className="text-xl font-bold text-neutral-800">{appointmentData.docData.name}</h4>
                  <p className="text-primary font-semibold">{appointmentData.docData.speciality}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Degree:</span>
                    <span className="font-semibold">{appointmentData.docData.degree}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Experience:</span>
                    <span className="font-semibold">{appointmentData.docData.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Fees:</span>
                    <span className="font-semibold">₹{appointmentData.docData.fees}</span>
                  </div>
                </div>
              </motion.div>

              {/* Patient Details */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-neutral-100 p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Heart className="w-6 h-6 text-red-500" />
                  <h3 className="text-xl font-bold text-neutral-800">Patient Details</h3>
                </div>

                <div className="text-center mb-6">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    src={appointmentData.userData.image}
                    alt={appointmentData.userData.name}
                    className="w-24 h-24 rounded-2xl mx-auto mb-4 object-cover shadow-lg"
                  />
                  <h4 className="text-xl font-bold text-neutral-800">{appointmentData.userData.name}</h4>
                  <p className="text-neutral-600">{appointmentData.userData.email}</p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Phone:</span>
                    <span className="font-semibold">{appointmentData.userData.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Gender:</span>
                    <span className="font-semibold">{appointmentData.userData.gender}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">DOB:</span>
                    <span className="font-semibold">{appointmentData.userData.dob}</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column - Files & Review */}
          <div className="space-y-8">
            {/* File Upload Section */}
            {!appointmentData.cancelled && !appointmentData.isCompleted && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-neutral-100 p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Upload className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-bold text-neutral-800">Upload Files</h3>
                </div>

                <div className="space-y-4">
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.pdf,.png"
                    onChange={validateFiles}
                    className="block w-full text-sm text-neutral-500 file:mr-4 file:py-3 file:px-6 file:rounded-2xl file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20 transition-all duration-300"
                  />
                  
                  {selectedFile && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="p-4 bg-blue-50 rounded-2xl border border-blue-200"
                    >
                      <p className="text-sm font-semibold text-blue-800">Selected: {selectedFile.name}</p>
                    </motion.div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleFileUpload}
                    disabled={!selectedFile || isLoading}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-2xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50"
                  >
                    {isLoading ? <Loader color="#fff" /> : "Upload File"}
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Uploaded Files */}
            {otherFiles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
                className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-neutral-100 p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-6 h-6 text-secondary" />
                  <h3 className="text-xl font-bold text-neutral-800">Uploaded Files</h3>
                </div>

                <div className="space-y-4">
                  {otherFiles.map((file, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-neutral-50 rounded-2xl border border-neutral-200"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-primary" />
                        <span className="font-medium text-neutral-700 truncate">
                          {file.name.split("/")[1] || file.name}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => window.open(file.url, "_blank")}
                          className="p-2 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDeleteFile(file.name)}
                          className="p-2 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Prescriptions */}
            {prescriptionFiles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-neutral-100 p-8"
              >
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-bold text-neutral-800">Prescriptions</h3>
                </div>

                <div className="space-y-4">
                  {prescriptionFiles.map((file, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-green-50 rounded-2xl border border-green-200"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-green-600" />
                        <span className="font-medium text-green-800 truncate">
                          {file.name.split("/")[1] || file.name}
                        </span>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.open(file.url, "_blank")}
                        className="p-2 bg-green-100 text-green-600 rounded-xl hover:bg-green-200 transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Review Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.4 }}
              className="bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-neutral-100 p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <Star className="w-6 h-6 text-yellow-500" />
                <h3 className="text-xl font-bold text-neutral-800">Add Review</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-lg font-semibold text-neutral-700 mb-3">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setRating(star)}
                        className={`p-1 ${star <= rating ? "text-yellow-500" : "text-neutral-300"}`}
                      >
                        <Star className="w-8 h-8 fill-current" />
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-lg font-semibold text-neutral-700 mb-3">Review</label>
                  <textarea
                    className="w-full p-4 border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    rows="4"
                    placeholder="Share your experience..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmitReview}
                  disabled={!rating || isLoading}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 disabled:opacity-50"
                >
                  {isLoading ? <Loader color="#fff" /> : "Submit Review"}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;