import { BasicEntity } from "src/common/entity/basic.entity";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('User_Token')
export class UserTokenEntity extends BasicEntity {

    @PrimaryColumn({ name: 'user_token_id' })
    userTokenId: number;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({ name: 'refresh_token' })
    refreshToken : string;

    
}