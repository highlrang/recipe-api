import { Inject, Injectable, Logger, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRole } from 'src/user/enum/user-role.enum';
import { UserService } from 'src/user/user.service';
import { DataSource, Repository } from 'typeorm';
import { MemberRequestDto } from './dto/member-request.dto';
import { MemberEntity } from './entity/member.entity';
import { MemberRepository } from './repository/member.repository';
import * as uuid from 'uuid';

@Injectable()
export class MemberService {

    private readonly logger = new Logger(MemberService.name);
    
    logging(){
        this.logger.error('error log');
    }

    // 로깅 인터셉터 - 라우트 전후
    // NestInterceptor 인터페이스 사용
    // @UsingInterceptors()

    constructor(
        // private readonly userService : UserService,
        // @Inject('MemberRepository') private readonly memberRepository: MemberRepository,
        // @InjectRepository(MemberRepository) private readonly memberRepository : MemberRepository,
        // private dataSource: DataSource,
    ){}

}
