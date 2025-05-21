import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { Star } from "lucide-react";

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
      toast.warn("No valid file selected!");
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
      toast.success("File Successfully Deleted.");
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
      toast.alert(
        `Invalid file type: ${file.name}. Only JPG and PDF are allowed.`
      );
      return;
    }
    if (file.size > maxSize) {
      toast.alert(`File too large: ${file.name}. Max allowed size is 1MB.`);
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
    return <Loader />;
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
      setIsLoading(true)
      if (!rating) {
        return toast.error("Please fill in all details!")
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
        setRating(false)
        setContent("")
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="p-6">
        <div className="flex-1 border border-gray-300 p-4 rounded-md shadow-sm mb-6">
          <h2 className="text-2xl font-semibold mb-4">Appointment Details</h2>
          <p className="mb-2">
            <span className="font-bold">Date:</span>{" "}
            {slotDateFormat(appointmentData.slotDate)} |{" "}
            {appointmentData.slotTime}
          </p>
          <p className="mb-2">
            <span className="font-bold">Payment Status:</span>{" "}
            {appointmentData.payment ? "Paid" : "Not Paid"}
          </p>
          <div className="flex flex-row gap-5">
            {!appointmentData.cancelled && appointmentData.payment && (
              <button className="w-20 sm:min-w-48 py-1 border rounded text-stone-500 bg-indigo-50">
                Paid
              </button>
            )}
            {!appointmentData.cancelled &&
              appointmentData.payment &&
              !appointmentData.isCompleted && (
                <button
                  onClick={() => joinMeeting(appointmentData._id)}
                  className="w-20 text-sm text-stone-500 text-center sm:min-w-40 py-2 border rounded hover:bg-primary hover:text-white focus:bg-primary focus:text-white transition-all duration-300"
                >
                  {isLoading ? <Loader color="#fff" /> : "Join"}
                </button>
              )}
            {!isPastAppointment &&
              !appointmentData.cancelled &&
              !appointmentData.payment && (
                <button
                  onClick={() => paymentRazorpay(appointmentData._id)}
                  className="w-20 text-sm text-stone-500 text-center sm:min-w-40 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Pay Online
                </button>
              )}
            {!isPastAppointment && !appointmentData.cancelled && (
              <button
                onClick={() => cancelAppointment(appointmentData._id)}
                className="w-40 text-sm text-stone-500 text-center sm:min-w-40 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300"
              >
                Cancel Appointment
              </button>
            )}
            {appointmentData.cancelled && !appointmentData.isCompleted && (
              <button className="sm:min-w-48 py-2 border-red-500 rounded text-red-500">
                Appointment cancelled
              </button>
            )}
            {appointmentData.isCompleted && (
              <button className="w-30 sm:min-w-48 py-2 border border-green-500 rounded text-green-500">
                Completed
              </button>
            )}
          </div>
        </div>

        <hr className="border-gray-300 my-6" />

        <div className="flex flex-col lg:flex-row space-x-4 gap-4">
          <div className="flex-1 border border-gray-300 p-4 rounded-md shadow-sm mx-auto">
            <h2 className="text-xl font-semibold mb-4">Doctor Details</h2>
            <img
              src={appointmentData.docData.image}
              alt={appointmentData.docData.name}
              className="w-20 h-20 rounded-full mb-4"
            />
            <p className="mb-2">
              <span className="font-bold">Name:</span>{" "}
              {appointmentData.docData.name}
            </p>
            <p className="mb-2">
              <span className="font-bold">Speciality:</span>{" "}
              {appointmentData.docData.speciality}
            </p>
            <p className="mb-2">
              <span className="font-bold">Degree:</span>{" "}
              {appointmentData.docData.degree}
            </p>
            <p className="mb-2">
              <span className="font-bold">Experience:</span>{" "}
              {appointmentData.docData.experience}
            </p>
            <p className="mb-2">
              <span className="font-bold">Fees:</span> ₹
              {appointmentData.docData.fees}
            </p>
            <p className="mb-2">
              <span className="font-bold">Address:</span>{" "}
              {appointmentData.docData.address.line1},{" "}
              {appointmentData.docData.address.line2}
            </p>
          </div>

          <div className="flex-1 border border-gray-300 p-4 rounded-md shadow-sm mx-auto">
            <h2 className="text-xl font-semibold mb-4">User Details</h2>
            <img
              src={appointmentData.userData.image}
              alt={appointmentData.userData.name}
              className="w-20 h-20 rounded-full mb-4"
            />
            <p className="mb-2">
              <span className="font-bold">Name:</span>{" "}
              {appointmentData.userData.name}
            </p>
            <p className="mb-2">
              <span className="font-bold">Email:</span>{" "}
              {appointmentData.userData.email}
            </p>
            <p className="mb-2">
              <span className="font-bold">Phone:</span>{" "}
              {appointmentData.userData.phone}
            </p>
            <p className="mb-2">
              <span className="font-bold">Gender:</span>{" "}
              {appointmentData.userData.gender}
            </p>
            <p className="mb-2">
              <span className="font-bold">DOB:</span>{" "}
              {appointmentData.userData.dob}
            </p>
            <p className="mb-2">
              <span className="font-bold">Address:</span>{" "}
              {appointmentData.userData.address.line1},{" "}
              {appointmentData.userData.address.line2}
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 space-y-8 p-6">
        {!appointmentData.cancelled && !appointmentData.isCompleted && (
          <div className="border border-gray-300 p-4 rounded-md shadow-sm">
            <h3 className="text-xl font-semibold mb-4">Upload Area</h3>
            <input
              type="file"
              accept=".jpg,.jpeg,.pdf,.png"
              onChange={validateFiles}
              className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
            />
            <button
              className="w-20 text-sm text-stone-500 text-center sm:min-w-48 py-2 mt-4 border rounded hover:bg-primary hover:text-white focus:bg-primary focus:text-white transition-all duration-300"
              onClick={handleFileUpload}
            >
              {isLoading ? <Loader color="#fff" /> : "Upload"}
            </button>
          </div>
        )}

        {!appointmentData.cancelled && (
          <div className="space-y-8">
            <div className="border border-gray-300 p-4 rounded-md shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Uploaded Files</h3>
              {otherFiles.length > 0 ? (
                <div>
                  {otherFiles.map((file, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-300 rounded-md shadow-md flex flex-col"
                    >
                      <p className="text-lg font-medium text-gray-700 mb-3">
                        {file.name.split("/")[1] || file.name}
                      </p>
                      <div className="flex gap-2 w-full">
                        <button
                          onClick={() => window.open(file.url, "_blank")}
                          className="flex-1 py-2 px-4 text-sm font-semibold text-gray-800 bg-yellow-400 rounded-md shadow-sm transition hover:bg-yellow-500"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDeleteFile(file.name)}
                          className="flex-1 py-2 px-4 text-sm font-semibold text-gray-800 bg-red-500 rounded-md shadow-sm transition hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No files uploaded yet.</p>
              )}
            </div>

            {prescriptionFiles.length > 0 && (
              <div className="border border-gray-300 p-4 rounded-md shadow-sm">
                <h3 className="text-xl font-semibold mb-4">Prescription</h3>
                <div className="flex h-[20vh] max-w-[40vw] overflow-x-scroll gap-3">
                  {prescriptionFiles.map((file, index) => (
                    <div
                      key={index}
                      className="p-4 border border-gray-300 rounded-md shadow-md flex flex-col"
                    >
                      <p className="text-lg font-medium text-gray-700 mb-3 truncate">
                        {file.name.split("/")[1] || file.name}
                      </p>
                      <div className="flex gap-2 w-full">
                        <button
                          onClick={() => window.open(file.url, "_blank")}
                          className="flex-1 py-2 px-4 text-sm font-semibold text-gray-800 bg-yellow-400 rounded-md shadow-sm transition hover:bg-yellow-500"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="border border-gray-300 p-4 rounded-md shadow-sm">
          <h3 className="text-xl font-semibold mb-4">Add Review</h3>
          <div className="mb-4">
            <label className="text-lg font-medium text-gray-700 mb-2">
              Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={`text-xl ${
                    star <= rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                >
                  <Star />
                </button>
              ))}
            </div>
          </div>
          <textarea
            className="block w-full text-sm text-gray-700 p-2 border border-gray-300 rounded-md"
            rows="4"
            placeholder="Write your review here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button
            className="mt-4 py-2 px-4 bg-blue-500 text-white font-semibold rounded-md shadow-sm transition hover:bg-blue-600"
            onClick={handleSubmitReview}
          >
            {isLoading ? <Loader color="#fff" /> : 'Submit Review'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentPage;
