import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Feed = sequelize.define('Feed', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.ARRAY,
  },
  draft: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  }
})

export default Feed;