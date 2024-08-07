// src/controllers/commentController.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const commentsFilePath = path.join(__dirname, '../../comentarios.json');

// Asegúrate de que el directorio existe
fs.mkdirSync(path.dirname(commentsFilePath), { recursive: true });

export const getComments = (req, res) => {
  fs.readFile(commentsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer los comentarios:', err);
      return res.status(500).send('Error al leer los comentarios');
    }
    res.status(200).json(JSON.parse(data));
  });
};

export const addComment = (req, res) => {
  const newComment = req.body;
  fs.readFile(commentsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer los comentarios:', err);
      return res.status(500).send('Error al leer los comentarios');
    }
    const comments = JSON.parse(data);
    comments.push(newComment);
    fs.writeFile(commentsFilePath, JSON.stringify(comments, null, 2), (err) => {
      if (err) {
        console.error('Error al guardar el comentario:', err);
        return res.status(500).send('Error al guardar el comentario');
      }
      res.status(201).send('Comentario guardado exitosamente');
    });
  });
};
