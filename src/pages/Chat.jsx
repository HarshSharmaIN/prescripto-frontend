import { useState, useRef, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatInterface from "../components/ChatInterface";
import { extractInfo } from "../utils/helpers";
import handleChat from "../utils/handleChat";
import { Stethoscope, X, Sparkles, Bot, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";

function Chat({ handleClose }) {
  const { userData: profileData, calculateAge } = useContext(AppContext);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [userData, setUserData] = useState({
    name: profileData.name ? profileData.name : "",
    age: profileData.dob ? calculateAge(profileData.dob) : 0,
    gender: profileData.gender ? profileData.gender : "",
    medicalHistory: "",
    symptoms: "",
  });
  const [currentStep, setCurrentStep] = useState(
    profileData ? "loggedUser" : "greeting"
  );
  const chatContainerRef = useRef(null);
  const [showRecommendDoctorsButton, setShowRecommendDoctorsButton] =
    useState(false);
  const messageIdCounter = useRef(0);
  const navigate = useNavigate();
  const availableSpecialities = [
    "General Physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  const addMessage = (text, sender, isLoading) => {
    isLoading = isLoading || false;
    setMessages((prev) => [
      ...prev,
      {
        id: (messageIdCounter.current++).toString(),
        text,
        sender,
        isLoading,
        timestamp: new Date(),
      },
    ]);
  };

  useEffect(() => {
    if (currentStep === "greeting")
      addMessage("Hello! I'm your medical assistant. What's your name?", "bot");
  }, []);

  useEffect(() => {
    if (currentStep === "loggedUser") {
      addMessage(
        `Hello ${userData.name}! I'm your medical assistant. How can I help you?`,
        "bot"
      );
      setCurrentStep("history");
    }
  }, []);

  useEffect(() => {
    if (chatContainerRef.current)
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
  }, [messages, currentStep]);

  const nameRegex = /(?:my name is|i am|name is)\s+([a-zA-Z\s]+)|([a-zA-Z]+)/i;
  const ageRegex = /(?:my age is|i am)\s+(\d+)|\b(\d+)\b/i;
  const medicalHistoryRegex =
    /(?:my medical history is|history is)\s+([a-zA-Z\s,]+)|([a-zA-Z\s,]+)/i;
  const symptomRegex =
    /(?:i have symptoms like|symptoms like)\s+([a-zA-Z\s,]+)|([a-zA-Z\s,]+)/i;
  const genderRegex = /(?:my gender is|gender is)\s+([a-zA-Z\s]+)|([a-zA-Z]+)/i;

  const handleGreeting = (userMessage) => {
    const name = extractInfo(userMessage, nameRegex);
    if (name) {
      setUserData((prev) => ({ ...prev, name }));
      setCurrentStep("age");
      addMessage(`Nice to meet you, ${name}! What's your age?`, "bot");
    } else
      addMessage(
        "I couldn't understand your name. Please enter it again.",
        "bot"
      );
  };

  const handleAge = (userMessage) => {
    const age = parseInt(extractInfo(userMessage, ageRegex));
    if (age !== null && !isNaN(age) && age >= 0 && age <= 120) {
      setUserData((prev) => ({ ...prev, age: parseInt(age) }));
      setCurrentStep("gender");
      addMessage("What's your gender?", "bot");
    } else addMessage("Please enter a valid age between 0 and 120.", "bot");
  };

  const handleGender = (userMessage) => {
    const gender = extractInfo(userMessage, genderRegex);
    if (gender) {
      setUserData((prev) => ({ ...prev, gender: gender }));
      setCurrentStep("history");
      addMessage(
        'Do you have any medical history you\'d like to share? If not, just type "none".',
        "bot"
      );
    } else {
      setUserData((prev) => ({ ...prev, gender: userMessage }));
      setCurrentStep("history");
      addMessage(
        'Do you have any medical history you\'d like to share? If not, just type "none".',
        "bot"
      );
    }
  };

  const handleHistory = (userMessage) => {
    const history = extractInfo(userMessage, medicalHistoryRegex);
    if (history) {
      setUserData((prev) => ({ ...prev, medicalHistory: history }));
      setCurrentStep("symptoms");
      addMessage("What symptoms are you experiencing?", "bot");
    } else {
      setUserData((prev) => ({ ...prev, medicalHistory: userMessage }));
      setCurrentStep("symptoms");
      addMessage("What symptoms are you experiencing?", "bot");
    }
  };

  const handleSymptoms = (userMessage) => {
    const symptoms = extractInfo(userMessage, symptomRegex);
    if (symptoms) {
      setUserData((prev) => ({ ...prev, symptoms: symptoms }));
      setCurrentStep("chat");
      addMessage(
        "Thank you for sharing. Now you can ask about doctors or any medical concerns.",
        "bot"
      );
    } else {
      setUserData((prev) => ({ ...prev, symptoms: userMessage }));
      setCurrentStep("chat");
      addMessage(
        "Thank you for sharing. Now you can ask about doctors or any medical concerns.",
        "bot"
      );
    }
  };

  const handleChatWrapper = async (userMessage) => {
    addMessage("", "bot", true);

    try {
      const aiResponse = await handleChat(userMessage, userData);
      removeLoadingMessage();
      setShowRecommendDoctorsButton(true);
      addMessage(aiResponse, "bot");
    } catch (error) {
      console.error("Error in handleChatWrapper:", error);
      removeLoadingMessage();
      addMessage("Sorry, there was an error processing your request.", "bot");
    }
  };

  const removeLoadingMessage = () => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => !message.isLoading)
    );
  };

  const handleShowRecommendedDoctors = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/doctor/recommend-doctors`,
        { symptoms: userData.symptoms }
      );

      if (availableSpecialities.includes(data.predictedSpeciality)) {
        navigate(
          `/doctors/${
            data.predictedSpeciality == "General Physician"
              ? "General physician"
              : data.predictedSpeciality
          }`
        );
        setShowRecommendDoctorsButton(false);
        handleClose();
      } else {
        addMessage("Sorry! But we have no Doctors at Present.", "bot");
      }
    } catch (error) {
      console.log("Error fetching doctors:", error);
      addMessage(
        "Sorry, there was an error fetching doctor information.",
        "bot"
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = input.trim();
    addMessage(userMessage, "user");
    setInput("");

    switch (currentStep) {
      case "greeting":
        handleGreeting(userMessage);
        break;
      case "age":
        handleAge(userMessage);
        break;
      case "gender":
        handleGender(userMessage);
        break;
      case "history":
        handleHistory(userMessage);
        break;
      case "symptoms":
        handleSymptoms(userMessage);
        break;
      case "chat":
        handleChatWrapper(userMessage);
        break;
      default:
        break;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 100 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-4 right-4 w-[calc(100vw-2rem)] sm:w-[400px] md:w-[450px] max-h-[80vh] z-50"
      >
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-neutral-200 relative">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
                x: [0, 30, 0]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-10 right-10 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-2xl"
            />
            <motion.div
              animate={{ 
                scale: [1.1, 1, 1.1],
                rotate: [360, 180, 0],
                y: [0, -20, 0]
              }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-10 left-10 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r from-accent/5 to-primary/5 rounded-full blur-xl"
            />
          </div>

          {/* Enhanced Header */}
          <div className="relative bg-gradient-to-r from-primary via-secondary to-accent p-4 sm:p-6 overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 opacity-20">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-2 left-4 w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-full"
              />
              <motion.div
                animate={{ 
                  scale: [1.2, 1, 1.2],
                  rotate: [360, 180, 0]
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute bottom-2 right-6 w-8 h-8 sm:w-12 sm:h-12 bg-white rounded-full"
              />
            </div>

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="w-8 h-8 sm:w-12 sm:h-12 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center backdrop-blur-sm"
                >
                  <Stethoscope className="w-4 h-4 sm:w-7 sm:h-7 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-white text-sm sm:text-xl font-bold flex items-center gap-1 sm:gap-2">
                    Medical Assistant
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Sparkles className="w-3 h-3 sm:w-5 sm:h-5" />
                    </motion.div>
                  </h1>
                  <p className="text-white/80 text-xs sm:text-sm">AI-Powered Healthcare Support</p>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleClose}
                className="w-8 h-8 sm:w-10 sm:h-10 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center hover:bg-white/30 transition-colors backdrop-blur-sm"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </motion.button>
            </div>
          </div>

          {/* Chat Interface with Enhanced Styling */}
          <div className="relative">
            <ChatInterface
              messages={messages}
              input={input}
              setInput={setInput}
              handleSubmit={handleSubmit}
              chatContainerRef={chatContainerRef}
              showRecommendDoctorsButton={showRecommendDoctorsButton}
              handleShowRecommendedDoctors={handleShowRecommendedDoctors}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default Chat;