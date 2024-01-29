import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import sequelize from './config/database.js';
import registrationRouter from './routes/userRoutes.js';
import authrouter from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser());

app.use('/api/v1', registrationRouter);
app.use('/api/v1', authrouter);

app.use((error, req, res, next) => {
  const message = error.message;
  const status = error.statusCode || 500;
  res.status(status).send({ message })
})

sequelize.sync().then(() => {
  console.log('Database connected');
  app.listen(process.env.PORT, () => {
    console.log(`Server connected: listening on port ${process.env.PORT}`);
  })
})
