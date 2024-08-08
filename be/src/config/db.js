import dotenv from 'dotenv';
dotenv.config();

import pg from 'pg';

export const pool = new pg.Pool({
  user: process.env.POSTGRES_USER,
  host: 'localhost',
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
})

// import { Sequelize } from 'sequelize';
// import dotenv from 'dotenv';

// dotenv.config();

// const sequelize = new Sequelize(process.env.PG_URI, {
//   dialect: 'postgres',
//   logging: false,
// });

// const connectDB = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('PostgreSQL connected...');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//     process.exit(1);
//   }
// };

// export { sequelize, connectDB };
