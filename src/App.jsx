// function

// import React, { useState, useEffect } from 'react';

// function App() {
//   const [toDo, setToDo] = useState("");
//   const [toDos, setToDos] = useState([]);
//   const [filter, setFilter] = useState("all"); // 필터 상태
//   const [editIndex, setEditIndex] = useState(null); // 편집 인덱스
//   const [editValue, setEditValue] = useState(""); // 편집 값

//   useEffect(() => {
//     // 로컬 저장소에서 To Do 리스트를 불러옵니다.
//     const savedToDos = JSON.parse(localStorage.getItem("toDos")) || [];
//     setToDos(savedToDos);
//   }, []);

//   useEffect(() => {
//     // To Do 리스트를 로컬 저장소에 저장합니다.
//     localStorage.setItem("toDos", JSON.stringify(toDos));
//   }, [toDos]);

//   const onChange = (event) => setToDo(event.target.value);
//   const onSubmit = (event) => {
//     event.preventDefault();
//     if (toDo === "") return;
//     if (editIndex !== null) {
//       // 편집 모드에서 업데이트
//       setToDos((currentArray) =>
//         currentArray.map((item, index) =>
//           index === editIndex ? { ...item, text: toDo } : item
//         )
//       );
//       setEditIndex(null);
//       setToDo("");
//     } else {
//       // 새 항목 추가
//       setToDos((currentArray) => [
//         ...currentArray,
//         { text: toDo, completed: false, dueDate: null },
//       ]);
//       setToDo("");
//     }
//   };

//   const toggleComplete = (index) => {
//     setToDos((currentArray) =>
//       currentArray.map((item, i) =>
//         i === index ? { ...item, completed: !item.completed } : item
//       )
//     );
//   };

//   const removeToDo = (index) => {
//     setToDos((currentArray) => currentArray.filter((_, i) => i !== index));
//   };

//   const startEditing = (index) => {
//     setEditIndex(index);
//     setToDo(toDos[index].text);
//   };

//   const onDueDateChange = (index, date) => {
//     setToDos((currentArray) =>
//       currentArray.map((item, i) =>
//         i === index ? { ...item, dueDate: date } : item
//       )
//     );
//   };

//   const filteredToDos = toDos.filter((item) => {
//     if (filter === "completed") return item.completed;
//     if (filter === "incomplete") return !item.completed;
//     return true;
//   });

//   return (
//     <div>
//       <h1>My To Dos ({toDos.length})</h1>
//       <form onSubmit={onSubmit}>
//         <input
//           onChange={onChange}
//           value={toDo}
//           type="text"
//           placeholder="Write your to do..."
//         />
//         <button type="submit">{editIndex !== null ? "Update To Do" : "Add To Do"}</button>
//       </form>
//       <hr />
//       <div>
//         <button onClick={() => setFilter("all")}>All</button>
//         <button onClick={() => setFilter("completed")}>Completed</button>
//         <button onClick={() => setFilter("incomplete")}>Incomplete</button>
//       </div>
//       <ul>
//         {filteredToDos.map((item, index) => (
//           <li key={index}>
//             <span
//               style={{ textDecoration: item.completed ? 'line-through' : 'none' }}
//               onClick={() => toggleComplete(index)}
//             >
//               {item.text}
//             </span>
//             {item.dueDate && <span> (Due: {new Date(item.dueDate).toLocaleDateString()})</span>}
//             <button onClick={() => startEditing(index)}>Edit</button>
//             <button onClick={() => removeToDo(index)}>Delete</button>
//             <input
//               type="date"
//               value={item.dueDate || ""}
//               onChange={(e) => onDueDateChange(index, e.target.value)}
//             />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;

// css
//
// import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import "./index.css"; // 또는 './App.css'

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);

  const onChange = (event) => setToDo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (toDo === "") {
      return;
    }
    setToDos((currentArray) => [toDo, ...currentArray]);
    setToDo("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">My To Dos ({toDos.length})</h1>
        <form onSubmit={onSubmit} className="flex flex-col">
          <input
            onChange={onChange}
            value={toDo}
            type="text"
            placeholder="Write your to do..."
            className="border border-gray-300 p-2 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
          >
            Add To Do
          </button>
        </form>
        <hr className="my-4" />
        <ul className="list-disc pl-5">
          {toDos.map((item, index) => (
            <li key={index} className="mb-1">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
