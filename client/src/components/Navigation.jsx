import React from "react";
import { Link } from "react-router-dom";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export function Navigation() {
  const usuarioAutenticado = cookies.get("usuarioAutenticado");

  const cerrarSesion = () => {
    // Eliminar cookies
    cookies.remove("usuarioAutenticado", { path: "/" });
    cookies.remove("idUsuario", { path: "/" });
    cookies.remove("nameUsuario", { path: "/" });

    // Redirigir a la página de inicio de sesión u otra página según tu aplicación
    // Puedes usar useHistory para redirigir en lugar de recargar la página.
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">
        Task App
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/tasks">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/tasks-create">
              Create Task
            </Link>
          </li>

          {usuarioAutenticado ? null : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
        {usuarioAutenticado ? (
          <form className="form-inline my-2 my-lg-0 ml-auto">
            <button
              className="btn btn-outline-danger my-2 my-sm-0"
              type="button"
              onClick={cerrarSesion}
            >
              Cerrar Sesión
            </button>
          </form>
        ) : (
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="button"
          >
            <Link className="nav-link" to="/login">
              Iniciar Sesión
            </Link>
          </button>
        )}
      </div>
    </nav>
  );
}
