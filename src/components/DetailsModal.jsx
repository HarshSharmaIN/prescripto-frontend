import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

const DetailsModal = ({ phoneNumber, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userDetails, setUserDetails] = useState({
    phone: phoneNumber,
    name: "",
    email: "",
  });
  const { backendUrl, Loader, setToken } = useContext(AppContext);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        backendUrl + "/api/user/update-details",
        { userDetails }
      );

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        onClose();
      } else {
        setError("Error Occured");
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-transparent bg-opacity-30 backdrop-filter backdrop-blur-md transition-opacity"
        aria-hidden="true"
      ></div>
      <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="absolute top-3 right-3">
            <button
              type="button"
              className="focus:outline-none"
              onClick={onClose}
            >
              <img src={assets.cross_icon} alt="Cancel" className="w-5 h-5" />
            </button>
          </div>
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3
                className="text-lg leading-6 font-medium text-gray-900"
                id="modal-title"
              >
                Enter Your Details
              </h3>
              <div className="mt-2">
                <div className="mt-4 space-y-4">
                  <p className="text-sm text-gray-500">
                    Please enter your name.
                  </p>
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full py-2 px-3 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={userDetails.name}
                    onChange={(e) => setUserDetails((prev) => ({...prev, name: e.target.value}))}
                  />
                  <p className="text-sm text-gray-500">
                    Please enter your email address.
                  </p>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full py-2 px-3 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={userDetails.email}
                    onChange={(e) => setUserDetails((prev) => ({...prev, email: e.target.value}))}
                  />
                </div>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                <div className="mt-4 flex justify-center space-x-4">
                  <button
                    type="button"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={handleSubmit}
                    disabled={!userDetails.name || !userDetails.email || loading}
                  >
                    {loading ? <Loader color="#fff" /> : "Submit"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
