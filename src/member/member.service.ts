import { Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from 'src/user/enum/user-role.enum';
import { UserService } from 'src/user/user.service';
import { DataSource, Repository } from 'typeorm';
import { MemberRequestDto } from './dto/member-request.dto';
import { MemberEntity } from './member.entity';
import { MemberRepository } from './member.repository';
import * as uuid from 'uuid';

@Injectable()
export class MemberService {

    constructor(
        private readonly userService : UserService,
        @Inject('MemberRepository') private readonly memberRepository: MemberRepository,
        // @InjectRepository(MemberRepository) private readonly memberRepository : MemberRepository,
        private dataSource: DataSource,
    ){}

    async joinMember(memberRequestDto: MemberRequestDto) {
        
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect(); // hot to mock test
        await queryRunner.startTransaction();

        try {
            // 회원 존재 확인
            const userExist = await this.userService.checkUserExists(memberRequestDto.email, UserRole.MEMBER);
            if(userExist){
                throw new UnprocessableEntityException('해당 이메일로는 가입할 수 없습니다');
            }

            const signupVerifyToken = uuid.v1();
            // 사용자 저장
            const savedUser = await this.userService.saveUser(memberRequestDto, signupVerifyToken);
            // 회원 저장
            await this.saveMember(savedUser.userId, memberRequestDto.name);


            // 회원 이메일 검증
            await this.userService.sendUserJoinEmail(memberRequestDto.email, signupVerifyToken); 

            await queryRunner.commitTransaction();

        } catch (e) {
            console.log(e);
            // await queryRunner.rollbackTransaction();

        } finally {
            await queryRunner.release();

        }

    }

    async saveMember(userId: number, name: string) {
        const memberEntity = MemberEntity.create(userId, name);
        this.memberRepository.save(memberEntity); // save2도 되는지 확인
    }
}
