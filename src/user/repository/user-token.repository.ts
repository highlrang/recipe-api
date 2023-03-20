import { InjectRepository } from "@nestjs/typeorm";
import { DataSource, Repository } from "typeorm";
import { UserTokenEntity } from "../entity/user-token.entity";

export class UserTokenRepository extends Repository<UserTokenEntity> {

    constructor(@InjectRepository(UserTokenEntity) private dataSource: DataSource){
        super(UserTokenEntity, dataSource.manager);
    }

    
}