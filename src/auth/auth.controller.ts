import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ApiResponse } from 'src/common/dto/ApiResponse';
import { UserRequestDto } from 'src/user/dto/user-request.dto';
import { AuthService } from './auth.service';

@Controller('/api/v1/auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Get("/code/:provider")
    async oAuthAuthorize(@Param("provider") provider: string, @Query("code") code: string){
        // token 발급 요청
        const result = await this.authService.oAuthLogin(provider, code);

        return ApiResponse.success(result);
    }

    @Post("/join")
    async join(@Body() userRequestDto: UserRequestDto): Promise<ApiResponse>{
        return await ApiResponse.success(this.authService.joinUser(userRequestDto));
    }

    // @Post("/refresh")
    // async refreshToken(@User user, @Body("refreshToken") refreshToken: string): Promise<AuthTokenDto>{
    //     return await this.authService.refreshToken();
    // }
}
