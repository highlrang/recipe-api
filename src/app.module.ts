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

@Module({
  
  imports: [

    ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: `src/resources/.env.${process.env.NODE_ENV}`,
        load: [emailConfig, authConfig]
        
    }),
    
    TypeOrmModule.forRoot({ ...ormconfig }),

    // TypeOrmModule.forRoot({
    //   name: "prodDB",
    //   type: "mysql",
    //   host: process.env.DB_HOST,
    //   port: parseInt(process.env.DB_PORT),
    //   username: process.env.DB_USER,
    //   password: process.env.DB_PASSWORD,
    //   database: 'recipedb',
    //   entities: [__dirname + "/**/*.entity{.ts,.js}"],
    //   synchronize: false
    // }),

    // TypeOrmModule.forRoot({
    //   name: "localDB",
    //   type: "sqlite",
    //   database: 'recipedb',
    //   autoLoadEntities: true,
    //   synchronize: true,
    //   logging: true,
    //   dropSchema: true
    // }),
    
    UserModule,
    MemberModule,
    AuthModule,

  ],
  controllers: [AppController],
  providers: [AppService],

  
})

export class AppModule {}
