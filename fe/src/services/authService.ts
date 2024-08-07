import axios from 'axios';

export const loginWithGoogle = async () => {

    axios.defaults.baseURL = import.meta.env.VITE_API_URL;

    // Obtener URL de autenticación de Google
    const { data } = await axios.get(`/auth/google`);
    console.log(data);
    // window.location.href = 'http://ai4u.com.co/app/chat';

    fetch(`${import.meta.env.VITE_API_URL}/auth/google`, {
        credentials: 'include'
      })
