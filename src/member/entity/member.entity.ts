import { BasicEntity } from "src/common/entity/basic.entity";
import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";
import { MemberGrade, MemberGradeType } from "../enum/member-grade.enum";


@Entity('Member') 
export class MemberEntity extends BasicEntity { 

    @PrimaryColumn({ name: "member_id" }) // @PrimaryGeneratedColumn
    memberId: number; 

    @Column({ name: "user_id" })
    userId: number; // 변수: type;
    
    @Column({ name: "member_name" })
    memberName: string;

    @Column({ name: "member_grade" })
    memberGrade: MemberGradeType;

    static create(userId: number, name: string) : MemberEntity{
        const member = new MemberEntity();
        member.userId = userId;
        member.memberName = name;
        member.memberGrade = MemberGrade.NORMAL;
        return member;
    }
}