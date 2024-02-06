import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import sequelize from './config/database.js';
import userRouter from './routes/userRoutes.js';
import authrouter from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import editorRouter from './routes/editorRoutes.js';
import feedRouter from './routes/feedRoutes.js';
import User from './models/userModel.js';
import Feed from './models/FeedModel.js';
import Clap from './models/clapModel.js';
import clapRouter from './routes/clapRoutes.js';
import Comment from './models/commentModel.js';
const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser());

app.use('/api/v1', userRouter);
app.use('/api/v1', authrouter);
app.use(editorRouter);
app.use('/api/v1/', feedRouter);
app.use('/api/v1/', clapRouter);


app.use((error, req, res, next) => {
  const message = error.message;
  const status = error.statusCode || 500;
  res.status(status).send({ message })
})

User.hasMany(Feed);
Feed.belongsTo(User);
User.hasOne(Clap, { foreignKey: 'UserId'});
Clap.belongsTo(User, { foreignKey: 'UserId'});
Feed.hasMany(Clap, { foreignKey: 'FeedId'});
Clap.belongsTo(Feed, { foreignKey: 'FeedId'});
Feed.hasMany(Comment, { foreignKey: 'FeedId' });
Comment.belongsTo(Feed, { foreignKey: 'FeedId' });
Comment.hasMany(Comment, { as: 'replies', foreignKey: 'parentId' });
Comment.belongsTo(Comment, { foreignKey: 'parentId' });

sequelize.sync({ alter: true }).then(() => {
  console.log('Database connected');
  app.listen(process.env.PORT, () => {
    console.log(`Server connected: listening on port ${process.env.PORT}`);
  });
})
