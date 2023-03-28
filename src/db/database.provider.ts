// Nest imports
import { Sequelize } from "sequelize-typescript";
import { Dialect } from "sequelize/types";

// Files import

console.log(process.env.DB_HOST);

export const databaseProvider: any = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const SequelizeConnection: Sequelize = new Sequelize(process.env.DB_SCHEMA, process.env.DB_USER, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        dialect: process.env.DB_TYPE as Dialect,
        logging: [AppConstants.NODE_ENV.LOCAL, AppConstants.NODE_ENV.TEST].includes(process.env.NODE_ENV) ? console.log : false
      });
      SequelizeConnection.addModels([
        PasswordToken,
        RefreshToken,
        User
      ])
    }
  }
]