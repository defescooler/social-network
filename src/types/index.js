// Types for the AI Chat Frontend application

export interface User {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away';
  lastSeen?: string;
}

export interface AIBot {
  id: string;
  name: string;
  description: string;
  avatar?: string;
  model: string;
  capabilities: string[];
}

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  type: 'text' | 'image' | 'file';
  status: 'sending' | 'sent' | 'delivered' | 'read';
  replyTo?: string;
}

export interface Chat {
  id: string;
  type: 'user' | 'ai';
  name: string;
  avatar?: string;
  participants: string[];
  lastMessage?: Message;
  unreadCount: number;
  isPinned: boolean;
  isMuted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ChatState {
  chats: Chat[];
  activeChat: Chat | null;
  messages: Record<string, Message[]>;
  isLoading: boolean;
  isTyping: boolean;
  searchQuery: string;
  filter: 'all' | 'users' | 'ai';
}

export interface AppState {
  user: User;
  chatState: ChatState;
  theme: 'light' | 'dark';
  sidebarCollapsed: boolean;
}

