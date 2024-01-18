import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';

const HomePage = () => {
  const { authTokens, logoutUser } = useContext(AuthContext);
  const [notas, setNotas] = useState([]);

  const getNotas = async () => {
   
      const response = await fetch('http://localhost:8000/paciente/notas/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + String(authTokens.access),
        },
      });
      const data = await response.json();
      setNotas(data);

      if (response.status === 200) {
       setNotas(data);
      }else if(response.statusText === 'Unauthorized'){
        logoutUser()
      }
   
  };

  useEffect(() => {
    getNotas();
  }, []); // El segundo argumento de useEffect es un array de dependencias

  return (
    <>
      <div>You are logged in to the home page</div>

      <ul>
        {notas.map((nota) => (
          <li key={nota.id}>{nota.nota}</li>
        ))}
      </ul>
    </>
  );
};

export default HomePage;
