import axios from 'axios';

export const loginWithGoogle = async () => {

    // Obtener URL de autenticación de Google
    const { data } = await axios.get(`{import.meta.env.VITE_API_URL}/google`);
    console.log(data);
    // window.location.href = 'http://ai4u.com.co/app/chat';
};
