import { useContext } from "react";
import { useNavigate } from "react-router-dom";

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
    return <div className="loading">Waiting for participants to join...</div>;
  }

  return (
    <StreamTheme>
      <section className="relative min-h-[70vh] max-h-screen w-full sm:w-[80vw] mx-auto rounded-2xl overflow-hidden pt-4 text-white bg-black flex flex-col items-center px-4">
        <div className="relative flex-grow flex items-center justify-center w-full">
          <div className="flex flex-col items-center w-full md:flex-row md:justify-evenly">
            {participants.map((participant) => (
              <div key={participant.sessionId} className="w-full max-w-md my-3">
                <ParticipantView participant={participant} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex w-[90vw] items-center justify-center py-4 bg-gray-800 sticky bottom-0">
          <CallControls
            onLeave={() => navigate(`/my-appointments/${appointmentId}`)}
          />
        </div>
      </section>
    </StreamTheme>
  );
};

const MeetingRoom = () => {
  const { meetingData } = useContext(AppContext);
  return (
    <StreamVideo client={meetingData.client}>
      <StreamCall call={meetingData.call}>
        <MeetingRoomUI appointmentId={meetingData.appointmentId} />
      </StreamCall>
    </StreamVideo>
  );
};

export default MeetingRoom;
