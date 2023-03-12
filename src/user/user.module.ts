import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from 'src/email/email.service';
import { MemberModule } from 'src/member/member.module';
import { MemberService } from 'src/member/member.service';
import { UserEntity } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        MemberModule
    ],
    controllers: [UserController],
    providers: [UserService, EmailService],
})
export class UserModule {

}
