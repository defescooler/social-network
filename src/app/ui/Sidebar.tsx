import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LS_PROFILE_KEY = "my-social-network-profile";

export const Sidebar = ({ chats = [], selectedChatId, onSelectChat, tab, setTab, onNewChat }: any) => {
  const navigate = useNavigate();
  // Profile info from localStorage
  const [profile, setProfile] = useState({
    name: "Your Name",
    surname: "",
    status: "Add a personal note...",
    photo: "",
  });
  const [editingName, setEditingName] = useState(false);
  const [editingNote, setEditingNote] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(LS_PROFILE_KEY);
    if (saved) setProfile(JSON.parse(saved));
    // Listen for changes in localStorage (e.g., from ProfilePage)
    const onStorage = () => {
      const updated = localStorage.getItem(LS_PROFILE_KEY);
      if (updated) setProfile(JSON.parse(updated));
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Unread counts (for demo, all chats are read)
  const unreadAI = chats.filter((c: any) => c.type === "ai").length;
  const unreadPeople = chats.filter((c: any) => c.type === "people").length;

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") setEditingName(false);
  };
  const handleNoteKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") setEditingNote(false);
  };

  // Placeholder: simulate unread count for each chat
  const getUnreadCount = (chatId: string) => {
    if (chatId === selectedChatId) return 0;
    return Math.floor(Math.random() * 5); // random 0-4 for demo
  };

  return (
    <aside className="min-w-[340px] h-screen bg-blue-50 p-6 flex flex-col gap-y-6 rounded-tr-2xl rounded-br-2xl shadow-lg">
      {/* Profile Section */}
      <section className="flex gap-x-4 items-center mb-2">
        <img
          src={profile.photo || "/icon.png"}
          alt="Profile"
          className="w-16 h-16 rounded-full mb-2 border-2 border-blue-200 object-cover bg-gray-300"
        />
        <div className="flex-1 flex flex-col gap-y-1">
          <span className="font-bold text-lg">{profile.name} {profile.surname}</span>
          <span className="text-xs text-gray-500">{profile.status || "Add a personal note..."}</span>
        </div>
      </section>
      {/* Divider */}
      <hr className="border-blue-200 my-2" />
      {/* Profile Button */}
      <button
        className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg py-2 font-semibold shadow-lg flex items-center justify-center gap-x-2"
        onClick={() => navigate("/profile-page")}
      >
        <span>👤</span> Profile
      </button>
      {/* Search Chats */}
      <div className="relative">
        <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        <input
          className="rounded-lg border pl-9 pr-3 py-2 w-full"
          placeholder="Search chats or users... (Cmd+K)"
        />
      </div>
      {/* Chat List */}
      <div className="flex flex-col gap-y-1 mt-2">
        {chats.map((chat: any) => {
          const unread = getUnreadCount(chat.id);
          return (
            <div
              key={chat.id}
              className={`flex items-center gap-x-3 px-3 py-2 rounded-lg cursor-pointer shadow transition ${selectedChatId === chat.id ? "bg-blue-200" : "bg-white hover:bg-blue-100"}`}
              onClick={() => onSelectChat(chat.id)}
            >
              <div className="relative w-10 h-10 rounded-full bg-gray-300">
                {unread > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                    {unread}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <div className="font-semibold">{chat.title}</div>
                <div className="text-xs text-gray-500">{chat.members?.join(", ")}</div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Create New Chat Section */}
      <div className="relative mt-4">
        <button
          className="w-full bg-gradient-to-r from-blue-400 to-blue-600 text-white rounded-lg py-2 font-semibold shadow-lg flex items-center justify-center gap-x-2"
          onClick={() => setShowDropdown((v: boolean) => !v)}
        >
          <span>＋</span> New Chat
        </button>
        {showDropdown && (
          <div className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-10">
            <button className="w-full px-4 py-2 hover:bg-blue-100 text-left" onClick={() => { setShowDropdown(false); onNewChat("ai"); }}>
              With AI
            </button>
            <button className="w-full px-4 py-2 hover:bg-blue-100 text-left" onClick={() => { setShowDropdown(false); onNewChat("people"); }}>
              With Person
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}; 