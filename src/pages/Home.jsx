import React, { useState } from 'react'

import Header from '../components/Header'
import Speciality from '../components/Speciality'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import Chat from '../pages/Chat'
import { BotMessageSquare } from 'lucide-react'
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
    <div className="relative">
      <Header />
      <Speciality />
      <TopDoctors />
      <TopBlogs />
      <Banner />

      <button
        onClick={handleOpenChat}
        className="fixed bottom-10 right-10 max-sm:bottom-6 max-sm:right-6 bg-blue-500 hover:bg-blue-700 text-white font-bold p-4 rounded-full shadow-lg transition-all"
      >
        <BotMessageSquare />
      </button>

      {showChatWindow && (
        <div className="fixed bottom-16 max-sm:bottom-6 right-6">
          <div className="p-4 overflow-y-auto">
            <Chat handleClose={handleCloseChat} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Home
