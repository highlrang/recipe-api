import { Module } from '@nestjs/common';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from 'src/email/email.service';
import { MemberModule } from 'src/member/member.module';
import { MemberService } from 'src/member/member.service';
import { UserEntity } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserRepository } from './repository/user.repository';
import { UserService } from './user.service';
import { DataSource } from 'typeorm';
import { UserTokenEntity } from './entity/user-token.entity';
import { UserTokenRepository } from './repository/user-token.repository';
import { AuthModule } from 'src/auth/auth.module';
import { CustomRepositoryModule } from 'src/common/repository/custom-repository.module';

@Module({
    imports: [
        CustomRepositoryModule.forRepository([UserRepository, UserTokenRepository])
    ],
    controllers: [UserController],
    providers: [
        UserService, 
        EmailService, 
    ],
    exports: [UserService],
})
export class UserModule {

}
