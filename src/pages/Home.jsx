import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'

import Header from '../components/Header'
import Speciality from '../components/Speciality'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import Chat from '../pages/Chat'
import TopBlogs from '../components/TopBlogs'

const Home = () => {
  const [showChatWindow, setShowChatWindow] = useState(false);

  const handleOpenChat = () => {
    setShowChatWindow(true);
  };

  const handleCloseChat = () => {
    setShowChatWindow(false);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-neutral-50 to-blue-50/30">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute top-96 right-10 w-80 h-80 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-accent/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <Header />
        <Speciality />
        <TopDoctors />
        <TopBlogs />
        <Banner />
      </div>

      {/* Enhanced Floating Chat Button */}
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
        className="fixed bottom-8 right-8 z-40 bg-gradient-to-r from-primary via-secondary to-accent text-white p-4 rounded-full shadow-2xl hover:shadow-primary/25 transition-all duration-300 relative overflow-hidden group"
      >
        {/* Animated background */}
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent opacity-75 rounded-full"
        />
        
        {/* Button content */}
        <div className="relative z-10">
          <MessageCircle className="w-6 h-6" />
        </div>
        
        {/* Pulse effect */}
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full"
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {showChatWindow && (
          <Chat handleClose={handleCloseChat} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Home