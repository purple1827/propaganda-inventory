"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function AddToCartButton({ product }: { product: any }) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loginUser = localStorage.getItem("loginUser");
    setUser(loginUser ? JSON.parse(loginUser) : null);
  }, []);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("applyCart") || "[]");
    const exist = cart.find((item: any) => item.id === product.id);
    if (!exist) {
      cart.push({
        id: product.id,
        name: product["項目"],
        image: product.image,
        count: 1,
      });
      localStorage.setItem("applyCart", JSON.stringify(cart));
      alert("已加入申請清單！");
    } else {
      alert("此宣導品已在清單中！");
    }
  };

  if (!user) {
    return (
      <div style={{ color: "#888", marginTop: 24 }}>
        請先 <Link href="/login" style={{ color: "#0070f3" }}>登入</Link> 才能申請領用宣導品
      </div>
    );
  }

  return (
    <button
      onClick={handleAddToCart}
      style={{
        marginTop: 12,
        padding: "12px 32px",
        borderRadius: 10,
        background: "linear-gradient(90deg, rgba(255,168,0,0.7) 0%, rgba(255,120,0,0.7) 100%)",
        color: "#fff",
        border: "none",
        fontWeight: "bold",
        fontSize: 18,
        boxShadow: "0 2px 12px #0004",
        cursor: "pointer",
        backdropFilter: "blur(2px)",
        transition: "background 0.2s, box-shadow 0.2s",
      }}
      onMouseOver={e => {
        (e.currentTarget as HTMLButtonElement).style.background =
          "linear-gradient(90deg, rgba(255,168,0,0.95) 0%, rgba(255,120,0,0.95) 100%)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 16px #ff980055";
      }}
      onMouseOut={e => {
        (e.currentTarget as HTMLButtonElement).style.background =
          "linear-gradient(90deg, rgba(255,168,0,0.7) 0%, rgba(255,120,0,0.7) 100%)";
        (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 2px 12px #0004";
      }}
    >
      加入申請清單
    </button>
  );
}