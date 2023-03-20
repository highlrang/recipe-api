import { Body, Controller, Get, Head, Headers, Param, Post, Query, Req } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { ApiResponse } from 'src/common/dto/ApiResponse';
import { MemberRequestDto } from 'src/member/dto/member-request.dto';
import { MemberService } from 'src/member/member.service';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRequestDto } from './dto/user-request.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UserService } from './user.service';

@Controller('/api/v1/user') // routing
export class UserController { // export

    constructor(
        private readonly userService: UserService,
        private readonly authService: AuthService,
    ){}
    
    @Get()
    async getUserList() : Promise<Array<UserResponseDto>>{
        return null;
    }

    @Get("/:id") // routing
    async getUser(@Headers() headers: any, @Param() userId: bigint): Promise<UserResponseDto> { // 어노테이션 변수: 타입
        
        const jwt = headers.authorization.split('Bearer ')[1]; // AOP 방식 살펴보기
        this.authService.verify(jwt);

        return this.userService.getUser(userId);
    }

    @Post("/email-verify")
    async verifyEmail(@Query() signupVerifyToken : string) : Promise<string> {
        this.authService.certified(signupVerifyToken);
        return `email-verify로 넘어왔습니다 signupVerifyToken = ${signupVerifyToken}`;
    }

    @Post("/login")
    async login(@Body() userLoginDto: UserLoginDto): Promise<ApiResponse> {
        const userDto = this.authService.login(userLoginDto);
        return ApiResponse.success(userDto);
    }

    

}
