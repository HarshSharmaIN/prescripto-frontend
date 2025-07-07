import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { BeatLoader } from "react-spinners";
import { StreamVideoClient } from "@stream-io/video-react-sdk";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currSymbol = "₹";
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [userData, setUserData] = useState(false);
  const [meetingData, setMeetingData] = useState({});
  const [appointmentData, setAppointmentData] = useState(false);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);

    let age = today.getFullYear() - birthDate.getFullYear();
    return age;
  };

  const getDoctorsData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/doctor/list");

      if (data.success) {
        setDoctors(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  const getAppointmentData = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/get-appointment",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        setAppointmentData(data.appointment);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/get-profile",
        {},
        { headers: { token } }
      );

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  const Loader = ({ color }) => (
    <BeatLoader color={color || "#5f6FFF"} size={10} loading={true} />
  );

  const handleGoogleOAuth = async (credential) => {
    try {
      const { data } = await axios.post(backendUrl + "/api/user/google-login", {
        credential,
      });
      console.log(credential);
      
      console.log(data);

      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    const dateArray = slotDate.split("_");
    return (
      dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    );
  };

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/appointments",
        {},
        { headers: { token } }
      );
      if (data.success) {
        setAppointments(data.appointments.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getUserAppointments();
        getDoctorsData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: "Appointment Payment",
      description: "Appointment Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            backendUrl + "/api/user/verify-razorpay",
            response,
            { headers: { token } }
          );

          if (data.success) {
            getUserAppointments();
            navigate("/my-appointments");
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const paymentRazorpay = async (appointmentId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-razorpay",
        { appointmentId },
        { headers: { token } }
      );

      if (data.success) {
        initPay(data.order);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const joinMeeting = async (appointmentId) => {
    const apiKey = import.meta.env.VITE_STREAM_API_KEY;
    const userId = userData._id;
    const callId = appointmentId;

    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/token",
        { id: userId },
        { headers: { token } }
      );
      const userToken = data.token;

      const user = {
        id: userId,
        name: userData.name,
        image: userData.image,
      };

      if (!userToken) {
        setIsLoading(true);
      }

      const client = StreamVideoClient.getOrCreateInstance({
        apiKey,
        user,
        token: userToken,
      });
      const call = client.call("default", callId);
      call.join({ create: true });
      setMeetingData({ call, client, appointmentId });
      navigate("/meeting");
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const value = {
    calculateAge,
    slotDateFormat,
    doctors,
    getDoctorsData,
    token,
    setToken,
    backendUrl,
    currSymbol,
    userData,
    setUserData,
    loadUserProfileData,
    Loader,
    handleGoogleOAuth,
    meetingData,
    setMeetingData,
    appointmentData,
    getAppointmentData,
    cancelAppointment,
    paymentRazorpay,
    appointments,
    getUserAppointments,
    joinMeeting,
    isLoading,
    setIsLoading,
  };

  useEffect(() => {
    getDoctorsData();
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
