import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  MicOff, 
  Video, 
  VideoOff, 
  Monitor, 
  Settings,
  Users,
  Clock,
  Wifi,
  Signal
} from "lucide-react";

import {
  CallControls,
  CallingState,
  ParticipantView,
  StreamCall,
  StreamTheme,
  StreamVideo,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import { AppContext } from "../context/AppContext";

export const MeetingRoomUI = ({ appointmentId }) => {
  const navigate = useNavigate();
  const { useCallCallingState, useParticipants } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participants = useParticipants();

  if (callingState !== CallingState.JOINED) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-blue-900 to-purple-900 flex items-center justify-center relative overflow-hidden p-4">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              x: [0, 50, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-10 w-48 h-48 sm:w-64 sm:h-64 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1.1, 1, 1.1],
              rotate: [360, 180, 0],
              y: [0, -30, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 right-10 w-56 h-56 sm:w-80 sm:h-80 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl"
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center z-10"
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 sm:mb-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
          >
            <Video className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </motion.div>
          
          <motion.h2
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4"
          >
            Connecting to Meeting...
          </motion.h2>
          
          <p className="text-blue-200 text-base sm:text-lg mb-6 sm:mb-8 px-4">
            Please wait while we connect you to the consultation
          </p>

          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex items-center justify-center gap-2 text-blue-300"
          >
            <Wifi className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-sm sm:text-base">Establishing secure connection...</span>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-blue-900 to-purple-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            x: [0, 40, 0]
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            y: [0, -40, 0]
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"
        />
      </div>

      <StreamTheme>
        <div className="relative min-h-screen flex flex-col">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-black/30 backdrop-blur-md border-b border-white/10 p-2 sm:p-4 lg:p-6 z-10"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-6 h-6 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg sm:rounded-2xl flex items-center justify-center"
                >
                  <Video className="w-3 h-3 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-sm sm:text-xl lg:text-2xl font-bold text-white">Medical Consultation</h1>
                  <p className="text-blue-200 text-xs sm:text-sm lg:text-base">Secure Video Call</p>
                </div>
              </div>

              <div className="flex items-center gap-1 sm:gap-4 lg:gap-6">
                <motion.div
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center gap-1 sm:gap-2 bg-green-500/20 px-1 sm:px-3 lg:px-4 py-1 sm:py-2 rounded-md sm:rounded-xl border border-green-500/30"
                >
                  <Signal className="w-2 h-2 sm:w-4 sm:h-4 text-green-400" />
                  <span className="text-green-300 font-medium text-xs sm:text-sm">Connected</span>
                </motion.div>

                <div className="hidden sm:flex items-center gap-1 sm:gap-2 text-blue-200">
                  <Users className="w-3 h-3 sm:w-5 sm:h-5" />
                  <span className="text-xs sm:text-sm">{participants.length}</span>
                </div>

                <div className="hidden lg:flex items-center gap-2 text-blue-200">
                  <Clock className="w-5 h-5" />
                  <span>00:00</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Video Area - Responsive Layout */}
          <div className="flex-1 flex items-center justify-center p-2 sm:p-4 lg:p-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full max-w-6xl"
            >
              {/* Mobile: Single column, Desktop: Grid layout */}
              <div className={`${
                participants.length === 1 
                  ? "flex justify-center" 
                  : participants.length === 2 
                  ? "grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4 lg:gap-6"
                  : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 lg:gap-6"
              }`}>
                {participants.map((participant, index) => (
                  <motion.div
                    key={participant.sessionId}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="relative group w-full"
                  >
                    <div className="bg-black/20 backdrop-blur-md rounded-lg sm:rounded-2xl lg:rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                      <div className="relative">
                        <ParticipantView 
                          participant={participant}
                          className={`w-full object-cover ${
                            participants.length === 1 
                              ? "h-48 sm:h-64 md:h-80 lg:h-96" 
                              : "h-32 sm:h-48 md:h-64 lg:h-80"
                          }`}
                        />
                        
                        {/* Participant Info Overlay - Responsive */}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute bottom-1 sm:bottom-2 lg:bottom-4 left-1 sm:left-2 lg:left-4 right-1 sm:right-2 lg:right-4 bg-black/50 backdrop-blur-md rounded-md sm:rounded-xl lg:rounded-2xl p-1 sm:p-2 lg:p-4 border border-white/20"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1 sm:gap-2 lg:gap-3">
                              <div className="w-4 h-4 sm:w-6 sm:h-6 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md sm:rounded-xl lg:rounded-2xl flex items-center justify-center">
                                <span className="text-white font-bold text-xs sm:text-sm lg:text-base">
                                  {participant.name?.charAt(0) || 'U'}
                                </span>
                              </div>
                              <div className="min-w-0">
                                <p className="text-white font-semibold text-xs sm:text-sm lg:text-base truncate">
                                  {participant.name || 'Participant'}
                                </p>
                                <p className="text-blue-200 text-xs sm:text-sm">
                                  {participant.isLocalParticipant ? 'You' : 'Remote'}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-1">
                              <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="w-1 h-1 sm:w-2 sm:h-2 lg:w-3 lg:h-3 bg-green-500 rounded-full"
                              />
                              <span className="text-green-300 text-xs font-medium hidden sm:inline">Active</span>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Enhanced Controls - Mobile Responsive */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-black/30 backdrop-blur-md border-t border-white/10 p-2 sm:p-4 lg:p-6 z-10"
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center">
                <div className="bg-black/40 backdrop-blur-md rounded-lg sm:rounded-2xl lg:rounded-3xl p-1 sm:p-2 lg:p-4 border border-white/20">
                  <div className="str-video__call-controls-wrapper">
                    <CallControls
                      onLeave={() => navigate(`/my-appointments/${appointmentId}`)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </StreamTheme>
    </div>
  );
};

const MeetingRoom = () => {
  const { meetingData } = useContext(AppContext);
  
  if (!meetingData?.client || !meetingData?.call) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-blue-900 to-purple-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-white"
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Meeting not found</h2>
          <p className="text-blue-200 text-sm sm:text-base">Please check your appointment details</p>
        </motion.div>
      </div>
    );
  }

  return (
    <StreamVideo client={meetingData.client}>
      <StreamCall call={meetingData.call}>
        <MeetingRoomUI appointmentId={meetingData.appointmentId} />
      </StreamCall>
    </StreamVideo>
  );
};

export default MeetingRoom;