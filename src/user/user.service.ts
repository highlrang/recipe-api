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
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {

    constructor(
        private readonly emailService: EmailService,
        private readonly userRepository: UserRepository,
    ){}

    getUser(userId: bigint) : UserResponseDto{
        return null;
    }

    public async saveUser(dto: UserRequestDto, signupVerifyToken: string) : Promise<UserEntity> {
        const user = new UserEntity();
        user.email = dto.email;
        user.password = dto.password;
        user.verificationToken = signupVerifyToken;
        user.roleType = UserRole.MEMBER;
        user.tokenExpirationDate = new Date(new Date().getTime() + 500000);
        return await this.userRepository.save(user);
    }

    async checkUserExists(email: string, roleType: UserRoleType) : Promise<boolean>{
        const user = await this.userRepository.findOne({
            where: { email: email, roleType: roleType }
        });
        return user !== null;

    }
}

