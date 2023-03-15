import { UserRequestDto } from "src/user/dto/user-request.dto";

export class MemberRequestDto extends UserRequestDto{
    readonly name: string;
}