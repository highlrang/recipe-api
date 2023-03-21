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

@Injectable()
export class AuthService {

    private jwtSecret: string;
    private jwtRefreshSecret: string;

    constructor(
        @Inject(authConfig.KEY) private config: ConfigType<typeof authConfig>,
        
        private readonly emailService: EmailService,
        private readonly userService: UserService,
        private dataSource: DataSource,
    ){ 
        this.jwtSecret = config.jwtSecret;
        this.jwtRefreshSecret = config.jwtRefreshSecret;
    }

    async login(userLoginDto: UserLoginDto): Promise<AuthTokenDto> {
        
        // 로그인
        const user = await this.userService.findByEmail(userLoginDto.email);

        if(user == null) throw new BadRequestException();

        const matchPw = await bcrypt.compare(userLoginDto.password, user.password);
        if(!matchPw) throw new BadRequestException();

        // token 발급
        const payload = { userId: user.userId, email: user.email };

        const accessToken = jwt.sign(payload, this.jwtSecret, {
            expiresIn: '1h',
            audience: '',
            issuer: ''
        });

        const refreshToken = jwt.sign(payload, this.jwtRefreshSecret, {
            expiresIn: '1d',
            audience: '',
            issuer: ''
        });

        this.userService.updateUserRefreshToken(user.userId, refreshToken);

        return {
            accessToken, 
            refreshToken,
        }
    }

    verify(jwtString: string){
        try{
            const payload = jwt.verify(jwtString, this.jwtSecret) as (jwt.JwtPayload | string) & UserResponseDto;

            const { userId, email, name } = payload;

            return {
                userId: userId,
                email: email,
                name: name
            }

            // return payload;

        }catch (e){
            throw new UnauthorizedException();
        }
    }

    verifyRefreshToken(){}

    async getRefreshInfo(user: UserResponseDto, refreshToken: string): Promise<AuthTokenDto>{

        const payload = jwt.verify(refreshToken, this.jwtSecret);

        // token

        return null;
    }

    async joinUser(userRequestDto: UserRequestDto){
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect(); // hot to mock test
        await queryRunner.startTransaction();

        try {
            // 회원 존재 확인
            const userExist = await this.userService.checkUserExists(userRequestDto.email, userRequestDto.userRole);
            if(userExist){
                throw new UnprocessableEntityException('해당 이메일로는 가입할 수 없습니다');
            }

            const signupVerifyToken = uuid.v1();
            // 사용자 저장
            const savedUser = await this.userService.saveUser(userRequestDto, signupVerifyToken);
        

            // 회원 이메일 검증
            await this.emailService.sendUserJoinVerification(userRequestDto.email, signupVerifyToken); 

            await queryRunner.commitTransaction();

        } catch (e) {
            console.log(e);
            // await queryRunner.rollbackTransaction();

        } finally {
            await queryRunner.release();

        }
    }

    async certified(signupVerifyToken: string){
        
        const userEntity = await this.userService.findByVerificationToken(signupVerifyToken);

        // 인증 토큰 만료 여부 체크
        if(userEntity.tokenExpirationDate < new Date())
            throw new BadRequestException();

        this.userService.updateUser({
            userId: userEntity.userId,
            certifiedYn: true,
        });


    }
}
