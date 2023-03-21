import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { BaseDataSourceOptions } from "typeorm/data-source/BaseDataSourceOptions";

const node_db = process.env.NODE_DB.trim();
module.exports = require(`./src/resources/ormconfig-${node_db}.js`);