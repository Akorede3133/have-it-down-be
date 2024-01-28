import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import sequelize from './config/database.js';

const app = express();

app.use(express.json());
app.use(cors());

sequelize.sync().then(() => {
  console.log('Database connected');
  app.listen(process.env.PORT, () => {
    console.log(`Server connected: listening on port ${process.env.PORT}`);
  })
})
