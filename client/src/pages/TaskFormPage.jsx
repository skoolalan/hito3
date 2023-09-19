import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createTask, deleteTask, updateTask, getTask } from '../api/task.api';
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'universal-cookie'; // Importa la librería universal-cookie

export function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const params = useParams();
  console.log(params);

  const navigate = useNavigate();
  const cookies = new Cookies(); // Crea una instancia de Cookies

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateTask(params.id, data);
    } else {
      // Obtener el valor de idUsuario de la cookie
      const idUsuario = cookies.get('idUsuario');

      // Asignar el valor de idUsuario al campo task
      const tarea = { ...data, task: idUsuario };

      await createTask(tarea);
    }
    navigate('/tasks');
  });

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const {
          data: { title, description, time, date, done },
        } = await getTask(params.id);
        setValue('title', title);
        setValue('description', description);
        setValue('time', time);
        setValue('date', date);
        setValue('done', done);
      }
    }
    loadTask();
  }, [params.id, setValue]);

  return (
    <div>
    <div className="containerPrincipal">
        <div className="containerSecundario">
      <form className="form-group" onSubmit={onSubmit}>
        <input className="form-control"
          type="text"
          placeholder="Title"
          {...register('title', { required: true })}
        />
        {errors.title && <span>Title is required</span>}

        <textarea className="form-control"
          rows="3"
          placeholder="Description"
          {...register('description', { required: true })}
        ></textarea>
        {errors.description && <span>Description is required</span>}

        <input className="form-control"
          type="time"
          placeholder="Time"
          {...register('time', { required: true })}
        />
        {errors.time && <span>Time is required</span>}

        <input className="form-control"
          type="date"
          placeholder="Date"
          {...register('date', { required: true })}
        /><br></br>
        <p style={{color:"black"}}>¿Desea marcar la tarea como completada?</p>
        {errors.date && <span>Date is required</span>}
        <input className="form-checkbox"
          type="checkbox"
          
          {...register('done', { required: false })}
        /><br></br>
        
        <button className="btn btn-primary">Save</button>
      </form>
      {params.id && (
        <button className="btn btn-danger"
          onClick={async () => {
            const accepted = window.confirm('Are you sure?');
            if (accepted) {
              await deleteTask(params.id);
              navigate('/tasks');
            }
          }}
        >
          Delete
        </button>
      )}
    </div>
    </div>
    </div>
  );
}
