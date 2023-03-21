import { UserEntity } from "src/user/entity/user.entity";
import { DataSource, Repository } from "typeorm";
import { MemberEntity } from "../entity/member.entity";

export interface MemberRepository extends Repository<MemberEntity>{

    save2(userEntity: UserEntity) : Promise<void>;
        
    // this.createQueryBuilder();
    
}

// export const MemberRepositoryFactory = (dataSource: DataSource) => 
// dataSource.getRepository(MemberEntity).extend({
//     save2(){

//     },
    
// })