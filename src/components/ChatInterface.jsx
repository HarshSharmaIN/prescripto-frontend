import { Send, Stethoscope, UsersRound } from "lucide-react";
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
    <div className="bg-white shadow-xl overflow-hidden border border-blue-100">
      <div
        ref={chatContainerRef}
        className="h-[400px] sm:h-[500px] overflow-y-auto p-6 space-y-4"
      >
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
      </div>
      <form onSubmit={handleSubmit} className="border-t p-4 bg-gray-50">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <div className="flex gap-2">
            <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl px-6 py-3 hover:opacity-90 transition-opacity duration-200 flex justify-center items-center gap-2 w-full sm:w-auto"
          >
            <Send className="w-5 h-5" />
            <span className="hidden sm:inline">Send</span>
          </button>
          {showRecommendDoctorsButton && (
            <button
              onClick={handleShowRecommendedDoctors}
              className="w-full flex justify-center items-center sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90 transition-opacity duration-200 font-bold py-2 px-4 rounded-xl"
            >
              <UsersRound />
            </button>
          )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default ChatInterface;
