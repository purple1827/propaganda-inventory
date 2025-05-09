"use client";
import { useEffect, useState, useRef } from "react";

export default function FloatingCart() {
  const [cart, setCart] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const cartRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 32, y: 32 });
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const loginUser = localStorage.getItem("loginUser");
    setUser(loginUser ? JSON.parse(loginUser) : null);
  }, []);

  useEffect(() => {
    
    const updateCart = () => {
      const stored = localStorage.getItem("applyCart");
      setCart(stored ? JSON.parse(stored) : []);
    };
    
    updateCart();
    window.addEventListener("storage", updateCart);
    
    return () => window.removeEventListener("storage", updateCart);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const stored = localStorage.getItem("applyCart");
      setCart(stored ? JSON.parse(stored) : []);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // 只在 client 端執行
    setPos({ x: 32, y: window.innerHeight - 250 });
  }, []);
  

  // 拖曳事件
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);          
    setOffset({
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    });
  };
  

  const handleMouseMove = (e: MouseEvent) => {
    if (dragging) {
      setPos({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    } else {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
    // eslint-disable-next-line
  }, [dragging, offset]);

  if (!user) return null; // 沒登入不顯示申請清單

  return (
    <div
      ref={cartRef}
      style={{
        position: "fixed",
      left: pos.x,
      top: pos.y,
      background: "#fff",
      color: "#333",
      border: "1px solid #0070f3",
      borderRadius: 12,
      boxShadow: "0 2px 8px #0003",
      padding: 16,
      minWidth: 220,
      zIndex: 1, // 調低一點
      cursor: dragging ? "grabbing" : "grab",
      userSelect: "none",
      pointerEvents: "auto", // 確保可以拖曳
      }}
      onMouseDown={handleMouseDown} 
    >
      <div
        style={{ fontWeight: "bold", marginBottom: 8, cursor: "grab" }}
        onMouseDown={handleMouseDown}
      >
        申請清單
      </div>
      <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
        {cart.length === 0 ? (
          <li style={{ color: "#888" }}>尚未加入任何宣導品</li>
        ) : (
          cart.map((item) => (
            <li key={item.id}>
              {item.name}（數量：{item.count || 1}）
            </li>
          ))
        )}
      </ul>
    </div>
  );
}