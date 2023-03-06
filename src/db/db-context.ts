import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize({
  storage: `src/db/${process.env.DATABASE}.db`,
  dialect: 'sqlite',
  logging: false,
});
