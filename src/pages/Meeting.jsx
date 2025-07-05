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
      <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-blue-900 to-purple-900 flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
              x: [0, 50, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1.1, 1, 1.1],
              rotate: [360, 180, 0],
              y: [0, -30, 0]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl"
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
            className="w-20 h-20 mx-auto mb-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
          >
            <Video className="w-10 h-10 text-white" />
          </motion.div>
          
          <motion.h2
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-3xl font-bold text-white mb-4"
          >
            Connecting to Meeting...
          </motion.h2>
          
          <p className="text-blue-200 text-lg mb-8">
            Please wait while we connect you to the consultation
          </p>

          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex items-center justify-center gap-2 text-blue-300"
          >
            <Wifi className="w-5 h-5" />
            <span>Establishing secure connection...</span>
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
          className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
            y: [0, -40, 0]
          }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"
        />
      </div>

      <StreamTheme>
        <div className="relative min-h-screen flex flex-col">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-black/30 backdrop-blur-md border-b border-white/10 p-6 z-10"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center"
                >
                  <Video className="w-6 h-6 text-white" />
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold text-white">Medical Consultation</h1>
                  <p className="text-blue-200">Secure Video Call</p>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <motion.div
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="flex items-center gap-2 bg-green-500/20 px-4 py-2 rounded-xl border border-green-500/30"
                >
                  <Signal className="w-4 h-4 text-green-400" />
                  <span className="text-green-300 font-medium">Connected</span>
                </motion.div>

                <div className="flex items-center gap-2 text-blue-200">
                  <Users className="w-5 h-5" />
                  <span>{participants.length} participant{participants.length !== 1 ? 's' : ''}</span>
                </div>

                <div className="flex items-center gap-2 text-blue-200">
                  <Clock className="w-5 h-5" />
                  <span>00:00</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Main Video Area */}
          <div className="flex-1 flex items-center justify-center p-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full max-w-6xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {participants.map((participant, index) => (
                  <motion.div
                    key={participant.sessionId}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    className="relative group"
                  >
                    <div className="bg-black/20 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                      <ParticipantView 
                        participant={participant}
                        className="w-full h-80 md:h-96 object-cover"
                      />
                      
                      {/* Participant Info Overlay */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-md rounded-2xl p-4 border border-white/20"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                              <span className="text-white font-bold text-sm">
                                {participant.name?.charAt(0) || 'U'}
                              </span>
                            </div>
                            <div>
                              <p className="text-white font-semibold">
                                {participant.name || 'Participant'}
                              </p>
                              <p className="text-blue-200 text-sm">
                                {participant.isLocalParticipant ? 'You' : 'Remote'}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="w-3 h-3 bg-green-500 rounded-full"
                            />
                            <span className="text-green-300 text-sm font-medium">Active</span>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Enhanced Controls */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-black/30 backdrop-blur-md border-t border-white/10 p-6 z-10"
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center">
                <div className="bg-black/40 backdrop-blur-md rounded-3xl p-4 border border-white/20">
                  <CallControls
                    onLeave={() => navigate(`/my-appointments/${appointmentId}`)}
                  />
                </div>
              </div>

              {/* Additional Quick Actions */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center justify-center gap-4 mt-6"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl border border-white/20 transition-all duration-300"
                >
                  <Monitor className="w-4 h-4" />
                  <span className="hidden sm:inline">Share Screen</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl border border-white/20 transition-all duration-300"
                >
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Settings</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(239, 68, 68, 0.2)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(`/my-appointments/${appointmentId}`)}
                  className="flex items-center gap-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 px-6 py-2 rounded-xl border border-red-500/30 transition-all duration-300 font-semibold"
                >
                  <PhoneOff className="w-4 h-4" />
                  End Call
                </motion.button>
              </motion.div>
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
      <div className="min-h-screen bg-gradient-to-br from-neutral-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-white"
        >
          <h2 className="text-2xl font-bold mb-4">Meeting not found</h2>
          <p className="text-blue-200">Please check your appointment details</p>
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