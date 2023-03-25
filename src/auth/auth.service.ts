import { BadRequestException, Inject, Injectable, MisdirectedException, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import authConfig from 'src/config/authConfig';
import { UserLoginDto } from 'src/user/dto/user-login.dto';
import { UserResponseDto } from 'src/user/dto/user-response.dto';
import { UserRepository } from 'src/user/repository/user.repository';
import { AuthTokenDto } from './dto/auto.token.dto';
import * as bcrypt from 'bcrypt';
import { UserTokenRepository } from 'src/user/repository/user-token.repository';
import { UserRequestDto } from 'src/user/dto/user-request.dto';
import { DataSource } from 'typeorm';
import { UserService } from 'src/user/user.service';
import * as uuid from 'uuid';
import { UserRole } from 'src/user/enum/user-role.enum';
import { EmailService } from 'src/email/email.service';
import { UserEntity } from 'src/user/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { OAuthService } from './oauth.service';
import { OAuthProvider } from 'src/common/enum/oauth-provider.enum';
import { KakaoOAuthService } from './kakao-oauth.service';

@Injectable()
export class AuthService {

    private jwtSecret: string;
    private jwtRefreshSecret: string;

    constructor(
        @Inject(authConfig.KEY) private config: ConfigType<typeof authConfig>,
        
        private readonly kakaoOAuthService: KakaoOAuthService,
        private readonly userService: UserService,
        private dataSource: DataSource,
    ){ 
        this.jwtSecret = config.jwtSecret;
        this.jwtRefreshSecret = config.jwtRefreshSecret;
    }

    async oAuthLogin(provider: string, code: string): Promise<AuthTokenDto>{

        let userInfo;
        if(provider === OAuthProvider.KAKAO){
            userInfo =  await this.kakaoOAuthService.authorize(code);   
    
        }

        const userId = userInfo.id;
        const userExist = await this.userService.existUserById(userId);
    
        let userEntity;

        if(!userExist){
            const userRequestDto = {
                userId,
                email: userInfo.kakao_account.email,
                userName: userInfo.kakao_account.name,
                password: '',
                userRole: UserRole.MEMBER, // 처음 로그인 요청에서 받기!!
            }

            userEntity = await this.joinUser(userRequestDto);

        }else{
            
            userEntity = await this.userService.findById(userId);
        }


        const userDto = new UserResponseDto(userEntity);
        
        return await this.login(userDto);
    
    }

    async login(userLoginDto: UserLoginDto): Promise<AuthTokenDto> {

        const userId = userLoginDto.userId;

        // token 발급
        const accessToken = jwt.sign({userId}, this.jwtSecret, {
            expiresIn: '1h',
            audience: '',
            issuer: ''
        });

        const refreshToken = jwt.sign({userId}, this.jwtRefreshSecret, {
            expiresIn: '1d',
            audience: '',
            issuer: ''
        });

        await this.userService.updateUserRefreshToken(userId, refreshToken);

        return {
            accessToken, 
            refreshToken,
        }
    }

    verify(jwtString: string){
        try{
            const payload = jwt.verify(jwtString, this.jwtSecret) as (jwt.JwtPayload | string) & UserResponseDto;

            const { userId, email, userName } = payload;

            return payload;

        }catch (e){
            throw new UnauthorizedException();
        }
    }


    async getRefreshInfo(user: UserResponseDto, refreshToken: string): Promise<AuthTokenDto>{

        const payload = jwt.verify(refreshToken, this.jwtSecret);

        // token

        return null;
    }

    async joinUser(userRequestDto: UserRequestDto): Promise<UserEntity>{

        let userEntity;
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect(); // how to mock test
        await queryRunner.startTransaction();

        try {
            // 사용자 저장
            userEntity = await this.userService.saveUser(userRequestDto);
        
            await queryRunner.commitTransaction();

        } catch (e) {
            console.log(e);
            await queryRunner.rollbackTransaction();

        } finally {
            await queryRunner.release();

        }

        return userEntity;
    }
}
