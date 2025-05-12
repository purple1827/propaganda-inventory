"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page({ params }) {
  const id = params.id;
  const [user, setUser] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch("https://api.sheetbest.com/sheets/1522276e-7c68-4355-9a10-7cda433c7f90")
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((item) => String(item.id) === id);
        setProduct(found);
      });
    if (typeof window !== "undefined") {
      const loginUser = localStorage.getItem("loginUser");
      setUser(loginUser ? JSON.parse(loginUser) : null);
    }
  }, [id]);

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("applyCart") || "[]");
    const exist = cart.find((item) => item.id === product.id);
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

  if (!product) return <div>載入中...</div>;

  return (
    <main style={{
      minHeight: "100vh",
      background: "#111",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "40px 0",
    }}>
      <div style={{
        background: "rgba(30,30,40,0.92)",
        borderRadius: 18,
        boxShadow: "0 4px 24px #0008",
        padding: 36,
        maxWidth: 700,
        width: "90%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 36,
        marginTop: 32,
      }}>
        <img src={product.image} alt={product["項目"]} style={{
          width: 220,
          height: 220,
          objectFit: "cover",
          borderRadius: 14,
          boxShadow: "0 2px 12px #0006",
          background: "#222",
        }} />
     <div style={{
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
}}>
  <h1 style={{
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 18,
    textAlign: "center",
    letterSpacing: 2,
  }}>
    {product["項目"]}
  </h1>
  <ul style={{
    color: "#e0e0e0",
    fontSize: 17,
    listStyle: "none",
    padding: 0,
    marginBottom: 18,
    marginTop: 0,
  }}>
    <li>到貨日期：{product["到貨日期"]}</li>
    <li>單價：{product["單價"]}</li>
    <li>採購數量：{product["採購數量"]}</li>
    <li>領用總數：{product["領用總數"]}</li>
    <li>剩餘數量：{product["剩餘數量"]}</li>
    <li>目前存放位置：{product["目前存放位置"]}</li>
    <li>備註：{product["備註"]}</li>
    <li>印製文字：{product["印製文字"]}</li>
  </ul>
  {user ? (
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
      e.currentTarget.style.background =
        "linear-gradient(90deg, rgba(255,168,0,0.95) 0%, rgba(255,120,0,0.95) 100%)";
      e.currentTarget.style.boxShadow = "0 4px 16px #ff980055";
    }}
    onMouseOut={e => {
      e.currentTarget.style.background =
        "linear-gradient(90deg, rgba(255,168,0,0.7) 0%, rgba(255,120,0,0.7) 100%)";
      e.currentTarget.style.boxShadow = "0 2px 12px #0004";
    }}
  >
    加入申請清單
  </button>
) : (
  <div style={{ color: "#888", marginTop: 24 }}>
    請先 <Link href="/login" style={{ color: "#0070f3" }}>登入</Link> 才能申請領用宣導品
  </div>
)}
</div>
      </div>
    </main>
  );
}