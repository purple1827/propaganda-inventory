"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const updateUser = () => {
      const loginUser = localStorage.getItem("loginUser");
      setUser(loginUser ? JSON.parse(loginUser) : null);
    };
    updateUser();
    window.addEventListener("storage", updateUser);
    return () => window.removeEventListener("storage", updateUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loginUser");
    localStorage.removeItem("applyCart");
    setUser(null);
    
    // router.push("/login"); // 這樣只會跳頁，不會刷新
  window.location.href = "/login"; // 這樣會跳轉並刷新
  };

  return (
    <nav
      style={{
        width: "100%",
        background: "linear-gradient(90deg, #223 0%, #22577A 100%)",
        color: "#fff",
        padding: "12px 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 24,
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}
    >
      <div style={{ flex: 1 }}></div>
      <div style={{ flex: 1, textAlign: "center" }}>
        <Link
          href="/"
          style={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: 20,
            textDecoration: "none",
          }}
        >
          宣導品管理系統
        </Link>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
        <Link href="/cart">
          <span style={{ color: "#fff", marginRight: 16, textDecoration: "none", cursor: "pointer" }}>
            申請清單
          </span>
        </Link>
        {user ? (
          <>
            <span style={{ marginRight: 16 }}>您好，{user.username}（{user.role}）</span>
            <Link href="/change-password" style={{ color: "#fff", marginRight: 16 }}>
              修改密碼
            </Link>
            <button
              onClick={handleLogout}
              style={{
                background: "#fff",
                color: "#0070f3",
                border: "none",
                borderRadius: 4,
                padding: "6px 16px",
                cursor: "pointer",
              }}
            >
              登出
            </button>
          </>
        ) : (
          <Link href="/login" style={{ color: "#fff", fontWeight: "bold" }}>
            登入
          </Link>
        )}
      </div>
    </nav>
  );
}