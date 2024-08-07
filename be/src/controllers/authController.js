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
        access_type: 'offline',
        scope: ['profile', 'email'],
        // scope: ['https://www.googleapis.com/auth/userinfo.profile email'],
        // prompt: 'consent',
    });
    res.json({ url });

    // res.redirect(url);
};

async function getUserData(access_token) {
    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);
    const data = await response.json();
    console.log(data);
    return data;
}


export const googleAuthCallback = async (req, res) => {
    const { code } = req.query;
    
    try{
        if (!code) {
            throw new Error('No code provided');
        }
        const { token } = await oauth2Client.getToken(code);
        await oauth2Client.setCredentials(token);
        // Obtener información del usuario
        const oauth2 = google.oauth2({ auth: oauth2Client, version: 'v2' });
        const userInfo = await oauth2.userinfo.get();
        const name = encodeURIComponent(userInfo.data.name || '');
        res.redirect('https://www.ai4u.com.co/app/chat?user=' + name);
    }
    catch(err){
        console.error(err);
    }

    
    // Redirigir al frontend con la información del usuario
    // res.json({ userInfo });
};
