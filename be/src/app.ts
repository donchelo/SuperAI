import express from 'express';
import authRoutes from './routes/authRoutes';

const app = express();

app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
