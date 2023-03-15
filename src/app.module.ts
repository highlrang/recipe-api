import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
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

@Module({
  
  imports: [

    ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: process.env.NODE_ENV === 'prod' ? 'src/resources/.env.prod' : 'src/resources/.env.local',
        load: [emailConfig]
        
    }),
    
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: 'recipedb',
      entities: [__dirname + "/**/*.entity{.ts,.js}"],
      synchronize: false
    }),
    
    UserModule,
    MemberModule,
    AuthModule,

  ],
  controllers: [AppController],
  providers: [AppService],

  
})


export class AppModule {}
