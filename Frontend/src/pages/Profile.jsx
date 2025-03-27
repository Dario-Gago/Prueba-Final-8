import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../context/UserProvider';

const Profile = () => {
  const { logout, getProfile, user } = useContext(UserContext);
  const [email, setEmail] = useState('');

  useEffect(() => {
    // Si el usuario tiene un token, obtener el perfil
    if (user) {
      setEmail(user.email); // Actualiza el email desde el perfil
    } else {
      // Si no, intenta obtener el perfil desde la API
      getProfile();
    }
  }, [user, getProfile]);

  return (
    <div className='container mt-4'>
      <div className='card p-4 text-center'>
        <h4 className='mb-3'>Usuario</h4>
        <p className='mb-3'>{email || 'No hay email disponible'}</p>
        <button onClick={logout} className='btn btn-danger'>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Profile;
