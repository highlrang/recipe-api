import { BeforeInsert, Column, Entity, PrimaryColumn } from "typeorm";
import * as bcrypt from "bcrypt";
import { BasicEntity } from "src/common/entity/basic.entity";
import { UserRole, UserRoleType } from "../enum/user-role.enum";

@Entity('User') //
export class UserEntity extends BasicEntity { // export

    @PrimaryColumn({ name: "user_id" }) // @PrimaryGeneratedColumn
    userId: number; // 변수: type;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ name: "user_name" })
    userName: string;

    @Column({ name: "verification_token" })
    verificationToken: string;

    @Column({ name: "certified_yn"})
    certifiedYn: boolean;

    @Column({ name: "token_expiration_date" })
    tokenExpirationDate: Date;

    @Column({ name: "role_type" })
    roleType: UserRoleType;

    @BeforeInsert()
    async setPassword(password: string) {
        const salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(password || this.password, salt);
    }
}