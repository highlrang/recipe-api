import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from 'src/email/email.service';
import { MemberModule } from 'src/member/member.module';
import { MemberService } from 'src/member/member.service';
import { UserEntity } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
    ],
    controllers: [UserController],
    providers: [UserService, EmailService, UserRepository],
    exports: [UserService],
})
export class UserModule {

}
