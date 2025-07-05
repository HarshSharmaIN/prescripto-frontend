import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Sparkles, Bot } from 'lucide-react'

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

      {/* Enhanced Floating Chat Button - Fixed Position */}
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
        style={{ position: 'fixed', bottom: '2rem', right: '2rem' }}
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