import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Comment = sequelize.define('Comment', {
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
})

export default Comment;