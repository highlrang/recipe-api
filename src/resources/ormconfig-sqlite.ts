import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";

module.exports = {
    type: "sqlite",
    "database": "recipedb",
    "autoLoadEntities": true,
    "synchronize": true,
    "logging": true,
    "dropSchema": true
};
