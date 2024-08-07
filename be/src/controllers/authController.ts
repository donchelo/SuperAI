import { Request, Response } from 'express';
import { google } from 'googleapis';


const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
   process.env.GOOGLE_CALLBACK_URL,
);

export const googleAuth = (req: Request, res: Response) => {
    const url = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['profile', 'email'],
    });
    res.redirect(url);
};

export const googleAuthCallback = async (req: Request, res: Response) => {
    const { code } = req.query;
    const { tokens } = await oauth2Client.getToken(code as string);
    oauth2Client.setCredentials(tokens);

    // Obtener información del usuario
    const oauth2 = google.oauth2({ auth: oauth2Client, version: 'v2' });
    const userInfo = await oauth2.userinfo.get();
    
    // Redirigir al frontend con la información del usuario
    const name = encodeURIComponent(userInfo.data.name || '');
    res.redirect(`http://localhost:5173/app?name=${name}`);
};
