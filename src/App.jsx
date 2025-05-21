import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Routes, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import About from "./pages/About";
import Doctors from "./pages/Doctors";
import Contact from "./pages/Contact";
import Profile from "./pages/Profile";
import MeetingRoom from "./pages/Meeting";
import AppointmentPage from "./pages/AppointmentPage";
import Appointment from "./pages/Appointment";
import MyAppointment from "./pages/MyAppointment";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DoctorBlogs from "./pages/BlogsPage";
import Blog from "./pages/Blog";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/meeting" element={<MeetingRoom />} />
        <Route path="/my-appointments" element={<MyAppointment />} />
        <Route
          path="/my-appointments/:appointmentId"
          element={<AppointmentPage />}
        />
        <Route path="/appointments/:docId" element={<Appointment />} />
        <Route path="/blogs" element={<DoctorBlogs />} />
        <Route path="/blog/:blogId" element={<Blog />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
