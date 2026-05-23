'use client';

import { useRef, useState } from 'react';
import AppShell from '@/components/AppShell';
import { Camera, UploadCloud } from 'lucide-react';

export default function ProfilePage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [photoName, setPhotoName] = useState('');
  const [preview, setPreview] = useState('');

  const updatePhoto = (file?: File) => {
    if (!file) return;
    setPhotoName(file.name);
    setPreview(URL.createObjectURL(file));
  };

  return (
    <AppShell title="Edit Profile">
      <section className="profile-card">
        <h1>Edit Profile</h1>

        <div className="photo-row">
          <button className="photo-preview" type="button" onClick={() => inputRef.current?.click()}>
            {preview ? <img src={preview} alt="Profile preview" /> : <Camera size={30} />}
          </button>
          <div>
            <strong>Profile Photo</strong>
            <p>{photoName || 'Upload a photo for your teacher profile.'}</p>
            <button className="white-btn" type="button" onClick={() => inputRef.current?.click()}>
              <UploadCloud size={15} />
              Upload Photo
            </button>
            <input
              ref={inputRef}
              className="file-input"
              type="file"
              accept="image/png,image/jpeg,image/jpg"
              onChange={(event) => updatePhoto(event.target.files?.[0])}
            />
          </div>
        </div>

        <label>
          Name
          <input defaultValue="John Doe" />
        </label>
        <label>
          Role
          <input defaultValue="Teacher" />
        </label>
        <label>
          School
          <input defaultValue="Delhi Public School" />
        </label>
        <button className="black-btn">Save Profile</button>
      </section>
    </AppShell>
  );
}
