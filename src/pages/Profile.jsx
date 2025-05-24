import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets.js";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);
  const [isloading, setIsloading] = useState(false);

  const {
    userData,
    setUserData,
    token,
    backendUrl,
    loadUserProfileData,
    Loader,
  } = useContext(AppContext);

  const updateUserProfileData = async () => {
    try {
      setIsloading(true);
      const formData = new FormData();

      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsloading(false);
    }
  };

  const cancelUpdateProfile = async () => {
    try {
      await loadUserProfileData();
      setIsEdit(false);
      setImage(null);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return !userData ? (
    <Loader />
  ) : (
    <div className="max-w-lg w-full max-sm:mx-auto p-4 flex flex-col gap-4 text-sm">
      {/* Profile Image Section */}
      {isEdit ? (
        <label htmlFor="image" className="block">
          <div className="relative inline-block cursor-pointer">
            <img
              className="w-28 md:w-36 rounded opacity-75"
              src={image ? URL.createObjectURL(image) : userData.image}
              alt="Profile"
            />
            <img
              className="w-8 md:w-10 absolute bottom-2 right-2"
              src={assets.upload_icon}
              alt="Upload"
            />
          </div>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id="image"
            hidden
          />
        </label>
      ) : (
        <img
          className="w-28 md:w-36 rounded max-sm:mx-auto"
          src={userData.image}
          alt="Profile"
        />
      )}

      {/* Name Section */}
      {isEdit ? (
        <div className="flex max-sm:items-center border rounded-2xl border-gray-400 p-2">
          <img
            src={assets.edit_icon}
            alt="Edit"
            className="bg-gray-50 w-6 md:w-[25px] mx-2"
          />
          <input
            className="bg-gray-50 text-xl md:text-3xl font-medium w-full"
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserData((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        </div>
      ) : (
        <p className="font-medium text-xl md:text-3xl text-neutral-800 mt-4 max-sm:text-center">
          {userData.name}
        </p>
      )}

      <hr className="bg-zinc-400 h-px border-none" />

      {/* Contact Information Section */}
      <div>
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Email id:</p>
          <p className="text-blue-500">{userData.email}</p>

          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <div className="flex items-center border rounded-2xl border-gray-400 p-1">
              <img
                src={assets.edit_icon}
                alt="Edit"
                className="bg-gray-50 w-4 md:w-[15px] mx-2"
              />
              <input
                className="bg-gray-100 w-full"
                type="text"
                value={userData.phone}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phone: e.target.value }))
                }
              />
            </div>
          ) : (
            <p className="text-blue-400">{userData.phone}</p>
          )}

          <p className="font-medium">Address:</p>
          {isEdit ? (
            <div>
              <div className="flex items-center border rounded-2xl border-gray-400 p-1 mb-2">
                <img
                  src={assets.edit_icon}
                  alt="Edit"
                  className="bg-gray-50 w-4 md:w-[15px] mx-2"
                />
                <input
                  className="bg-gray-50 w-full"
                  type="text"
                  value={userData.address.line1}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line1: e.target.value },
                    }))
                  }
                />
              </div>
              <div className="flex items-center border rounded-2xl border-gray-400 p-1">
                <img
                  src={assets.edit_icon}
                  alt="Edit"
                  className="bg-gray-50 w-4 md:w-[15px] mx-2"
                />
                <input
                  className="bg-gray-50 w-full"
                  type="text"
                  value={userData.address.line2}
                  onChange={(e) =>
                    setUserData((prev) => ({
                      ...prev,
                      address: { ...prev.address, line2: e.target.value },
                    }))
                  }
                />
              </div>
            </div>
          ) : (
            <p className="text-gray-500">
              {userData.address.line1}
              <br />
              {userData.address.line2}
            </p>
          )}
        </div>
      </div>

      {/* Basic Information Section */}
      <div>
        <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <div className="flex items-center">
              <img
                src={assets.edit_icon}
                alt="Edit"
                className="bg-gray-50 w-4 md:w-[15px] mx-2"
              />
              <select
                className="w-full bg-gray-100"
                value={userData.gender}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
          ) : (
            <p className="text-gray-400">{userData.gender}</p>
          )}

          <p className="font-medium">Birthday:</p>
          {isEdit ? (
            <div className="flex items-center">
              <img
                src={assets.edit_icon}
                alt="Edit"
                className="bg-gray-50 w-4 md:w-[15px] mx-2"
              />
              <input
                className="w-full bg-gray-100"
                type="date"
                value={userData.dob}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, dob: e.target.value }))
                }
              />
            </div>
          ) : (
            <p className="text-gray-400">{userData.dob}</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-10 flex flex-col sm:flex-row gap-2">
        {isEdit && (
          <button
            className="border border-red-500 px-8 py-2 rounded-full hover:bg-red-400 hover:text-white transition-all"
            onClick={cancelUpdateProfile}
          >
            Cancel
          </button>
        )}
        {isEdit ? (
          <button
            className="border border-primary px-8 py-2 rounded-full focus:bg-primary focus:text-white transition-all"
            onClick={updateUserProfileData}
          >
            {isloading ? <Loader color="#ffffff" /> : "Save Information"}
          </button>
        ) : (
          <button
            className="border border-primary px-8 py-2 rounded-full focus:bg-primary focus:text-white transition-all"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
