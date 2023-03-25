import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { EmailModule } from 'src/email/email.module';
import { EmailService } from 'src/email/email.service';
import { UserTokenEntity } from 'src/user/entity/user-token.entity';
import { UserTokenRepository } from 'src/user/repository/user-token.repository';
import { UserRepository } from 'src/user/repository/user.repository';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { DataSource } from 'typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { KakaoOAuthService } from './kakao-oauth.service';
import { OAuthService } from './oauth.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
      // timeout: 5000,
      // maxRedirects: 5,
    }),
    UserModule],
  controllers: [AuthController],
  providers: [
    AuthService, KakaoOAuthService,
    
  ]
})
export class AuthModule {}
