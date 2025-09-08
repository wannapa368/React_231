// src/component/MemberList.tsx
type Member = {
  nameTH: string;
  nameEN: string;
  age: number;
  heightCm: number;
  imageUrl?: string;
  group?: string;
};

type MemberListProps = {
  list_Members: Member[]; // สมาชิกทั้งหมด
  groupName: string;      // ชื่อวงที่จะ filter
};

const MemberList = ({ list_Members, groupName }: MemberListProps) => {
  // filter เฉพาะวงที่กำหนด
  const filtered = list_Members.filter(m => m.group === groupName);

  return (
    <div>
      <h2>{groupName} Members</h2>
      <ul>
        {filtered.map((member, index) => (
          <li 
            key={index} 
            className={member.group === "BUS" ? "green-text" : "red-text"}
          >
            {member.nameEN} ({member.nameTH})
            <br />
            <img 
              src={member.imageUrl} 
              alt={member.nameEN} 
              style={{ width: "120px", borderRadius: "8px", marginTop: "5px" }} 
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MemberList;
