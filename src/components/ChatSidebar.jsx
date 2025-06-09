import React from 'react';
import { Search, Plus, Settings, User, MessageCircle, Bot } from 'lucide-react';
import { Button } from '../components/ui/button';

const ChatSidebar = ({ 
  chats, 
  activeChat, 
  onChatSelect, 
  searchQuery, 
  onSearchChange, 
  filter, 
  onFilterChange,
  onNewChat,
  onProfileClick 
}) => {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 168) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold text-gray-900">AI Chat</h1>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={onProfileClick}>
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={onProfileClick}>
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search chats..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex mt-3 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => onFilterChange('all')}
            className={`flex-1 py-1 px-3 rounded-md text-sm font-medium transition-colors ${
              filter === 'all' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            All
          </button>
          <button
            onClick={() => onFilterChange('users')}
            className={`flex-1 py-1 px-3 rounded-md text-sm font-medium transition-colors ${
              filter === 'users' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            People
          </button>
          <button
            onClick={() => onFilterChange('ai')}
            className={`flex-1 py-1 px-3 rounded-md text-sm font-medium transition-colors ${
              filter === 'ai' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            AI Bots
          </button>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <div
            key={chat.id}
            onClick={() => onChatSelect(chat)}
            className={`p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
              activeChat?.id === chat.id ? 'bg-blue-50 border-r-2 border-r-blue-500' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                  {chat.type === 'ai' ? (
                    <Bot className="h-6 w-6" />
                  ) : (
                    chat.name.charAt(0).toUpperCase()
                  )}
                </div>
                {chat.type === 'user' && (
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor('online')} rounded-full border-2 border-white`} />
                )}
                {chat.unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                    {chat.unreadCount > 99 ? '99+' : chat.unreadCount}
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900 truncate">{chat.name}</h3>
                  {chat.lastMessage && (
                    <span className="text-xs text-gray-500 ml-2">
                      {formatTime(chat.lastMessage.timestamp)}
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 truncate">
                    {chat.lastMessage?.content || 'No messages yet'}
                  </p>
                  <div className="flex items-center gap-1 ml-2">
                    {chat.isPinned && <span className="text-gray-400">📌</span>}
                    {chat.isMuted && <span className="text-gray-400">🔕</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {chats.length === 0 && (
          <div className="p-8 text-center text-gray-500">
            <MessageCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>No chats found</p>
            <p className="text-sm mt-1">Try adjusting your search or create a new chat</p>
          </div>
        )}
      </div>

      {/* New Chat Button */}
      <div className="p-4 border-t border-gray-200">
        <Button
          onClick={onNewChat}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </div>
    </div>
  );
};

export default ChatSidebar;

