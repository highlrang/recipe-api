import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from 'src/email/email.service';
import { MemberService } from 'src/member/member.service';
import { MemberEntity } from './member.entity';
import { MemberRepository } from './member.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([MemberEntity]),
    ],
    controllers: [],
    providers: [MemberService],
    exports: [MemberService]
})
export class MemberModule {

}
