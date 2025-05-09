"use client";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://api.sheetbest.com/sheets/1522276e-7c68-4355-9a10-7cda433c7f90")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <>
     
      <main
  style={{
    minHeight: "100vh",
    background: "#111",
    padding: "40px 0",
  }}
>
  
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 32,
      maxWidth: 1200,
      margin: "0 auto",
    }}
  >
    {products.map((item) => (
      <div
        key={item.id}
        style={{
          width: 260,
          background: "linear-gradient(135deg, rgba(224, 224, 224, 0.52), rgba(185, 180, 180, 0.6))",
          borderRadius: 18,
          boxShadow: "0 4px 24px #0008",
          padding: 24,
          marginBottom: 16,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          border: "1.5px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(2px)",
        }}
      >
        <img
          src={item.image}
          alt={item["項目"]}
          style={{
            width: 160,
            height: 160,
            objectFit: "cover",
            borderRadius: 12,
            marginBottom: 18,
            boxShadow: "0 2px 12px #0006",
          }}
        />
        <div
          style={{
            color: "#fff",
            fontWeight: "bold",
            fontSize: 20,
            marginBottom: 8,
            textAlign: "center",
            textShadow: "0 2px 8px #000a",
          }}
        >
          {item["項目"]}
        </div>
        <div style={{ color: "#b3e5ff", fontSize: 15, marginBottom: 4 }}>
          剩餘數量：{item["剩餘數量"]}
        </div>
        <div style={{ color: "#eee", fontSize: 14, marginBottom: 8 }}>
          目前存放位置：{item["目前存放位置"]}
        </div>
        <Link
          href={`/product/${item.id}`}
          style={{
            marginTop: 10,
            padding: "8px 24px",
            background: "linear-gradient(90deg,rgba(219, 216, 231, 0.16) 40%,rgba(193, 198, 199, 0.67) 100%)",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: "bold",
            fontSize: 16,
            textDecoration: "none",
            boxShadow: "0 2px 8px #0004",
            transition: "transform 0.1s",
            display: "inline-block",
          }}
        >
          查看詳細
        </Link>
      </div>
    ))}
  </div>
</main>
    </>
  );
}