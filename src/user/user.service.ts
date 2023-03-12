import { BadRequestException, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { sign } from 'crypto';
import { UserRequestDto } from './dto/user-request.dto';
import { UserResponseDto } from './dto/user-response.dto';
import * as uuid from 'uuid';
import { EmailService } from 'src/email/email.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import { ApiResponse } from 'src/common/dto/ApiResponse';
import { UserLoginDto } from './dto/user-login.dto';
import { MemberService } from 'src/member/member.service';
import { UserRole, UserRoleType } from './enum/user-role.enum';

@Injectable() //
export class UserService {

    constructor(
        private readonly emailService: EmailService,
        private readonly memberService: MemberService,
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>, //
    ){}

    getUser(userId: bigint) : UserResponseDto{
        return null;
    }

    async login(userLoginDto: UserLoginDto) {
        
        const userEntity = await this.userRepository.findOne({
            where : {email: userLoginDto.email}
        })

        const checkPassword = await bcrypt.compare(userLoginDto.password, userEntity.password);
        if(!checkPassword) throw new BadRequestException;


    }
    

    // 어드민 회원가입은 별도로
    async joinMember(userRequestDto: UserRequestDto) {
        
        // 회원 존재 확인
        const userExist = await this.checkUserExists(userRequestDto.email, UserRole.MEMBER);
        
        if(userExist){
            throw new UnprocessableEntityException('해당 이메일로는 가입할 수 없습니다'); // exception
        }

        const signupVerifyToken = uuid.v1();
        // 사용자 저장
        await this.saveUser(userRequestDto, signupVerifyToken);
        // 회원 저장
        await this.memberService.saveMember(userRequestDto.name);


        // 회원 이메일 검증
        await this.sendUserJoinEmail(userRequestDto.email, signupVerifyToken); 

    }

    async certified(signupVerifyToken: string){
        
        const userEntity = await this.userRepository.findOne({
            where: {"verificationToken" : signupVerifyToken}
        });

        // 인증 토큰 만료 여부 체크
        if(userEntity.tokenExpirationDate < new Date())
            throw new BadRequestException();

        this.userRepository.update(userEntity.userId, {
            certifiedYn : true
        });


    }

    private async saveUser(dto: UserRequestDto, signupVerifyToken: string){
        const user = new UserEntity();
        user.name = dto.name;
        user.email = dto.email;
        user.password = dto.password;
        user.verificationToken = signupVerifyToken;
        user.roleType = UserRole.MEMBER; //
        
        user.tokenExpirationDate = new Date(new Date().getTime() + 500000);
        await this.userRepository.save(user);
    }

    private async checkUserExists(email: string, role: string) : Promise<boolean>{
        const user = await this.userRepository.findOne({
            where: { email: email }
        });
        
        return user !== null;

    }

    private async sendUserJoinEmail(email: string, signupVerifyToken: string){
        await this.emailService.sendUserJoinVerification(email, signupVerifyToken);
    }
}

