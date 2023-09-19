import { useNavigate } from "react-router-dom";

export function TaskCard({ task }) {
  const navigate = useNavigate();

  return (
    <div style={{ background: "black" }} onClick={() => navigate(`/tasks/${task.id}`)}>
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <p>{task.time}</p>
      <p>{task.date}</p>
      <p>Tarea completada: {task.done ? "Si" : "No"}</p> {/* Muestra "Si" si task.done es true, de lo contrario muestra "No" */}
      <hr />
    </div>
  );
}
