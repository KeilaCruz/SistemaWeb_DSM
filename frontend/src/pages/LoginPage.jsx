import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'
import Header from '../components/Header'

function LoginPage() {

  let {loginUser} = useContext(AuthContext)
  return (
    <div>
      <form onSubmit={loginUser}>
        <input type="text" name="username" id="username" placeholder="Enter username"/>
        <input type="password" name="password" id="password" placeholder="Enter password"/>
        <input type="submit"/>
      </form>
    </div>
  )
}

export default LoginPage