import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import sequelize from './config/database.js';
import registrationRouter from './routes/userRoutes.js';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1', registrationRouter);

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
