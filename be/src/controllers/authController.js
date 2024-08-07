import { google } from 'googleapis';
import 'dotenv/config'

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
   process.env.GOOGLE_CALLBACK_URL,
);

export const googleAuth = async (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Referrer-Policy', 'no-referrer-when-downgrade');
    const url = oauth2Client.generateAuthUrl({
        prompt: 'consent',
        access_type: 'offline',
        scope: ['profile', 'email'],
    });
    res.json({ url });
};

async function getUserData(access_token) {
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
    const data = await response.json();
    console.log(data);
    return data;
}


export const googleAuthCallback = async (req, res) => {
    const { code } = req.query;
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Obtener información del usuario
    const oauth2 = google.oauth2({ auth: oauth2Client, version: 'v2' });
    const userInfo = await oauth2.userinfo.get();
    
    // Redirigir al frontend con la información del usuario
    const name = encodeURIComponent(userInfo.data.name || '');
    // res.json({ userInfo, tokens, name: name });

res.redirect(`https://www.ai4u.com.co/app/chat?name=${name}&id_token=${tokens.id_token}`);
// TODO: Cambiar la URL de redirección usando variables de entorno
// res.redirect(`${process.env.FRONTEND_URL}/app/chat?name=${name}&id_token=${tokens.id_token}`);
};
