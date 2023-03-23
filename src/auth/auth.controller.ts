import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse } from 'src/common/dto/ApiResponse';
import { UserRequestDto } from 'src/user/dto/user-request.dto';
import { AuthService } from './auth.service';

@Controller('/api/v1/auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    @Post("/join")
    async join(@Body() userRequestDto: UserRequestDto): Promise<ApiResponse>{
        return await ApiResponse.success(this.authService.joinUser(userRequestDto));
    }

    // @Post("/refresh")
    // async refreshToken(@User user, @Body("refreshToken") refreshToken: string): Promise<AuthTokenDto>{
    //     return await this.authService.refreshToken();
    // }
}
