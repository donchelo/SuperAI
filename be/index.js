import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import cors from 'cors';
import { googleAuth, googleAuthCallback } from './src/controllers/authController.js';


const app = express();
const port = 3001;
 const corsOptions = {
    origin: 'https://www.ai4u.com.co',
    optionsSuccessStatus: 200,
    allowedHeaders: 'Content-Type,Authorization'

  }


app.use(cors(corsOptions));
app.use(bodyParser.json());

app.options('*', cors()) 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = path.join(__dirname, 'respuestas.json');

// Asegúrate de que el directorio existe
fs.mkdirSync(path.dirname(filePath), { recursive: true });

app.post('/save-responses', (req, res) => {
  const responses = req.body;

  fs.writeFile(filePath, JSON.stringify(responses, null, 2), (err) => {
    if (err) {
      console.error('Error al guardar las respuestas:', err);
      return res.status(500).send('Error al guardar las respuestas');
    }
    res.status(200).send('Respuestas guardadas exitosamente');
  });
});

app.get('/get-responses', (req, res) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer las respuestas:', err);
      return res.status(500).send('Error al leer las respuestas');
    }
    res.status(200).json(JSON.parse(data));
  });
});

app.get('/ventas', (req, res) => {
  fs.readFile(path.join(__dirname, 'ventas.csv'), 'utf8', (err, data) => {
    console.log(__dirname, 'ventas.csv');
    if (err) {
      console.error('Error al leer los datos de ventas:', err);
      return res.status(500).send('Error al leer los datos de ventas');
    }
    res.status(200).send(data);
  });
}
);

app.get('/auth/google', googleAuth);
app.get('/auth/google/callback', googleAuthCallback);


app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
