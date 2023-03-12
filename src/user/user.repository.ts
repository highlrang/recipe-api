

import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";

// 이거 안 되면 그냥 바로 주입받기
export class UserRepository extends Repository<UserEntity> {
    
}
