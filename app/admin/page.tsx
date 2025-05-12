"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [records, setRecords] = useState<any[]>([]);
  const router = useRouter();

    // 登入狀態判斷
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("loginUser") || "null");
        if (!user || user.role !== "admin") {
          router.replace("/login");
        }
      }, [router]);
      

  // 申請紀錄API
  const API_URL = "https://api.sheetbest.com/sheets/02b3aceb-e524-4741-b358-a70e97fe9b52";
  // 庫存資料API
  const STOCK_API_URL = "https://api.sheetbest.com/sheets/1522276e-7c68-4355-9a10-7cda433c7f90"; // <--- 請換成你的庫存API網址

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setRecords(data));
  }, []);

  // 同意/駁回申請，並自動扣庫存
  const handleUpdateStatus = async (
    申請id: string,
    newStatus: string,
    宣導品id: string,
    領用數量: number
  ) => {
    // 1. 先 PATCH 更新申請紀錄狀態
    await fetch(
      `${API_URL}/申請id/${申請id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 狀態: newStatus }),
      }
    );

    // 2. 如果是「已通過」，再去扣庫存
    if (newStatus === "已通過") {
      // 先取得該宣導品目前的剩餘數量
      const res = await fetch(`${STOCK_API_URL}/id/${宣導品id}`);
      const stockData = await res.json();
      if (stockData.length > 0) {
        const currentRemain = Number(stockData[0]["剩餘數量"]);
        const newRemain = currentRemain - Number(領用數量);
        // PATCH 更新剩餘數量
        await fetch(`${STOCK_API_URL}/id/${宣導品id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 剩餘數量: newRemain }),
        });
      }
    }

    // 3. 重新抓一次申請紀錄
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setRecords(data));
  };

  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ fontSize: 28, fontWeight: "bold", marginBottom: 24 }}>申請審核管理</h1>
      <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff" }}>
        <thead>
          <tr style={{ background: "#f0f0f0" }}>
            <th>申請id</th>
            <th>宣導品名稱</th>
            <th>領用數量</th>
            <th>領用日期</th>
            <th>領用原因</th>
            <th>狀態</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {records.map((item) => (
            <tr key={item["申請id"]}>
              <td>{item["申請id"]}</td>
              <td>{item["宣導品名稱"]}</td>
              <td>{item["領用數量"]}</td>
              <td>{item["領用日期"]}</td>
              <td>{item["領用原因"]}</td>
              <td>{item["狀態"]}</td>
              <td>
                <button
                  style={{ marginRight: 8, background: "#0070f3", color: "#fff", border: "none", borderRadius: 4, padding: "4px 12px" }}
                  onClick={() =>
                    handleUpdateStatus(
                      item["申請id"],
                      "已通過",
                      item["宣導品id"],
                      item["領用數量"]
                    )
                  }
                  disabled={item["狀態"] === "已通過"}
                >
                  同意
                </button>
                <button
                  style={{ background: "#ff4d4f", color: "#fff", border: "none", borderRadius: 4, padding: "4px 12px" }}
                  onClick={() =>
                    handleUpdateStatus(
                      item["申請id"],
                      "已駁回",
                      item["宣導品id"],
                      item["領用數量"]
                    )
                  }
                  disabled={item["狀態"] === "已駁回"}
                >
                  駁回
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}