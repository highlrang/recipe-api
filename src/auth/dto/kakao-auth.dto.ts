import { AuthDto } from "./auth.dto";

export class KakaoAuthDto extends AuthDto{

    kakao_account: {
        profile: {
            nickname: string;
        },
        name: string,
        email: string,
    }
}