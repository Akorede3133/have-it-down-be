import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Feed = sequelize.define('Feed', {
  title: {
    type: DataTypes.STRING,
  },
  content: {
    type: DataTypes.ARRAY(DataTypes.JSON),
  },
  draft: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  claps: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  tags: DataTypes.ARRAY(DataTypes.STRING)
})

export default Feed;