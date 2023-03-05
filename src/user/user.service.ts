import { Injectable } from '@nestjs/common';
import { sign } from 'crypto';
import { UserRequestDto } from './dto/user-request.dto';
import { UserResponseDto } from './dto/user-response.dto';
import * as uuid from 'uuid';
import { EmailService } from 'src/email/email.service';

@Injectable() //
export class UserService {

    constructor(private readonly emailService: EmailService){}

    getUser(userId: bigint) : UserResponseDto{
        return null;
    }

    async joinUser(userRequestDto: UserRequestDto) {
        
        // 회원 존재 확인
        await this.checkUserExists(userRequestDto.email);

        const signupVerifyToken = uuid.v1();
        // 회원 저장
        

        // 회원 이메일 검증
        await this.sendUserJoinEmail(userRequestDto.email, signupVerifyToken); 
        // 현 메서드가 async라 await 쓰는 것인가
        
    }

    private saveUser(){

    }

    private checkUserExists(email: string){ // async할 필요 없는가에 대하여

    }

    private async sendUserJoinEmail(email: string, signupVerifyToken: string){
        await this.emailService.sendUserJoinVerification(email, signupVerifyToken);
    }
}
