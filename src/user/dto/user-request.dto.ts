import { UserRoleType } from "../enum/user-role.enum";

// TODO 회원가입 시 파라미터 검증
export class UserRequestDto{

    userId: string;
    email: string;
    userName: string;
    password: string;
    userRole: UserRoleType;
}