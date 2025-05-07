"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

// ...
<div style={{ marginBottom: 16 }}>
  <Link href="/" style={{
    color: "#0070f3",
    fontWeight: "bold",
    textDecoration: "underline",
    fontSize: 18,
  }}>
    ← 回首頁
  </Link>
</div>
export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);
  const [reason, setReason] = useState("");
  const [date, setDate] = useState("");
  const [success, setSuccess] = useState(false);

  // 讀取 localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem("applyCart");
      setCart(stored ? JSON.parse(stored) : []);
    } catch (e) {
      setCart([]);
      localStorage.removeItem("applyCart");
    }
  }, []);

  // 修改數量
  const handleCountChange = (index: number, value: number) => {
    const newCart = [...cart];
    newCart[index].count = value;
    setCart(newCart);
    localStorage.setItem("applyCart", JSON.stringify(newCart));
  };

  // 刪除項目
  const handleRemove = (index: number) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem("applyCart", JSON.stringify(newCart));
  };

  // 送出申請
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!date || !reason) {
      alert("請填寫領用日期與原因");
      return;
    }
    const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("loginUser") || "null") : null;

    for (const item of cart) {
      await fetch("https://api.sheetbest.com/sheets/02b3aceb-e524-4741-b358-a70e97fe9b52", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          申請id: Date.now() + Math.random(),
          宣導品id: item.id,
          宣導品名稱: item.name,
          領用數量: item.count || 1,
          領用日期: date,
          領用原因: reason,
          申請人: user ? user.username : "",
          狀態: "待審核",
        }),
      });
    }
    setSuccess(true);
    setCart([]);
    localStorage.removeItem("applyCart");
  };

  return (
    <main style={{ padding: 32, maxWidth: 900, margin: "0 auto" }}>
  <div style={{ marginBottom: 16 }}>
  
  </div>
  <h2 style={{ fontSize: 28, fontWeight: "bold", marginBottom: 24 }}>申請清單</h2>
  {cart.length === 0 ? (
    <p>目前沒有任何宣導品在清單中。</p>
  ) : (
    <form onSubmit={handleSubmit} style={{
      background: "#f7faff",
      border: "1px solid #cce0ff",
      borderRadius: 12,
      padding: 24,
      boxShadow: "0 2px 8px #0001"
    }}>
      <table style={{
        width: "100%",
        marginBottom: 24,
        borderCollapse: "collapse",
        background: "#fff"
      }}>
        <thead>
          <tr>
            <th style={{ borderBottom: "2px solid #0070f3", padding: 8, textAlign: "center" }}>名稱</th>
            <th style={{ borderBottom: "2px solid #0070f3", padding: 8, textAlign: "center" }}>數量</th>
            <th style={{ borderBottom: "2px solid #0070f3", padding: 8, textAlign: "center" }}>操作</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, idx) => (
            <tr key={item.id}>
              <td style={{ padding: 8, textAlign: "center" }}>{item.name}</td>
              <td style={{ padding: 8, textAlign: "center" }}>
                <input
                  type="number"
                  min={1}
                  value={item.count || 1}
                  onChange={e => handleCountChange(idx, Number(e.target.value))}
                  style={{
                    width: 60,
                    padding: "4px 8px",
                    border: "1px solid #0070f3",
                    borderRadius: 4,
                    textAlign: "center"
                  }}
                />
              </td>
              <td style={{ padding: 8, textAlign: "center" }}>
                <button type="button" onClick={() => handleRemove(idx)} style={{
                  color: "#fff",
                  background: "#ff4d4f",
                  border: "none",
                  borderRadius: 4,
                  padding: "4px 12px",
                  cursor: "pointer"
                }}>
                  刪除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginBottom: 16, display: "flex", alignItems: "center" }}>
        <label style={{ minWidth: 80 }}>領用日期：</label>
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          required
          style={{
            marginLeft: 8,
            padding: "6px 12px",
            border: "1px solid #0070f3",
            borderRadius: 4
          }}
        />
      </div>
      <div style={{ marginBottom: 16, display: "flex", alignItems: "center" }}>
        <label style={{ minWidth: 80 }}>領用原因：</label>
        <input
          type="text"
          value={reason}
          onChange={e => setReason(e.target.value)}
          required
          style={{
            marginLeft: 8,
            width: 300,
            padding: "6px 12px",
            border: "1px solid #0070f3",
            borderRadius: 4
          }}
        />
      </div>
      <button
        type="submit"
        style={{
          padding: "12px 32px",
          borderRadius: 6,
          background: "#0070f3",
          color: "#fff",
          border: "none",
          fontSize: 20,
          cursor: "pointer",
          marginTop: 8,
          fontWeight: "bold"
        }}
      >
        送出申請
      </button>
      {success && (
        <div style={{ color: "green", marginTop: 16, fontWeight: "bold" }}>
          申請已送出！
        </div>
      )}
    </form>
  )}
</main>
 
  );
}