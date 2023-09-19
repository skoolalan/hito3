import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

export function TaskCard({ task }) {
  const navigate = useNavigate();

  return (
    <div className="col-2">
    <div className="containerSecundario">
    <div style={{  background: "rgba(255, 247, 209, 1.0)", color:"black", }} onClick={() => navigate(`/tasks/${task.id}`)}>
      <h1 style={{  background: "rgba(255, 242, 174, 1.0)"}}>{task.title}</h1>
      <div>
      <p>{task.description}</p>
      <p>{task.time}</p>
      <p>{task.date}</p>
      <p>Tarea completada: {task.done ? <b style={{color:"green"}}>Si</b>: <b style={{color:"red"}}>No</b>}</p> {/* Muestra "Si" si task.done es true, de lo contrario muestra "No" */}
      <hr />
      </div>
    </div>
    </div>
    </div>
  );
}
