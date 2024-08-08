import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import commentRoutes from './routes/commentRoutes.js';
import userRoutes from './routes/users.routes.js';
import morgan from 'morgan';

dotenv.config();
const app = express();

// Middleware para loggear las peticiones
app.use(morgan('dev'));

// Middleware para parsear JSON
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/comment', commentRoutes);
app.use('/user', userRoutes);
export default app;