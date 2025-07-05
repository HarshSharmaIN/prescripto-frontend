import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Bot, Sparkles } from "lucide-react";

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
import Chat from "./pages/Chat";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DoctorBlogs from "./pages/BlogsPage";
import Blog from "./pages/Blog";

const App = () => {
  const location = useLocation();
  const [showChatWindow, setShowChatWindow] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  const handleOpenChat = () => {
    setShowChatWindow(true);
  };

  const handleCloseChat = () => {
    setShowChatWindow(false);
  };

  // Don't show chat button on Home page (it has its own) or Meeting page
  const showGlobalChatButton = location.pathname !== "/" && location.pathname !== "/meeting";

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

      {/* Global Floating Chat Button (for all pages except Home and Meeting) */}
      {showGlobalChatButton && (
        <motion.button
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 1, type: "spring", stiffness: 200 }}
          whileHover={{ 
            scale: 1.1, 
            boxShadow: "0 20px 40px rgba(59, 130, 246, 0.4)",
            y: -5
          }}
          whileTap={{ scale: 0.9 }}
          onClick={handleOpenChat}
          className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-primary via-secondary to-accent text-white p-4 rounded-full shadow-2xl hover:shadow-primary/25 transition-all duration-300 relative overflow-hidden group"
        >
          {/* Animated background */}
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-75 rounded-full"
          />
          
          {/* Button content */}
          <div className="relative z-10 flex items-center justify-center">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Bot className="w-6 h-6" />
            </motion.div>
          </div>
          
          {/* Pulse effect */}
          <motion.div
            animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full"
          />

          {/* Tooltip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 10 }}
            whileHover={{ opacity: 1, scale: 1, x: 0 }}
            className="absolute right-full mr-4 top-1/2 transform -translate-y-1/2 bg-black/80 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap border border-white/20"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Chat with AI Assistant
            </div>
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-8 border-l-black/80 border-t-4 border-t-transparent border-b-4 border-b-transparent"></div>
          </motion.div>
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {showChatWindow && (
          <Chat handleClose={handleCloseChat} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;