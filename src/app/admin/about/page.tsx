"use client";
import { useState, useEffect } from "react";

export default function AdminAboutPage() {
  const [aboutUs, setAboutUs] = useState("");
  const [image, setImage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content")
      .then((res) => res.json())
      .then((data) => {
        setAboutUs(data.aboutUs?.content || "");
        setImage(data.aboutUs?.image || "");
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    let imageUrl = image;
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      const uploadRes = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });
      if (uploadRes.ok) {
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.url;
      }
    }
    await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "updateAboutUs",
        aboutUs: { content: aboutUs, image: imageUrl },
      }),
    });
    setSaving(false);
    alert("About Us updated!");
  };

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Edit About Us</h1>
      <textarea
        className="w-full border rounded p-3 mb-4 min-h-[120px]"
        value={aboutUs}
        onChange={e => setAboutUs(e.target.value)}
        placeholder="About Us content..."
      />
      <div className="mb-4">
        <label className="block mb-2 font-semibold">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={e => setImageFile(e.target.files?.[0] || null)}
        />
        {image && (
          <img src={image} alt="About Us" className="mt-4 rounded shadow w-48" />
        )}
      </div>
      <button
        className="bg-teal-600 text-white px-6 py-2 rounded font-bold"
        onClick={handleSave}
        disabled={saving}
      >
        {saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
