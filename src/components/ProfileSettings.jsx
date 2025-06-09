import React, { useState } from 'react';
import { ArrowLeft, Camera, Save, Moon, Sun, Bell, Lock, HelpCircle } from 'lucide-react';
import { Button } from '../components/ui/button';

const ProfileSettings = ({ user, onSave, onClose }) => {
  const [profile, setProfile] = useState({
    name: user.name,
    avatar: user.avatar,
    status: user.status,
    theme: 'light',
    notifications: true,
    privacy: 'everyone'
  });

  const [activeTab, setActiveTab] = useState('profile');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    onSave(profile);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 flex items-center">
        <Button variant="ghost" size="sm" onClick={onClose} className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold">Settings</h1>
      </div>

      {/* Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 border-r border-gray-200 bg-gray-50">
          <div className="p-4">
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full text-left px-4 py-3 rounded-lg mb-1 ${
                activeTab === 'profile' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setActiveTab('appearance')}
              className={`w-full text-left px-4 py-3 rounded-lg mb-1 ${
                activeTab === 'appearance' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
              }`}
            >
              Appearance
            </button>
            <button
              onClick={() => setActiveTab('notifications')}
              className={`w-full text-left px-4 py-3 rounded-lg mb-1 ${
                activeTab === 'notifications' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
              }`}
            >
              Notifications
            </button>
            <button
              onClick={() => setActiveTab('privacy')}
              className={`w-full text-left px-4 py-3 rounded-lg mb-1 ${
                activeTab === 'privacy' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
              }`}
            >
              Privacy
            </button>
            <button
              onClick={() => setActiveTab('help')}
              className={`w-full text-left px-4 py-3 rounded-lg mb-1 ${
                activeTab === 'help' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'
              }`}
            >
              Help
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'profile' && (
            <div className="max-w-md">
              <h2 className="text-xl font-semibold mb-6">Profile Settings</h2>
              
              <div className="mb-8 flex justify-center">
                <div className="relative">
                  {profile.avatar ? (
                    <img
                      src={profile.avatar}
                      alt="Avatar"
                      className="w-24 h-24 rounded-full object-cover border-2 border-blue-400 shadow"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-3xl font-bold">
                      {profile.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <button
                    type="button"
                    className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full"
                    onClick={() => document.getElementById('avatar-upload-input').click()}
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                  <input
                    id="avatar-upload-input"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={e => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (ev) => {
                          setProfile(prev => ({ ...prev, avatar: ev.target.result }));
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profile.name}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={profile.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="online">Online</option>
                    <option value="away">Away</option>
                    <option value="offline">Offline</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Tell others about yourself..."
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'appearance' && (
            <div className="max-w-md">
              <h2 className="text-xl font-semibold mb-6">Appearance</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Theme</h3>
                  <div className="flex gap-4">
                    <div
                      onClick={() => handleChange({ target: { name: 'theme', value: 'light' } })}
                      className={`flex-1 border rounded-lg p-4 cursor-pointer ${
                        profile.theme === 'light' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-center mb-3">
                        <Sun className="h-8 w-8 text-yellow-500" />
                      </div>
                      <div className="text-center font-medium">Light</div>
                    </div>
                    
                    <div
                      onClick={() => handleChange({ target: { name: 'theme', value: 'dark' } })}
                      className={`flex-1 border rounded-lg p-4 cursor-pointer ${
                        profile.theme === 'dark' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                      }`}
                    >
                      <div className="flex items-center justify-center mb-3">
                        <Moon className="h-8 w-8 text-indigo-500" />
                      </div>
                      <div className="text-center font-medium">Dark</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Chat Background</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {['bg-white', 'bg-gray-100', 'bg-blue-50', 'bg-green-50', 'bg-yellow-50', 'bg-purple-50'].map((bg) => (
                      <div
                        key={bg}
                        className={`h-16 rounded-lg cursor-pointer ${bg} border ${
                          profile.chatBackground === bg ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                        }`}
                        onClick={() => handleChange({ target: { name: 'chatBackground', value: bg } })}
                      />
                    ))}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Font Size</h3>
                  <div className="flex items-center gap-4">
                    <span className="text-sm">A</span>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      step="1"
                      defaultValue="3"
                      className="flex-1"
                    />
                    <span className="text-lg">A</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="max-w-md">
              <h2 className="text-xl font-semibold mb-6">Notifications</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Message Notifications</h3>
                    <p className="text-sm text-gray-500">Get notified when you receive messages</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="notifications"
                      checked={profile.notifications}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Sound</h3>
                    <p className="text-sm text-gray-500">Play sound for new messages</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Preview</h3>
                    <p className="text-sm text-gray-500">Show message preview in notifications</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="max-w-md">
              <h2 className="text-xl font-semibold mb-6">Privacy</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Who can see my profile</h3>
                  <select
                    name="privacy"
                    value={profile.privacy}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="everyone">Everyone</option>
                    <option value="contacts">Contacts Only</option>
                    <option value="nobody">Nobody</option>
                  </select>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Last seen & online status</h3>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    defaultValue="everyone"
                  >
                    <option value="everyone">Everyone</option>
                    <option value="contacts">Contacts Only</option>
                    <option value="nobody">Nobody</option>
                  </select>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                    <Lock className="h-4 w-4 mr-2" />
                    Block Users
                  </Button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'help' && (
            <div className="max-w-md">
              <h2 className="text-xl font-semibold mb-6">Help & Support</h2>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium flex items-center">
                    <HelpCircle className="h-5 w-5 mr-2 text-blue-500" />
                    FAQ
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Find answers to frequently asked questions
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium flex items-center">
                    <HelpCircle className="h-5 w-5 mr-2 text-blue-500" />
                    Contact Support
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Get help from our support team
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium flex items-center">
                    <HelpCircle className="h-5 w-5 mr-2 text-blue-500" />
                    Privacy Policy
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Read our privacy policy
                  </p>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium flex items-center">
                    <HelpCircle className="h-5 w-5 mr-2 text-blue-500" />
                    Terms of Service
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Read our terms of service
                  </p>
                </div>
              </div>
              
              <div className="mt-8 text-center text-gray-500 text-sm">
                <p>AI Chat Frontend v1.0.0</p>
                <p>© 2025 All rights reserved</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
        <Button variant="outline" onClick={onClose} className="mr-2">
          Cancel
        </Button>
        <Button onClick={handleSave}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default ProfileSettings;

