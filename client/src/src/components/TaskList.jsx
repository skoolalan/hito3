import React, { useEffect, useState } from "react";
import { getAllTask } from "../api/task.api";
import { TaskCard } from "./TaskCard";
import Cookies from 'universal-cookie';

const cookies = new Cookies(); // Crear una instancia de Cookies

export function TaskList() {
    const [tasks, setTasks] = useState([]);
    
    useEffect(() => {
        // Obtener el valor de la cookie 'idUsuario'
        const idUsuario = cookies.get('idUsuario');

        async function loadTasks() {
            const res = await getAllTask();
            // Filtrar las tareas por 'task' igual a 'idUsuario'
            const filteredTasks = res.data.filter(task => task.task === idUsuario);
            setTasks(filteredTasks);
        }
        
        loadTasks();
    }, []);

    return (
        <div>
            {tasks.map(task => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    );
}
