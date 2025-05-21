import { useState, useRef, useEffect, useContext } from "react";
import ChatInterface from "../components/ChatInterface";
import { extractInfo } from "../utils/helpers";
import handleChat from "../utils/handleChat";
import { Stethoscope } from "lucide-react";
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
        `Hello ${userData.name}! I'm your medical assistant. How can i help you?`,
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
    <div className="fixed bottom-8 max-sm:bottom-17 right-0 w-full sm:w-[40vw] max-h-[90vh] p-4 sm:p-6">
      <div className="flex flex-col rounded-2xl shadow-xl overflow-hidden border border-blue-100">
        <div className="flex justify-between items-center bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
          <div className="flex items-center gap-3">
            <Stethoscope className="w-8 h-8 text-white" />
            <h1 className="text-white text-2xl font-semibold">
              Medical Assistant
            </h1>
          </div>
          <button
            onClick={handleClose}
            className="text-white hover:text-gray-200 text-3xl"
          >
            &times;
          </button>
        </div>

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
  );
}

export default Chat;
