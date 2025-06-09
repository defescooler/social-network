import { useState, useCallback } from 'react';

// Custom hook for managing chat state
export const useChatState = (initialChats = [], initialMessages = {}) => {
  const [chats, setChats] = useState(initialChats);
  const [messages, setMessages] = useState(initialMessages);
  const [activeChat, setActiveChat] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');

  const addMessage = useCallback((chatId, message) => {
    setMessages(prev => ({
      ...prev,
      [chatId]: [...(prev[chatId] || []), message]
    }));

    // Update last message in chat
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { ...chat, lastMessage: message, updatedAt: message.timestamp }
        : chat
    ));
  }, []);

  const markAsRead = useCallback((chatId) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { ...chat, unreadCount: 0 }
        : chat
    ));
  }, []);

  const createNewChat = useCallback((type, participant) => {
    const newChat = {
      id: `chat-${Date.now()}`,
      type,
      name: participant.name,
      avatar: participant.avatar,
      participants: ['user-1', participant.id],
      unreadCount: 0,
      isPinned: false,
      isMuted: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setChats(prev => [newChat, ...prev]);
    setMessages(prev => ({ ...prev, [newChat.id]: [] }));
    return newChat;
  }, []);

  const filteredChats = chats.filter(chat => {
    const matchesFilter = filter === 'all' || 
      (filter === 'users' && chat.type === 'user') ||
      (filter === 'ai' && chat.type === 'ai');
    
    const matchesSearch = chat.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  return {
    chats: filteredChats,
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
  };
};

// Custom hook for AI chat functionality
export const useAIChat = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateAIResponse = useCallback(async (message, botModel = 'gpt-3.5-turbo') => {
    setIsGenerating(true);
    try {
      // Real OpenAI API call
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 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',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: botModel,
          messages: [{ role: 'user', content: message }]
        })
      });
      if (!response.ok) {
        throw new Error('OpenAI API error: ' + response.statusText);
      }
      const data = await response.json();
      const aiMessage = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";
      return aiMessage;
    } catch (error) {
      console.error('Error generating AI response:', error);
      return "I'm sorry, I'm having trouble processing your request right now. Please try again.";
    } finally {
      setIsGenerating(false);
    }
  }, []);

  return {
    generateAIResponse,
    isGenerating
  };
};

// Custom hook for local storage persistence
export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
};

