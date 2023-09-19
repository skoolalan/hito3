import { Link } from "react-router-dom"
export function Navigation(){
    return (
        <div>
            <Link to="/tasks">
            <h1>Task App</h1>
            </Link>
            <Link to="/tasks-create">create task</Link><br></br>
            <Link to="/login">login</Link><br></br>
            <Link to="/register">register</Link><br></br>

        </div>
    )
}