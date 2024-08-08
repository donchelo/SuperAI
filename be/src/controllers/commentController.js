import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const commentsFilePath = path.join(__dirname, '../../comments.json');

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
      res.status(201).json(newComment);
    });
  });
};

export const updateComment = (req, res) => {
  const commentId = parseInt(req.params.id, 10);
  const updatedComment = req.body;
  fs.readFile(commentsFilePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer los comentarios:', err);
      return res.status(500).send('Error al leer los comentarios');
    }
    const comments = JSON.parse(data);
    const index = comments.findIndex((comment) => comment.id === commentId);
    if (index !== -1) {
      comments[index] = { ...comments[index], ...updatedComment };
      fs.writeFile(commentsFilePath, JSON.stringify(comments, null, 2), (err) => {
        if (err) {
          console.error('Error al actualizar el comentario:', err);
          return res.status(500).send('Error al actualizar el comentario');
        }
        res.status(200).json(comments[index]);
      });
    } else {
      res.status(404).send('Comentario no encontrado');
    }
  });
};
