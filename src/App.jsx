import React, { useState } from 'react';
import './App.css';
import ChatSidebar from './components/ChatSidebar';
import ChatArea from './components/ChatArea';
import NewChatModal from './components/NewChatModal';
import ProfileSettings from './components/ProfileSettings';
import { useChatState, useAIChat, useLocalStorage } from './hooks';
import { mockChats, mockMessages, mockUser } from './data/mockData';

function App() {
  // Local storage persistence
  const [storedChats, setStoredChats] = useLocalStorage('telegram-clone-chats', mockChats);
  const [storedMessages, setStoredMessages] = useLocalStorage('telegram-clone-messages', mockMessages);
  const [user, setUser] = useLocalStorage('telegram-clone-user', mockUser);

  // Chat state management
  const {
    chats,
    messages,
    activeChat,
    isLoading,
    isTyping,
    searchQuery,
    filter,
    setActiveChat,
    setIsLoading,
    setIsTyping,
    setSearchQuery,
    setFilter,
    addMessage,
    markAsRead,
    createNewChat
  } = useChatState(storedChats, storedMessages);

  // AI chat functionality
  const { generateAIResponse, isGenerating } = useAIChat();

  // UI state
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  const [isProfileSettingsOpen, setIsProfileSettingsOpen] = useState(false);

  // Sync with local storage
  React.useEffect(() => {
    setStoredChats(chats);
  }, [chats, setStoredChats]);

  React.useEffect(() => {
    setStoredMessages(messages);
  }, [messages, setStoredMessages]);

  // Handle chat selection
  const handleChatSelect = (chat) => {
    setActiveChat(chat);
    markAsRead(chat.id);
  };

  // Handle sending messages
  const handleSendMessage = async (content) => {
    if (!activeChat) return;

    // Create user message
    const userMessage = {
      id: `msg-${Date.now()}`,
      chatId: activeChat.id,
      senderId: user.id,
      senderName: user.name,
      content,
      timestamp: new Date().toISOString(),
      type: 'text',
      status: 'sending'
    };

    // Add user message
    addMessage(activeChat.id, userMessage);

    // Update message status after a delay
    setTimeout(() => {
      const updatedMessage = { ...userMessage, status: 'sent' };
      addMessage(activeChat.id, updatedMessage);
    }, 500);

    // Generate AI response if it's an AI chat
    if (activeChat.type === 'ai') {
      setIsTyping(true);
      
      try {
        const responseText = await generateAIResponse(content);
        
        // Create AI message
        const aiMessage = {
          id: `msg-${Date.now() + 1}`,
          chatId: activeChat.id,
          senderId: activeChat.participants.find(id => id !== user.id),
          senderName: activeChat.name,
          content: responseText,
          timestamp: new Date().toISOString(),
          type: 'text',
          status: 'read'
        };
        
        // Add AI message
        addMessage(activeChat.id, aiMessage);
      } catch (error) {
        console.error('Error generating AI response:', error);
      } finally {
        setIsTyping(false);
      }
    } else {
      // Simulate received message for demo purposes
      setTimeout(() => {
        const updatedMessage = { ...userMessage, status: 'delivered' };
        addMessage(activeChat.id, updatedMessage);
      }, 1500);
    }
  };

  // Handle creating a new chat
  const handleCreateChat = (type, participant) => {
    const newChat = createNewChat(type, participant);
    setActiveChat(newChat);
  };

  // Handle profile save
  const handleProfileSave = (profileData) => {
    setUser(prev => ({ ...prev, ...profileData }));
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <ChatSidebar
          chats={chats}
          activeChat={activeChat}
          onChatSelect={handleChatSelect}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          filter={filter}
          onFilterChange={setFilter}
          onNewChat={() => setIsNewChatModalOpen(true)}
          onProfileClick={() => setIsProfileSettingsOpen(true)}
        />
        
        <ChatArea
          chat={activeChat}
          messages={activeChat ? messages[activeChat.id] || [] : []}
          onSendMessage={handleSendMessage}
          isLoading={isLoading || isGenerating}
          isTyping={isTyping}
        />
      </div>

      {/* Modals */}
      <NewChatModal
        isOpen={isNewChatModalOpen}
        onClose={() => setIsNewChatModalOpen(false)}
        onCreateChat={handleCreateChat}
      />

      {isProfileSettingsOpen && (
        <ProfileSettings
          user={user}
          onSave={handleProfileSave}
          onClose={() => setIsProfileSettingsOpen(false)}
        />
      )}
    </div>
  );
}

export default App;

