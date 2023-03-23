import { InjectRepository } from "@nestjs/typeorm";
import { CustomRepository } from "src/common/repository/custom-repository";
import { DataSource, Repository } from "typeorm";
import { UserTokenEntity } from "../entity/user-token.entity";

@CustomRepository(UserTokenEntity)
export class UserTokenRepository extends Repository<UserTokenEntity> {

    constructor(private dataSource: DataSource){
        super(UserTokenEntity, dataSource.manager);
    }

    
}