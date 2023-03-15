import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';
import authConfig from 'src/config/authConfig';
import { UserLoginDto } from 'src/user/dto/user-login.dto';
import { UserResponseDto } from 'src/user/dto/user-response.dto';


@Injectable()
export class AuthService {
    constructor(
        @Inject(authConfig.KEY) private config: ConfigType<typeof authConfig>,
    ){}

    login(loginRequestDto: UserLoginDto){
        const payload = { ...loginRequestDto };

        // response 담기

        return jwt.sign(payload, this.config.jwtSecret, {
            expiresIn: '1d',
            audience: '',
            issuer: ''
        });
    }

    verify(jwtString: string){
        try{
            const payload = jwt.verify(jwtString, this.config.jwtSecret) as (jwt.JwtPayload | string) & UserResponseDto;

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
}
