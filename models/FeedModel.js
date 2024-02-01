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
  }
})

export default Feed;