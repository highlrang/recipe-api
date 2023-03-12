import { BasicEntity } from "src/common/entity/basic.entity";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";
import { MemberGrade, MemberGradeType } from "./enum/member-grade.enum";


@Entity('Member') 
export class MemberEntity extends BasicEntity { 

    @PrimaryColumn({ name: "member_id" }) // @PrimaryGeneratedColumn
    memberId: number; 

    @Column({ name: "user_id" })
    userId: number; // 변수: type;
    
    @Column()
    name: string;

    @Column()
    grade: MemberGradeType;

    static create(name: string) : MemberEntity{
        const member = new MemberEntity();
        member.name = name;
        member.grade = MemberGrade.NORMAL;
        return member;
    }
}