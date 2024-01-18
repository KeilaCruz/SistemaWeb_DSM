import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export function Header() {
  let { user, logout } = useContext(AuthContext);
  return (
    <div>
      <Link to="/home">Home</Link>
      <span> | </span>
      {user ? (
        <a onClick={logout}>Logout</a>
      ) : (
        <Link to="/login">Login</Link>
      )}

      {user && <p>Hello {user.username}</p>}
    </div>
  )
}

