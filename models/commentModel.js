import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Comment = sequelize.define('Comment', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  claps: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
})

export default Comment;