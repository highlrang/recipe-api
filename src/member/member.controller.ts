import { Body, Controller, Post } from '@nestjs/common';
import { MemberRequestDto } from './dto/member-request.dto';
import { MemberService } from './member.service';

@Controller('/api/v1/member')
export class MemberController {

    constructor(
        private readonly memberService: MemberService
    ){}

    @Post()
    async joinMember(@Body() memberRequestDto: MemberRequestDto): Promise<void> {
        return this.memberService.joinMember(memberRequestDto);
        // TODO memberService에 있어야할 거 같기도
    }
}
