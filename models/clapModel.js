import { DataTypes } from "sequelize";
import sequelize from "../config/database";

const Clap = sequelize.define('Clap', {
  count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  }
})

export default Clap;