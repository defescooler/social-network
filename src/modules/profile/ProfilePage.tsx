import React, { useRef, useState, useEffect } from "react";

const LS_PROFILE_KEY = "my-social-network-profile";

export const ProfilePage = () => {
  // Load from localStorage or use defaults
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem(LS_PROFILE_KEY);
    return saved
      ? JSON.parse(saved)
      : {
          name: "Your Name",
          surname: "",
          status: "",
          photo: "",
        };
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem(LS_PROFILE_KEY, JSON.stringify(profile));
  }, [profile]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setProfile((p: any) => ({ ...p, photo: ev.target?.result }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((p: any) => ({ ...p, [name]: value }));
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-2xl shadow-xl mt-8 flex flex-col items-center gap-y-6">
      <h2 className="text-2xl font-bold mb-2">Edit Profile</h2>
      <div className="flex flex-col items-center gap-y-4 w-full">
        <div className="relative">
          <img
            src={profile.photo || "/icon.png"}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-blue-200 shadow-md mb-2"
          />
          <button
            className="absolute bottom-2 right-2 bg-blue-500 text-white rounded-full p-2 shadow hover:bg-blue-600"
            onClick={() => fileInputRef.current?.click()}
            title="Change photo"
          >
            ✏️
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhotoChange}
          />
        </div>
        <div className="flex gap-x-4 w-full">
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Name"
            className="flex-1 px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
          />
          <input
            type="text"
            name="surname"
            value={profile.surname}
            onChange={handleChange}
            placeholder="Surname"
            className="flex-1 px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
          />
        </div>
        <textarea
          name="status"
          value={profile.status}
          onChange={handleChange}
          placeholder="Status (personal note)"
          className="w-full px-4 py-2 rounded-lg border border-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg min-h-[60px]"
        />
      </div>
    </div>
  );
}; 