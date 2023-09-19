import React, { Component } from 'react';
import '../css/Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
const baseUrl = "http://localhost:8000/tasks/api/v1/users";
const cookies = new Cookies();

class Login extends Component {
    state = {
        form: {
            cuil: '',
            password: ''
        }
    }

    handleChange = async e => {
        await this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        });
    }

    iniciarSesion = () => {
        axios
            .get(baseUrl, {
                params: { cuil: this.state.form.cuil, password: this.state.form.password },
            })
            .then((response) => {
                const data = response.data;

                if (data.length > 0) {
                    const usuarioEncontrado = data.find(
                        (usuario) =>
                            usuario.cuil === this.state.form.cuil &&
                            usuario.password === this.state.form.password
                    );
                    if (usuarioEncontrado) {
                        const idUsuario = usuarioEncontrado.id;
                        const nameUsuario = usuarioEncontrado.name;

                        cookies.set('usuarioAutenticado', 'true', { path: '/' });
                        cookies.set('idUsuario', idUsuario, { path: '/' });
                        cookies.set('nameUsuario', nameUsuario, { path: '/' });
                        console.log(`Inicio de sesion exitoso para ${usuarioEncontrado.name}`);
                        // No es necesario cambiar el estado aquí, se manejará en el método render

                        window.location.reload();
                        //recarga pagina

                    } else {
                        alert('El usuario o la contraseña son incorrectos');
                    }
                } else {
                    alert('No se encontraron usuarios');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    cerrarSesion = () => {
        cookies.remove('usuarioAutenticado', { path: '/' });
        cookies.remove('idUsuario', { path: '/' });
        cookies.remove('nameUsuario', { path: '/' });
        // No es necesario recargar la página, el contenido cambiará automáticamente

        window.location.reload();
        //recarga pagina
    }

    render() {
        const idUsuario = cookies.get('idUsuario');
        return (
            <div className="containerPrincipal">
                <div className="containerSecundario">
                    {idUsuario ? ( // Verifica si la cookie idUsuario existe
                        <div>
                            <h2>Bienvenido {cookies.get('nameUsuario')}</h2>
                            <p><Link to="/tasks"><button className="btn btn-primary">Dashboard</button></Link></p>
                            <p><Link onClick={this.cerrarSesion}>Cerrar Sesión</Link></p>
                        </div>
                    ) : (
                        <div className="form-group">
                            <label>Usuario: </label>
                            <br />
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tu CUIL"
                                name="cuil"
                                onChange={this.handleChange}
                            />
                            <br />
                            <label>Contraseña: </label>
                            <br />
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Tu contraseña"
                                name="password"
                                onChange={this.handleChange}
                            />
                            <br />
                            <button className="btn btn-primary" onClick={this.iniciarSesion}>Iniciar Sesión</button>
                            <br></br>
                            <p className='already-account'>¿No tiene un usuario?</p>
                            <br></br>
                            <Link to="/register">
                                <button className="btn btn-primary">Registrarse</button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default Login;
