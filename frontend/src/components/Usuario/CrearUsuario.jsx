import React from 'react';
import { useForm } from 'react-hook-form';
import { enviarDatosAPI } from '../../Servers/UsuarioServer';
import AuthContext from '../../context/AuthProvider';
import { useContext, useState } from 'react';

export const Formulario = () => {
    const { register, handleSubmit } = useForm();
    const { authTokens } = useContext(AuthContext);
    const [submitting, setSubmitting] = useState(false);

    const onSubmit = async (data) => {
      try {
        if (!authTokens || !authTokens.access) {
          // Manejar el caso cuando el usuario no está autenticado o no hay token de acceso
          alert('No estás autenticado');
          return;
        }

        setSubmitting(true);
        const token = authTokens.access;
        await enviarDatosAPI(data, token);
        alert('Usuario registrado exitosamente');
      } catch (error) {
        console.error('Error al registrar usuario:', error);
        alert('Hubo un error al registrar el usuario');
      } finally {
        setSubmitting(false);
      }
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
       <input
        type="text"
        name="nombre"
        id="nombre"
        placeholder="Nombre"
        {...register('first_name', { required: true })}
      />
      <input
        type="text"
        name="apellido"
        id="apellido"
        placeholder="Apellido"
        {...register('last_name', { required: true })}
      />
        <input
            type="email"
            name="correo"
            id="correo"
            placeholder="Correo"
            {...register('email', { required: true })}
        />
        <label htmlFor="estado">Estado</label>
        <input
            type="checkbox"
            name="estado"
            id="estado"
            {...register('is_active', { required: true })}
        />
        <input
            type="text"
            name="segundoApellido"
            id="segundoApellido"
            placeholder="segundo Apellido"
            {...register('second_last_name', { required: true })}
        />
        <select
            name="rol"
            id="rol"
            {...register('idRol', { required: true })}
        >
            <option value={1}>Psicologo</option>
            <option value={2}>Recepcionista</option>
        </select>

      <input
        type="text"
        name="username"
        id="username"
        placeholder="Nombre de usuario"
        {...register('username', { required: true })}
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Contraseña"
        {...register('password', { required: true })}
      />

      <input
        type="submit"
        value={submitting ? 'Enviando...' : 'Enviar'}
        disabled={submitting}
      />
    </form>
  );
};
