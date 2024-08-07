import axios from 'axios';

export const loginWithGoogle = async () => {

    axios.defaults.baseURL = import.meta.env.VITE_API_URL;

    // Obtener URL de autenticación de Google
    const { data } = await axios.get(`/auth/google`);
    console.log(data);
    // window.location.href = 'http://ai4u.com.co/app/chat';
    

    fetch(`${import.meta.env.VITE_API_URL}/auth/google`, {
        credentials: 'include',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      }
    }).then(response => {
        console.log(response);
        return response.json();
    }
    ).then(data => {
        console.log(data);
        window
        .location
        .assign(data.url);
    }
    ).catch(error => {
        console.log(error);
    });
}
