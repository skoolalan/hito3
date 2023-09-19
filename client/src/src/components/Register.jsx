import React, { useState } from 'react';
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { createUser } from '../api/users.api'; // Importa la función createUser
import axios from 'axios'; // Importa axios si es necesario

function Register() {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [cuil, setCuil] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const sendMail = async (emailData) => {
    try {
      // Aquí puedes usar axios o cualquier otra biblioteca para enviar el correo
      await axios.post('../services/emailService', emailData);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crea un objeto con los datos del nuevo usuario
    const newUser = {
      name,
      lastname,
      cuil,
      email,
      password,
    };

    try {
      // Envía los datos al servidor utilizando la función createUser
      const response = await createUser(newUser);

      // Verifica si la creación fue exitosa (código de estado 201)
      if (response.status === 201) {
        console.log('Usuario registrado exitosamente:', response.data, alert('Usted ha creado una cuenta satisfactoriamente'));

        // Envía un correo de bienvenida al nuevo usuario
        const emailData = {
          to: email, // Dirección de correo electrónico del usuario recién registrado
          subject: 'Bienvenido a nuestra plataforma', // Asunto del correo
          text: '¡Bienvenido! Gracias por registrarte en nuestra plataforma. Esperamos que disfrutes de nuestros servicios.', // Cuerpo del correo
        };

        sendMail(emailData); // Llama a la función sendMail para enviar el correo de bienvenida

        // Redirige al usuario a la página de inicio de sesión o realiza alguna otra acción
      }
    } catch (error) {
      // Maneja errores de creación de usuario aquí
      console.error('Error al registrar el usuario:', error, alert('Verifique los datos nuevamente'));
    }
  };

  return (
    <div className="containerPrincipal">
        <div className="containerSecundario">


        <div>
      <h2>Registrarse</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre:</label>
          <input className="form-control"
            type="text"
            id="name"
            placeholder="Tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="lastname">Apellido:</label>
          <input className="form-control"
            type="text"
            id="lastname"
            placeholder="Tu apellido"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="cuil">CUIL:</label>
          <input className="form-control"
            type="text"
            id="cuil"
            placeholder="Tu CUIL"
            value={cuil}
            onChange={(e) => setCuil(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Correo Electrónico:</label>
          <input className="form-control"
            type="email"
            id="email"
            placeholder="Tu correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input className="form-control"
            type="password"
            id="password"
            placeholder="Tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <br></br>
        <button className="btn btn-primary" type="submit">Registrarse</button>
      </form>
      <div>
        <br></br>
        <p className='already-account'>¿Ya tienes una cuenta?</p>
        <br></br>
        <Link to="/login">
        <button className="btn btn-primary" >Iniciar Sesión</button>
        </Link>
      </div>
    </div>


        </div>
            </div>





    
  );
}

export default Register
