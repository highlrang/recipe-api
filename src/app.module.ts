import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { EmailService } from './email/email.service';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';
import { AuthModule } from './auth/auth.module';
import { MemberService } from './member/member.service';
import emailConfig from './config/emailConfig';
import { MemberModule } from './member/member.module';
import authConfig from './config/authConfig';
import * as ormconfig from 'ormconfig';
import { CoreModule } from './common/core.module';

@Module({
  
  imports: [

    ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: `src/resources/.env.${process.env.NODE_ENV}`,
        load: [emailConfig, authConfig]
        
    }),
    
    TypeOrmModule.forRoot({ ...ormconfig }),
    
    CoreModule,
    UserModule,
    MemberModule,
    AuthModule,

  ],
  controllers: [AppController],
  providers: [AppService],

  
})

export class AppModule {}
