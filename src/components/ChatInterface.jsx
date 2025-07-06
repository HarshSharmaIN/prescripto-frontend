import { Send, Stethoscope, UsersRound, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { ChatMessage } from "./ChatMessage";

function ChatInterface({
  messages,
  input,
  setInput,
  handleSubmit,
  chatContainerRef,
  showRecommendDoctorsButton,
  handleShowRecommendedDoctors
}) {
  return (
    <div className="bg-gradient-to-b from-neutral-50 to-white overflow-hidden">
      {/* Chat Messages Area */}
      <div
        ref={chatContainerRef}
        className="h-[350px] sm:h-[400px] md:h-[450px] overflow-y-auto p-3 sm:p-6 space-y-3 sm:space-y-4 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent"
      >
        {messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-6 sm:py-8"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4"
            >
              <Stethoscope className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            </motion.div>
            <h3 className="text-base sm:text-lg font-semibold text-neutral-700 mb-2">
              Welcome to Medical Assistant
            </h3>
            <p className="text-neutral-500 text-xs sm:text-sm px-4">
              I'm here to help with your healthcare needs
            </p>
          </motion.div>
        )}
        
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ChatMessage message={message} />
          </motion.div>
        ))}
      </div>

      {/* Input Area */}
      <div className="border-t border-neutral-200 bg-white/80 backdrop-blur-sm">
        <form onSubmit={handleSubmit} className="p-3 sm:p-4">
          <div className="flex flex-col gap-2 sm:gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="w-full rounded-xl sm:rounded-2xl border border-neutral-200 px-3 sm:px-4 py-2 sm:py-3 pr-10 sm:pr-12 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 bg-white/80 backdrop-blur-sm text-sm sm:text-base"
              />
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400" />
              </motion.div>
            </div>
            
            <div className="flex gap-2">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-primary to-secondary text-white rounded-xl sm:rounded-2xl px-4 sm:px-6 py-2 sm:py-3 hover:shadow-lg transition-all duration-300 flex justify-center items-center gap-2 flex-1 sm:flex-none font-semibold text-sm sm:text-base"
              >
                <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Send</span>
              </motion.button>
              
              {showRecommendDoctorsButton && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleShowRecommendedDoctors}
                  className="bg-gradient-to-r from-accent to-primary text-white hover:shadow-lg transition-all duration-300 font-semibold py-2 sm:py-3 px-3 sm:px-4 rounded-xl sm:rounded-2xl"
                >
                  <UsersRound className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChatInterface;