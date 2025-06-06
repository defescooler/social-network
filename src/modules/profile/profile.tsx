import React, { useRef, useState, useEffect } from "react";
import Cropper from "react-easy-crop";
import type { User } from "../../shared/model/types.ts";
import { useNavigate, NavLink } from "react-router-dom";

function getCroppedImg(
  imageSrc: string,
  crop: { x: number; y: number; width: number; height: number },
  zoom: number,
  aspect: number
): Promise<string> {
  // Utility to crop the image using canvas
  // Returns a promise that resolves with the cropped image as a data URL
  return new Promise((resolve) => {
    const image = new window.Image();
    image.src = imageSrc;
    image.onload = () => {
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return resolve(imageSrc);
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );
      resolve(canvas.toDataURL("image/jpeg"));
    };
  });
}

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
  const [editing, setEditing] = useState(false);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [showCropper, setShowCropper] = useState(false);

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

  const onCropComplete = (croppedArea: any, croppedAreaPixels: { x: number; y: number; width: number; height: number }) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleCropSave = async () => {
    if (!croppedAreaPixels) return;
    const croppedImg = await getCroppedImg(profile.photo, croppedAreaPixels, zoom, 1);
    setProfile((p) => ({ ...p, photo: croppedImg }));
    setShowCropper(false);
  };

  const handleSave = () => {
    setProfile((p) => ({ ...p, name: profile.name, surname: profile.surname, status: profile.status }));
    setEditing(false);
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
        {showCropper && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 flex flex-col items-center gap-y-4 shadow-2xl">
              <div className="relative w-72 h-72 bg-gray-100 rounded-lg overflow-hidden">
                <Cropper
                  image={profile.photo}
                  crop={crop}
                  zoom={zoom}
                  aspect={1}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>
              <input
                type="range"
                min={1}
                max={3}
                step={0.01}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-48"
              />
              <div className="flex gap-x-4 mt-2">
                <button className="button" onClick={handleCropSave}>Save</button>
                <button className="button bg-gray-300 text-gray-700 hover:bg-gray-400" onClick={() => setShowCropper(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
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
      <div className="flex gap-x-4 mt-4">
        {editing ? (
          <button className="button" onClick={handleSave}>Update</button>
        ) : (
          <button className="button" onClick={() => setEditing(true)}>Edit</button>
        )}
      </div>
    </div>
  );
};

// class Profile {
//   componentDidMount() {
//     console.log("mounted");
//   }
//   componentWillUpdate() {
//     console.log("updated");
//   }
//   componentWillUnmount() {
//     console.log("unmounted");
//   }
// }
