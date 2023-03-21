import { UserRoleType } from "../enum/user-role.enum";

// TODO 회원가입 시 파라미터 검증
export class UserRequestDto{

    readonly email: string;
    readonly password: string;
    readonly userRole: UserRoleType;
}