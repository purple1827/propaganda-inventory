"use client";
import { useState, useEffect } from "react";

export default function EditProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [displayName, setDisplayName] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loginUser = localStorage.getItem("loginUser");
      if (loginUser) {
        const u = JSON.parse(loginUser);
        setUser(u);
        setDisplayName(u.displayName || "");
      }
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!user) return;
    // 這裡請改成你自己的 API
    await fetch("http://localhost:3001/api/change-display-name", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user.username,
        newDisplayName: displayName,
      }),
    });
    // 更新 localStorage
    const updatedUser = { ...user, displayName };
    localStorage.setItem("loginUser", JSON.stringify(updatedUser));
    setSuccess(true);
  };

  return (
    <main style={{ padding: 24 }}>
      <h2>修改暱稱</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>新暱稱：</label>
          <input
            type="text"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            required
            style={{ marginLeft: 8, width: 200 }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 24px",
            borderRadius: 6,
            background: "#0070f3",
            color: "#fff",
            border: "none",
            fontSize: 18,
            cursor: "pointer",
          }}
        >
          送出
        </button>
        {success && (
          <div style={{ color: "green", marginTop: 16, fontWeight: "bold" }}>
            暱稱已修改！
          </div>
        )}
      </form>
    </main>
  );
}