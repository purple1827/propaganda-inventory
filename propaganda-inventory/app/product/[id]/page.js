import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

// 產生所有靜態頁面
export async function generateStaticParams() {
  const res = await fetch("https://api.sheetbest.com/sheets/1522276e-7c68-4355-9a10-7cda433c7f90");
  const data = await res.json();
  return data.map(item => ({ id: String(item.id) }));
}

// 取得單一商品
async function getProduct(id) {
  const res = await fetch("https://api.sheetbest.com/sheets/1522276e-7c68-4355-9a10-7cda433c7f90");
  const data = await res.json();
  return data.find(item => String(item.id) === id);
}

export default async function Page({ params }) {
  const product = await getProduct(params.id);

  if (!product) return <div>找不到商品</div>;

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
          <AddToCartButton product={product} />
      
        </div>
      </div>
    </main>
  );
}