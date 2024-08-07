import axios from 'axios';

function navigateTo(url: string) {
    window.location.href = url;
}

export const loginWithGoogle = async () => {
    // Obtener URL de autenticación de Google
    const { data } = await axios.post(`/auth/google`);
    console.log(data);
    // window.location.href = 'http://ai4u.com.co/app/chat';
    navigateTo(data.url);
}
