import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('User') //
export class UserEntity { // export

    @PrimaryColumn() // 
    userId: number; // 변수: type;

    // @Column({ length: 30 })
    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    signupVerifyToken: string;


}