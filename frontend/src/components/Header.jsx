import { Link } from "react-router-dom"
export function Header() {
    return (
        <>
            <nav>
                <ul>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                    <li>
                        <Link to="/homePsicologia">HomePage Psicologia</Link>
                    </li>
                    <li>
                        <Link to="/homeRecepcionista">HomePage Recepcionista</Link>
                    </li>
                </ul>
            </nav>
        </>
    )
}

