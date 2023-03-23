import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { SqliteConnectionOptions } from "typeorm/driver/sqlite/SqliteConnectionOptions";

const dataSource = new DataSource({
    type: "sqlite",
    database: "recipedb",
    entities: [__dirname + "/**/*.entity{.ts,.js}"],
    synchronize: false,
    logging: true,
    migrationsRun: false,
    migrations: [__dirname + '/**/migrations/*.js'], 
    migrationsTableName: 'migrations',
});

dataSource.initialize();

export default dataSource;