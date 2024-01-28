import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: {
        msg: 'Please enter a valid email'
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        msg: 'Password must be of at least 6 characters'
      }
    }
  },
  passwordToken: DataTypes.STRING,
  passwordTokenExpiration: DataTypes.DATE
})

export default User;