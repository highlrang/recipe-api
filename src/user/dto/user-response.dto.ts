import { UserEntity } from "../entity/user.entity";

export class UserResponseDto{

    userId: string;
    email: string;
    userName: string;

    constructor(userEntity: UserEntity){
        this.userId = userEntity.userId;
        this.email = userEntity.email;
        this.userName = userEntity.userName;
    }
}