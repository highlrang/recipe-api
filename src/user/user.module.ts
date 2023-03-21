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

@Module({
    imports: [
        TypeOrmModule.forFeature([UserRepository, UserTokenRepository]),
    ],
    controllers: [UserController],
    providers: [
        UserService, 
        EmailService, 
        {
            provide: 'UserRepository',
            useFactory: (dataSource: DataSource) => {
                return dataSource.getRepository(UserEntity);
            },
            inject: [getDataSourceToken()],
        },
        {
            provide: 'UserTokenRepository',
            useFactory: (dataSource: DataSource) => {
                return dataSource.getRepository(UserTokenEntity);
            },
            inject: [getDataSourceToken()],
        }
    ],
    exports: [UserService],
})
export class UserModule {

}
