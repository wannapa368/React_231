import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";


import MemberList from "../components/MemberList";


function App() {
  const [number, setNumber] = useState(0);
  const [name, setName] = useState("CSMJU");
  const [message, setMessage] = useState("สอบเสร็จแล้ว สบายใจจัง");
  const status = true;
  const [fontSize, setFontSize] = useState(3);

  const increaseFontSize = () => setFontSize(fontSize + 1);
  const decreaseFontSize = () => setFontSize(fontSize - 1);

  const handleAddNumber = () => setNumber(number + 1);

type Member = {
    nameTH: string; //ชื่อไทย
    nameEN: string; //ชื่ออังกฤษ
    age: number; //อายุ
    heightCm: number; //ส่วนสูง (ซม.)
    imageUrl?: string; //URL รูปภาพ
    group?: string; //กลุ่ม
  };

const BUS_MEMBERS: Member[] = [ 

{ nameTH: "อลัน พศวีร์ ศรีอรุโณทัย", nameEN: "Alan", heightCm: 185, age: 23, imageUrl: "/images/Alan.jpg" , group: "BUS"},

{ nameTH: "มาร์ค กฤษณ์ กัญจนาทิพย์", nameEN: "Marckris", heightCm: 172, age: 22, imageUrl: "/images/Marckris.jpg" , group: "BUS"},

{ nameTH: "ขุนพล ปองพล ปัญญามิตร", nameEN: "Khunpol", heightCm: 179, age: 22, imageUrl: "/images/khunpol.jpg" , group: "BUS"},

{ nameTH: "ฮาร์ท ชุติวัฒน์ จันเคน", nameEN: "Heart", heightCm: 174, age: 22, imageUrl: "/images/heart.jpg" , group: "BUS"},

{ nameTH: "จินวุค คิม", nameEN: "Jinwook", heightCm: 178, age: 21, imageUrl: "/images/jinwook.jpg" , group: "BUS"},

{ nameTH: "ไทย ชญานนท์ ภาคฐิน", nameEN: "Thai", heightCm: 178, age: 20, imageUrl: "/images/thai.jpg" , group: "BUS"},

{ nameTH: "เน็กซ์ ณัฐกิตติ์ แช่มดารา", nameEN: "Nex", heightCm: 180, age: 20, imageUrl: "/images/nex.jpg" , group: "BUS"},

{ nameTH: "ภู ธัชชัย ลิ้มปัญญากุล", nameEN: "Phu", heightCm: 180, age: 20, imageUrl: "/images/phu.jpg" , group: "BUS"},

{ nameTH: "คอปเปอร์ เดชาวัต พรเดชาพิพัฒ", nameEN: "Copper", heightCm: 173, age: 19, imageUrl: "/images/copper.jpg" , group: "BUS"},

{ nameTH: "เอเอ อชิรกรณ์ สุวิทยะเสถียร", nameEN: "AA", heightCm: 178, age: 19, imageUrl: "/images/aa.jpg" , group: "BUS"},

{ nameTH: "จั๋ง ธีร์ บุญเสริมสุวงศ์", nameEN: "Jungt", heightCm: 173, age: 19, imageUrl: "/images/jungt.jpg" , group: "BUS"},

{ nameTH: "ภีม วสุพล พรพนานุรักษ์", nameEN: "Peem", heightCm: 187, age: 19, imageUrl: "/images/peem.jpg" , group: "BUS"}]; 

// saja boys 5 คน
const SajaBoys = [
  { nameTH: "มิสเตอร์", nameEN: "Mystery", heightCm: 180, age: 20, imageUrl: "/images/mystery.jpg", group: "SAJA" },

  { nameTH: "แอบบี้", nameEN: "Abby", heightCm: 170, age: 19, imageUrl: "/images/abby.jpg", group: "SAJA" },

  { nameTH: "จินู", nameEN: "Jinu", heightCm: 175, age: 21, imageUrl: "/images/jinu.jpg", group: "SAJA" },

  { nameTH: "เบบี้", nameEN: "Baby", heightCm: 165, age: 18, imageUrl: "/images/baby.jpg", group: "SAJA" },

  { nameTH: "โรแมนซ์", nameEN: "Romance", heightCm: 178, age: 22, imageUrl: "/images/romance.jpg", group: "SAJA" }
];

  return (
    <>
    {/* แยกไปเป็น component prop = list_Members (ทั้งหมด) ,"ชื่อวง" ให้ component แสดงผลเฉพาะสมาชิกในวงที่ระบุ*/}
      <ul>
        {BUS_MEMBERS.map((member, index) => (
          <li key={index}
          className={member.group === "BUS" ? "green-text" : "red-text"}
          >{member.nameEN}
          <img src={member.imageUrl} />
          </li>
        ))}
      </ul>
      
      <div>
        {/* ✅ ย้าย h1 ไปใช้ HeaderTxt */}

        <MemberList list_Members={BUS_MEMBERS} groupName="BUS" />
        <MemberList list_Members={SajaBoys} groupName="SAJA" />

        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <HeaderTxt title="Vite + React" txtsize="100" status={false} />
      <div className="card">
        <ButtonAdd onAdd={handleAddNumber} />
        <h2>จำนวน: {number}</h2>

        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>

      <div style={{ marginTop: "10px" }}>
        <button onClick={increaseFontSize}>เพิ่มขนาดตัวอักษร</button>
        <button onClick={decreaseFontSize} style={{ marginLeft: "10px" }}>
          ลดขนาดตัวอักษร
        </button>
      </div>

      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;