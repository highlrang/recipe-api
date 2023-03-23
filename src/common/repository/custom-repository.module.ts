import { DynamicModule, Provider } from "@nestjs/common";
import { getDataSourceToken } from "@nestjs/typeorm";
import { DataSource } from "typeorm";

export class CustomRepositoryModule{

    public static forRepository<T extends new (...args: any[]) => any>(repositories: T[]): DynamicModule {

        const providers: Provider[] = [];

        for (const repository of repositories) {
            const entity = Reflect.getMetadata("CUSTOM_REPOSITORY", repository);

            if(!entity){
                continue;
            }

            // provider에 custom repository들 넣음
            providers.push({
                inject: [getDataSourceToken()],
                provide: repository, 
                useFactory: (dataSource: DataSource): typeof repository => {
                    const baseRepository = dataSource.getRepository<any>(entity);
                    return new repository(baseRepository.target, baseRepository.manager, baseRepository.queryRunner);
                }
            })
        }

        return {
            exports: providers,
            module: CustomRepositoryModule,
            providers,
        }
    }

}