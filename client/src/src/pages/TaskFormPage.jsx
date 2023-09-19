import React from 'react'
import '../css/TaskFormPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createTask, deleteTask, updateTask, getTask } from '../api/task.api';
import { useNavigate, useParams } from 'react-router-dom';

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
    const onSubmit = handleSubmit(async (data) => {
        if (params.id) {
            await updateTask(params.id, data);
        } else {
            await createTask(data);
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
    }, []);

    return (
      <div className="containerPrincipal">
                <div className="containerSecundario">
        <div>
            <form className="form-group" onSubmit={onSubmit}>
                <input className="form-control"
                    type="text"
                    placeholder="Title"
                    {...register('title', { required: true })}
                /><br></br>
                {errors.title && <span>Title is required</span>}

                <textarea className="form-control"
                    rows="3"
                    placeholder="Description"
                    {...register('description', { required: true })}
                ></textarea><br></br>
                {errors.description && <span>Description is required</span>}

                <input className="form-control"
                    type="time"
                    placeholder="Time"
                    {...register('time', { required: true })}
                /><br></br>
                {errors.time && <span>Time is required</span>}

                <input className="form-control"
                    type="date"
                    placeholder="Date"
                    {...register('date', { required: true })}
                /><br></br>
                {errors.date && <span>Date is required</span>}

                <div class="form-check">
                <input className="form-check-input"
                    type="checkbox"
                    
                    {...register('done', { required: false })}
                /><label class="form-check-label"><p class="text-primary">Completada</p></label></div>
                <br></br>
                {errors.date && <span>Date is required</span>}

                <button className="btn btn-primary">Save</button><br></br>
            </form><br></br>
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
