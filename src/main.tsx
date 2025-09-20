import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App"
import ReactFrom from "./components/reactfrom"   // ✅ import component ที่อยู่ในโฟลเดอร์ components

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <ReactFrom />  {/* ✅ แสดง component reactfrom */}
  </StrictMode>
)