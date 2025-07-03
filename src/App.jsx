import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
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
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50/30">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#fff',
            borderRadius: '16px',
            padding: '16px 20px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            border: 'none',
          },
          success: {
            style: {
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#10b981',
            },
          },
          error: {
            style: {
              background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#ef4444',
            },
          },
          loading: {
            style: {
              background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#3b82f6',
            },
          },
        }}
      />
      <div className="mx-4 sm:mx-[10%]">
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
      </div>
      <Footer />
    </div>
  );
};

export default App;