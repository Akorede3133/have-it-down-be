import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./userModel.js";
import Feed from "./FeedModel.js";

const Clap = sequelize.define('Clap', {
})

export default Clap;