import { BasicEntity } from "src/common/entity/basic.entity";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity('User_Token')
export class UserTokenEntity extends BasicEntity {

    @PrimaryGeneratedColumn({ name: 'user_token_id' })
    userTokenId: number;

    @Column({ name: 'user_id' })
    userId: string;

    @Column({ name: 'refresh_token' })
    refreshToken : string;

    
}