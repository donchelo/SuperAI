import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import userRoutes from './routes/users.routes.js';
import morgan from 'morgan';

dotenv.config();

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware para parsear JSON
app.use(express.json());

// Rutas de autenticación
app.use('/auth', authRoutes);

// Rutas de comentarios
app.use('/api', commentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
