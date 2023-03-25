import { BadRequestException, Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
import { sign } from 'crypto';
import { UserRequestDto } from './dto/user-request.dto';
import { UserResponseDto } from './dto/user-response.dto';
import * as uuid from 'uuid';
import { EmailService } from 'src/email/email.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { DataSource, Repository } from 'typeorm';
import * as bcrypt from "bcrypt";
import { ApiResponse } from 'src/common/dto/ApiResponse';
import { UserLoginDto } from './dto/user-login.dto';
import { MemberService } from 'src/member/member.service';
import { UserRole, UserRoleType } from './enum/user-role.enum';
import { UserRepository } from './repository/user.repository';
import { UserUpdateDto } from './dto/user-update.dto';
import { UserTokenRepository } from './repository/user-token.repository';

@Injectable()
export class UserService {

    constructor(
        private readonly emailService: EmailService,
        private readonly userRepository: UserRepository,
        private readonly userTokenRepository: UserTokenRepository,
        private dataSource: DataSource,
    ){}

    async findAll(){
        const userList = await this.userRepository.find();
        return userList.map(user => new UserResponseDto(user));
    }

    async existUserById(userId: string): Promise<boolean>{
        const userEntity = await this.userRepository.findOneBy({
            userId: userId
        });

        return userEntity != null;

    }

    async findById(userId: string) : Promise<UserResponseDto>{
        const userEntity = await this.userRepository.findOneBy({
            userId: userId
        });
    
        return new UserResponseDto(userEntity);
    }

    public async findByEmail(email: string){
        return await this.userRepository.findOneBy({
            email: email
        });
    }

    public async saveUser(dto: UserRequestDto) : Promise<UserEntity> {
        const user = new UserEntity();
        
        user.userId = dto.userId;
        user.email = dto.email;
        user.userName = dto.userName;
        user.password = dto.password;
        user.roleType = UserRole.MEMBER;
        return await this.userRepository.save(user);
    }

    async checkUserExists(email: string, roleType: UserRoleType) : Promise<boolean>{
        const user = await this.userRepository.findOne({
            where: { email: email, roleType: roleType }
        });
        return user !== null;

    }

    async updateUser(userUpdateDto: UserUpdateDto){
        await this.userRepository.updateUser(userUpdateDto);
    }

    async updateUserRefreshToken(userId: string, refreshToken: string){

        const userTokenEntity = {
            userId, 
            refreshToken,
        }

        await this.userTokenRepository.upsert(userTokenEntity, ['userId']);

    }
}

