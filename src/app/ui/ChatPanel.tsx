import React, { useState } from "react";

export const ChatPanel = ({ chat, messages, onSendMessage, loading }: any) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col flex-1 min-w-[500px] bg-gradient-to-br from-blue-100 to-green-50 rounded-2xl shadow-lg overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center gap-x-4 px-6 py-4 border-b border-blue-200 bg-white/80">
        <div className="w-12 h-12 rounded-full bg-gray-300" />
        <div className="flex-1">
          <div className="font-bold text-lg">{chat?.title || "Chat Title"}</div>
          <div className="text-xs text-gray-500">{chat?.members?.join(", ") || "Members"}</div>
        </div>
        <div className="flex gap-x-2">
          <button title="Mute" className="text-gray-400">🔕</button>
          <button title="Pin" className="text-gray-400">📌</button>
        </div>
      </div>
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 flex flex-col gap-y-4 bg-gradient-to-br from-white to-blue-50">
        {messages?.map((msg: any, idx: number) => (
          <div key={idx} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
            <div className={`flex items-end gap-x-2 ${msg.sender === "me" ? "flex-row-reverse" : ""}`}>
              {msg.sender !== "me" && <div className="w-8 h-8 rounded-full bg-gray-300" />}
              <div className={`rounded-2xl px-4 py-2 shadow text-sm ${msg.sender === "me" ? "bg-green-200 text-right" : "bg-white"}`}>
                {msg.sender !== "me" && <div className="font-bold text-xs text-blue-700 mb-1">{msg.name}</div>}
                <div>{msg.text}</div>
                <div className="text-[10px] text-gray-400 mt-1 text-right">{msg.time}</div>
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="flex items-end gap-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />
              <div className="rounded-2xl px-4 py-2 shadow text-sm bg-white animate-pulse text-gray-400">GPT is typing...</div>
            </div>
          </div>
        )}
      </div>
      {/* Input Row */}
      <div className="flex items-center gap-x-2 px-6 py-3 border-t border-blue-200 bg-white/80">
        <button className="text-gray-400 text-xl">📎</button>
        <input
          className="flex-1 rounded-lg border px-4 py-2"
          placeholder="Message"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button
          className="bg-blue-500 text-white rounded-lg px-4 py-2 font-semibold"
          onClick={handleSend}
          disabled={loading || !input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
}; 