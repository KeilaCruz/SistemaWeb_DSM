import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';

const HomePage = () => {
  const { authTokens, logoutUser } = useContext(AuthContext);
  const [notas, setNotas] = useState([]);

  const getNotas = async () => {
    try {
      const response = await axios.get('http://localhost:8000/paciente/notas/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + String(authTokens.access),
        },
      });
  
      const data = response.data;
  
      if (response.status === 200) {
        setNotas(data);
      } else if (response.status === 401) {  // Unauthorized status code
        logoutUser();
      }
    } catch (error) {
      console.error('Error fetching notas:', error);
      // Puedes manejar el error de la manera que desees
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
