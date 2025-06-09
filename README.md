# AI Chat Frontend - Complete Telegram Clone

A modern, responsive Telegram-like chat application built with React, TypeScript, and Tailwind CSS featuring AI integration.

## 🚀 Features

### ✅ Core Features (Implemented)
- **Real-time Messaging**: Send and receive messages with typing indicators
- **AI Integration**: Chat with AI assistants powered by mock responses (ready for OpenAI integration)
- **Modern UI**: Telegram-like interface with smooth animations
- **Profile Management**: Complete user profile and settings system
- **Search & Filter**: Find chats and messages easily
- **Responsive Design**: Works on desktop and mobile devices
- **Data Persistence**: Messages and chats saved to localStorage

### 🎯 Advanced Features
- **Multiple Chat Types**: Support for both user-to-user and AI chats
- **Message Status**: Sending, sent, delivered, read indicators
- **Unread Counters**: Visual indicators for unread messages
- **Emoji Picker**: Built-in emoji support for messages
- **Settings Panel**: Comprehensive settings with themes, notifications, privacy
- **New Chat Modal**: Easy creation of new chats with users or AI bots

## 🛠️ Tech Stack

- **Frontend**: React 19, JavaScript (JSX), Tailwind CSS
- **UI Components**: shadcn/ui components with Radix UI primitives
- **Icons**: Lucide React icons
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **State Management**: React hooks with localStorage persistence

## 📦 Installation & Setup

1. **Extract the zip file**
   ```bash
   unzip ai-chat-frontend.zip
   cd ai-chat-frontend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Start development server**
   ```bash
   pnpm run dev
   # or
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🎨 Design Features

### Telegram-Inspired UI
- **Clean sidebar** with chat list and search
- **Message bubbles** with proper alignment and styling
- **Status indicators** for online/offline users
- **Unread badges** with count display
- **Smooth animations** for better UX

### Color Scheme
- **Primary**: Blue (#3b82f6) for actions and highlights
- **Background**: Clean whites and light grays
- **Messages**: Blue for sent, white for received
- **Status**: Green for online, yellow for away, gray for offline

## 📱 Usage Guide

### Starting a Chat
1. Click "New Chat" button in sidebar
2. Choose between "AI Assistants" or "People"
3. Select from available contacts or AI bots
4. Start messaging immediately

### AI Chat Features
- **Multiple AI Bots**: ChatGPT Assistant, Code Helper, Travel Planner
- **Realistic Responses**: Context-aware mock responses
- **Typing Indicators**: Shows when AI is "thinking"
- **Easy Integration**: Ready for real OpenAI API integration

### Profile & Settings
- Click the settings or profile icon in sidebar
- **Profile Tab**: Update name, status, bio
- **Appearance**: Light/dark theme, chat backgrounds
- **Notifications**: Message alerts and sound settings
- **Privacy**: Control who can see your profile

## 🔧 Customization

### Adding Real AI Integration
Replace the mock AI responses in `src/hooks/index.js`:

```javascript
// Replace the mock response with real API call
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${YOUR_API_KEY}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: message }]
  })
});
```

### Adding New AI Bots
Edit `src/data/mockData.js` to add new AI assistants:

```javascript
export const mockAIBots = [
  // ... existing bots
  {
    id: 'ai-4',
    name: 'Your Custom Bot',
    description: 'Your bot description',
    model: 'gpt-4',
    capabilities: ['custom', 'features']
  }
];
```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── ChatSidebar.jsx  # Left sidebar with chat list
│   ├── ChatArea.jsx     # Main chat interface
│   ├── NewChatModal.jsx # Modal for creating new chats
│   └── ProfileSettings.jsx # Settings and profile page
├── data/
│   └── mockData.js      # Sample data and mock responses
├── hooks/
│   └── index.js         # Custom React hooks
├── lib/
│   └── utils.js         # Utility functions
├── types/
│   └── index.js         # TypeScript-style type definitions
├── App.jsx              # Main application component
├── App.css              # Global styles
└── main.jsx             # Application entry point
```

## 🚀 Deployment

### Build for Production
```bash
pnpm run build
# or
npm run build
```

### Deploy to Vercel
1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy automatically

### Deploy to Netlify
1. Build the project: `pnpm run build`
2. Upload `dist` folder to Netlify
3. Configure as SPA

## 🔮 Future Enhancements

- [ ] Real-time synchronization with WebSockets
- [ ] File and image sharing
- [ ] Voice messages
- [ ] Group chats
- [ ] Message encryption
- [ ] Push notifications
- [ ] Video calls
- [ ] Message search within chats
- [ ] Message reactions
- [ ] Dark mode theme

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or issues:
- Check the code comments for implementation details
- Review the component structure in the project
- Modify mock data for testing different scenarios

---

**Built with ❤️ using React, Tailwind CSS, and modern web technologies**

