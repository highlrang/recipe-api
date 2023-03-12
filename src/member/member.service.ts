import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MemberEntity } from './member.entity';
import { MemberRepository } from './member.repository';

@Injectable()
export class MemberService {

    constructor(
        @InjectRepository(MemberEntity) private memberRepository: Repository<MemberEntity>,
    ){}

    
    async saveMember(name: string) {
        const memberEntity = MemberEntity.create(name);
        this.memberRepository.save(memberEntity);
    }
}
