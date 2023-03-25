import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import ConfigService from '@nestjs/config';

module.exports = {
  type: "mysql",
  host: '127.0.0.1',
  port: 3306,
  username: 'zero',
  password: 'zero1234',
  database: 'recipedb',
  entities: [__dirname + "/**/*.entity{.ts,.js}"],
  synchronize: false
};