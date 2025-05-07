"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function r() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const loginUser = localStorage.getItem("loginUser");
      setUser(loginUser ? JSON.parse(loginUser) : null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loginUser");
    setUser(null);
    router.push("/login");
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
      {/* 左側空白 */}
      <div style={{ flex: 1 }}></div>
      {/* 中間標題 */}
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
      {/* 右側功能 */}
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
          
        )
        }
   

      </div>
    </nav>
  );
}