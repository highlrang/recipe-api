import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { ApiResponse } from 'src/common/dto/ApiResponse';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRequestDto } from './dto/user-request.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { UserService } from './user.service';

@Controller('/api/v1/user') // routing
export class UserController { // export

    constructor(private readonly userService: UserService){} // 생성자 
    
    @Get()
    async getUserList() : Promise<Array<UserResponseDto>>{
        return null;
    }

    @Get("/:id") // routing
    async getUser(@Param() userId: bigint): Promise<UserResponseDto> { // 어노테이션 변수: 타입
        return this.userService.getUser(userId);
    }

    @Post()
    async join(@Body() userRequestDto: UserRequestDto): Promise<void> {
        return this.userService.joinMember(userRequestDto);
    }

    @Post("/email-verify")
    async verifyEmail(@Query() signupVerifyToken : string) : Promise<string> {
        this.userService.certified(signupVerifyToken);
        return `email-verify로 넘어왔습니다 signupVerifyToke = ${signupVerifyToken}`;
    }

    @Post("/login")
    async login(@Body() userLoginDto: UserLoginDto): Promise<ApiResponse> {
        const userDto = this.userService.login(userLoginDto);
        return ApiResponse.success(userDto);
    }

    

}
