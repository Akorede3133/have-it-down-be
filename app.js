import express from 'express';
import cors from 'cors';
import 'dotenv/config'

const app = express();

app.listen(process.env.PORT, () => {
  console.log(`Server connected: listening on port ${process.env.PORT}`);
})