import { Link } from "react-router-dom"
export function Header() {
    return (
        <>
            <Link to="/">Home</Link>
            <span> | </span>
            <Link to="/Login">Login</Link>
        </>
    )
}

