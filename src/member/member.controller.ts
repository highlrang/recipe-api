import { Body, Controller, Post } from '@nestjs/common';
import { MemberRequestDto } from './dto/member-request.dto';
import { MemberService } from './member.service';

@Controller('/api/v1/member')
export class MemberController {

    constructor(
        private readonly memberService: MemberService
    ){}

}
