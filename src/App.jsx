import "./App.css";
import { useEffect, useState } from "react";
import "./index.css";

// {
//   text:toDO
//   completed
// }

function App() {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    // 로컬 저장소에서 To Do 리스트를 불러옴
    const savedToDos = JSON.parse(localStorage.getItem("toDos")) || [];
    setToDos(savedToDos);
  }, []);

  useEffect(() => {
    // To Do 리스트를 로컬 저장소에 저장
    localStorage.setItem("toDos", JSON.stringify(toDos));
  }, [toDos]);

  const onChange = (event) => setToDo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (toDo === "") return;
    if (editIndex !== null) {
      // 편집 모드에서 업데이트
      setToDos((currentArray) =>
        currentArray.map((item, index) =>
          index === editIndex ? { ...item, text: toDo } : item
        )
      );
      setEditIndex(null);
      setToDo("");
    } else {
      // 새 항목 추가
      setToDos((currentArray) => [
        ...currentArray,
        { text: toDo, completed: false },
      ]);
      setToDo("");
    }
  };

  const toggleComplete = (index) => {
    setToDos((currentArray) =>
      currentArray.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const removeToDo = (index) => {
    setToDos((currentArray) => currentArray.filter((_, i) => i !== index));
  };

  const startEditing = (index) => {
    setEditIndex(index);
    setToDo(toDos[index].text);
  };

  const filteredToDos = toDos.filter((item) => {
    if (filter === "completed") return item.completed;
    if (filter === "incomplete") return !item.completed;
    return true;
  });

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
            {editIndex !== null ? "Update To Do" : "Add To Do"}
          </button>
        </form>
        <hr className="my-4 " />
        <div className="flex justify-center ">
          <button
            className="m-2 font-semibold "
            onClick={() => setFilter("all")}
          >
            All
          </button>
          <button
            className="m-2 font-semibold"
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
          <button
            className="m-2 font-semibold"
            onClick={() => setFilter("incomplete")}
          >
            Incomplete
          </button>
        </div>
        <hr className="my-2" />
        <ul className="list-disc pl-5">
          {filteredToDos.map((item, index) => (
            <li key={index}>
              <span
                style={{
                  textDecoration: item.completed ? "line-through" : "none",
                }}
                onClick={() => toggleComplete(index)}
                className="cursor-pointer flex text-lg"
              >
                {item.text}
              </span>
              <span className="flex justify-end">
                <button
                  className=" p-1 px-2 my-3 mr-0 rounded-md bg-blue-500 text-white"
                  onClick={() => startEditing(index)}
                >
                  Edit
                </button>
                <button
                  className="p-1 px-2 m-3 rounded-md bg-red-400 text-white"
                  onClick={() => removeToDo(index)}
                >
                  Delete
                </button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
