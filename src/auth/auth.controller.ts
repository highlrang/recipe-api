import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('/api/v1/auth')
export class AuthController {

    constructor(private readonly authService: AuthService){}

    // @Post("/refresh")
    // async refreshToken(@User user, @Body("refreshToken") refreshToken: string): Promise<AuthTokenDto>{
    //     return await this.authService.refreshToken();
    // }
}
