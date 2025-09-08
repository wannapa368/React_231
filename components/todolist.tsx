// Todolist.tsx 

import { useState } from "react"; 

function TodoApp() { 

    const [task, setTask] = useState<string>("");        // เก็บค่าที่พิมพ์ใน input 

    const [tasks, setTasks] = useState<string[]>([]);      // เก็บรายการงานทั้งหมด 

    const addTask = () => { 

        if (task.trim() === "") return;            // กัน input ว่าง 

        setTasks([...tasks, task]);                // เพิ่ม task ลงใน array 

        setTask("");                               // เคลียร์ input หลังเพิ่ม 

    }; 
const deleteTask = (index: number) => { 

        // เก็บรายการที่ index ไม่ตรงกับอันที่ต้องการลบ 

        const newTasks = tasks.filter((_, i) => i !== index); 

        setTasks(newTasks); 

    }; 
    return ( 

        <div style={{ textAlign: "center", marginTop: "50px" }}> 

            <h1>My To-do List</h1> 

            <input 

                type="text" 

                value={task} 

                onChange={(e) => setTask(e.target.value)} 

                placeholder="พิมพ์งานที่ต้องทำ..." 

            /> 

            <button onClick={addTask}>Add</button> 

            <ul style={{ listStyle: "none", padding: 0 }}> 

                {tasks.map((t, index) => ( 

                    <li key={index} style={{ margin: "5px 0" }}> 

                        <span>{t}</span>

                        <button
                            onClick={() => addTask()}
                            style={{ marginLeft: 10, color: "green" }}
                        >
                            เพิ่ม
                        </button>


                        <button 

                            onClick={() => deleteTask(index)} 

                            style={{ marginLeft: 10, color: "red" }} 

                        > 

                            ลบ 

                        </button> 
                        {t} 

                    </li> 

                ))} 

            </ul> 

        </div> 

    ); 

} 

export default TodoApp; 