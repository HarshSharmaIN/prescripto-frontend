import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Bot, User, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

export const ChatMessage = ({ message }) => {
  const { Loader } = useContext(AppContext);
  const isBot = message.sender === "bot";

  if (message.isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-start mb-3 sm:mb-4"
      >
        <div className="flex items-start gap-2 sm:gap-3 flex-row">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-6 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20"
          >
            <Bot className="w-3 h-3 sm:w-5 sm:h-5 text-primary" />
          </motion.div>
          <div className="max-w-[200px] sm:max-w-xs md:max-w-md px-3 sm:px-6 py-2 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-neutral-50 to-white border border-neutral-200 shadow-sm">
            <div className="flex items-center gap-2">
              <Loader />
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isBot ? "justify-start" : "justify-end"} mb-3 sm:mb-4`}
    >
      <div
        className={`flex items-start gap-2 sm:gap-3 max-w-[85%] ${
          isBot ? "flex-row" : "flex-row-reverse"
        }`}
      >
        <motion.div
          whileHover={{ scale: 1.1 }}
          className={`w-6 h-6 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center border-2 ${
            isBot
              ? "bg-gradient-to-br from-primary/10 to-secondary/10 border-primary/20"
              : "bg-gradient-to-br from-green-100 to-emerald-100 border-green-200"
          }`}
        >
          {isBot ? (
            <Bot className="w-3 h-3 sm:w-5 sm:h-5 text-primary" />
          ) : (
            <User className="w-3 h-3 sm:w-5 sm:h-5 text-green-600" />
          )}
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className={`px-3 sm:px-6 py-2 sm:py-4 rounded-xl sm:rounded-2xl shadow-sm border relative ${
            isBot
              ? "bg-gradient-to-r from-neutral-50 to-white border-neutral-200 text-neutral-800"
              : "bg-gradient-to-r from-primary to-secondary text-white border-primary/20"
          }`}
        >
          {/* Message Content */}
          <div className="markdown-content text-xs sm:text-sm">
            <ReactMarkdown
              children={message.text}
              remarkPlugins={[remarkGfm]}
            />
          </div>

          {/* Timestamp */}
          <div
            className={`text-xs mt-1 sm:mt-2 ${
              isBot ? "text-neutral-500" : "text-white/70"
            }`}
          >
            {message.timestamp.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>

          {/* Decorative Elements for Bot Messages */}
          {isBot && (
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -top-0.5 -right-0.5 w-2 h-2 sm:w-3 sm:h-3 bg-gradient-to-r from-primary to-secondary rounded-full opacity-60"
            />
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};
