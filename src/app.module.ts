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
import emailConfig from './config/emailConfig';

@Module({
  
  imports: [

    ConfigModule.forRoot({
        isGlobal: true,
        envFilePath: '.env.local', // process.env.NODE_ENV === 'prod' ? './resources/.local.env' : '.env.local',
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

  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, EmailService],

  
})


export class AppModule {}
