import { Module } from '@nestjs/common';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from 'src/email/email.service';
import { MemberService } from 'src/member/member.service';
import { UserService } from 'src/user/user.service';
import { MemberEntity } from './member.entity';
import { MemberRepository, MemberRepositoryFactory } from './member.repository';
import { MemberController } from './member.controller';
import { UserModule } from 'src/user/user.module';

@Module({
    imports: [
        // TypeOrmModule.forFeature([MemberRepository]),
        UserModule,
    ],
    controllers: [MemberController],
    providers: [
        MemberService, 
        {
            provide: 'MemberRepository',
            useFactory: MemberRepositoryFactory,
            inject: [getDataSourceToken()],
        }
    ],
    // exports: [MemberService]
})
export class MemberModule {

}
