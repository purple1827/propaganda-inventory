"use client";
import { useState } from "react";

const API_URL = "http://localhost:3001/api/change-display-name";

export default function ChangeDisplayNamePage() {
  const [displayName, setDisplayName] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChangeDisplayName = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");
    const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("loginUser") || "null") : null;
    if (!user) {
      setError("請先登入");
      return;
    }
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: user.username,
          newDisplayName: displayName,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("暱稱修改成功！");
        // 也可以同步更新 localStorage 裡的 loginUser
        user.displayName = displayName;
        localStorage.setItem("loginUser", JSON.stringify(user));
      } else {
        setError("暱稱修改失敗：" + data.message);
      }
    } catch (err: any) {
      setError("暱稱修改失敗：" + err.message);
    }
  };

  return (
    <div style={{
      maxWidth: 400,
      margin: "40px auto",
      background: "#f5f6fa",
      borderRadius: "12px",
      padding: "32px",
      boxShadow: "0 2px 8px #0001",
    }}>
      <h2 style={{ textAlign: "center" }}>修改暱稱</h2>
      <form onSubmit={handleChangeDisplayName}>
        <div style={{ marginBottom: 16 }}>
          <label>新暱稱：</label>
          <input
            type="text"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            required
            style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 4,
            background: "#2d8cf0",
            color: "#fff",
            border: "none",
            fontWeight: "bold",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          送出
        </button>
      </form>
      {message && <p style={{ color: "green", textAlign: "center" }}>{message}</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
    </div>
  );
}