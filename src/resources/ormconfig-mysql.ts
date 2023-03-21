import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

module.exports = {
  type: "mysql",
  "host": process.env.DB_HOST,
  "port": parseInt(process.env.DB_PORT),
  "username": process.env.DB_USER,
  "password": process.env.DB_PASSWORD,
  "database": 'recipedb',
  "entities": [__dirname + "/**/*.entity{.ts,.js}"],
  "synchronize": false
};