import { Inject, Injectable, UnprocessableEntityException } from '@nestjs/common';
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

    constructor(
        // private readonly userService : UserService,
        // @Inject('MemberRepository') private readonly memberRepository: MemberRepository,
        // @InjectRepository(MemberRepository) private readonly memberRepository : MemberRepository,
        // private dataSource: DataSource,
    ){}

}
