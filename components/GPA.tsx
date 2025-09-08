import { useState } from "react";

function GPAApp() {
  const [courses, setCourses] = useState([]);
  const [courseName, setCourseName] = useState("");
  const [grade, setGrade] = useState("");
  const [gpa, setGPA] = useState(null);

  // แผนที่เกรดเป็นคะแนนตัวเลข
  const gradePoints = {
    "A": 4.0,
    "B+": 3.5,
    "B": 3.0,
    "C+": 2.5,
    "C": 2.0,
    "D+": 1.5,
    "D": 1.0,
    "F": 0,
  };

  const addCourse = () => {
    if (!courseName || !grade) return;
    setCourses([...courses, { name: courseName, grade }]);
    setCourseName("");
    setGrade("");
    setGPA(null); // รีเซ็ต GPA ทุกครั้งที่เพิ่ม
  };

  const deleteCourse = (index) => {
    setCourses(courses.filter((_, i) => i !== index));
    setGPA(null);
  };

  const calculateGPA = () => {
    if (courses.length === 0) return;
    const totalPoints = courses.reduce((sum, course) => sum + (gradePoints[course.grade] || 0), 0);
    const resultGPA = totalPoints / courses.length;
    setGPA(resultGPA.toFixed(2));
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>GPA Calculator</h2>

      <div style={{ marginBottom: 10 }}>
        <input
          type="text"
          placeholder="รายชื่อวิชา"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          style={{ marginRight: 10 }}
        />
        <select value={grade} onChange={(e) => setGrade(e.target.value)} style={{ marginRight: 10 }}>
          <option value="">เลือกเกรด</option>
          <option value="A">A</option>
          <option value="B+">B+</option>
          <option value="B">B</option>
          <option value="C+">C+</option>
          <option value="C">C</option>
          <option value="D+">D+</option>
          <option value="D">D</option>
          <option value="F">F</option>
          <option value="W">W</option>
        </select>
        <button onClick={addCourse}>เพิ่มรายวิชา</button>
      </div>

      <ul>
        {courses.map((course, index) => (
          <li key={index} style={{ marginBottom: 5 }}>
            <span style={{ color: course.grade === "F" ? "red" : "black" }}>
              {course.name} ({course.grade})
            </span>
            <button onClick={() => deleteCourse(index)} style={{ marginLeft: 10, color: "red" }}>
              ลบ
            </button>
          </li>
        ))}
      </ul>

      <button onClick={calculateGPA} style={{ marginTop: 10 }}>คำนวณ GPA</button>

      {gpa !== null && (
        <div style={{ marginTop: 10, fontWeight: "bold" }}>
          ค่า GPA = {gpa}
        </div>
      )}
    </div>
  );
}

export default GPAApp;