import { Sequelize } from "sequelize";

const sequelize = new Sequelize('have-it-down-development', 'postgres', 'Akorede1#', {
  dialect: 'postgres'
});

export default sequelize;