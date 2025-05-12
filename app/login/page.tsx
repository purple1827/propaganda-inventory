"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    // 1. 取得 Google Sheet 帳號密碼資料
    const res = await fetch("https://api.sheetbest.com/sheets/541555aa-ac65-4b8a-b73b-378c43d37f83");
    const users = await res.json();
    // 2. 檢查帳號密碼
    const user = users.find(
      (u: any) => u.username === form.username && u.password === form.password
    );
    if (!user) {
      setError("帳號或密碼錯誤");
      return;
    }
    // 3. 登入成功，記錄登入狀態
    localStorage.setItem("loginUser", JSON.stringify(user));
    // 4. 根據角色導向不同頁面
    if (user.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/");
    }
  };

  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f7f7f7" }}>
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: 32,
          borderRadius: 12,
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          minWidth: 320,
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 24 }}>登入</h2>
        <div style={{ marginBottom: 16 }}>
          <label>帳號：</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>密碼：</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: 8, borderRadius: 4, border: "1px solid #ccc" }}
          />
        </div>
        {error && <div style={{ color: "red", marginBottom: 12 }}>{error}</div>}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 4,
            background: "#0070f3",
            color: "#fff",
            border: "none",
            fontWeight: "bold",
            fontSize: 16,
            letterSpacing: 1,
            cursor: "pointer",
          }}
        >
          登入
        </button>
      </form>
    </main>
  );
}