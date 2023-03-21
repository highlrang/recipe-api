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

@Module({
  imports: [EmailModule, UserModule],
  controllers: [AuthController],
  providers: [
    AuthService
  ]
})
export class AuthModule {}
