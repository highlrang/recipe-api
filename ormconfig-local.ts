import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";

module.exports = {
    type: "sqlite",
    database: "recipedb",
    entities: [__dirname + "/**/entity/*.entity{.ts,.js}"],
    synchronize: true,
    logging: true,
    // migrationsRun: false,
    // migrations: [__dirname + '/**/migrations/*.js'], 
    // migrationsTableName: 'migrations',
}