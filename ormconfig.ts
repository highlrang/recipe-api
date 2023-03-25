import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { BaseDataSourceOptions } from "typeorm/data-source/BaseDataSourceOptions";

const nodeEnv = process.env.NODE_ENV.trim();
module.exports = require(`./ormconfig-${nodeEnv}.js`);