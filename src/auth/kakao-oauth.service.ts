import { HttpService } from "@nestjs/axios";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { AxiosResponse } from "axios";
import { catchError, firstValueFrom, lastValueFrom, map, Observable } from "rxjs";
import { ApiException } from "src/common/dto/ApiException";
import { OAuthProvider } from "src/common/enum/oauth-provider.enum";
import authConfig from "src/config/authConfig";
import { KakaoAuthDto } from "./dto/kakao-auth.dto";
import { OAuthService } from "./oauth.service";

@Injectable()
export class KakaoOAuthService implements OAuthService{

    private kakaoOAuthDomain: string;
    private kakaoOAuthKey: string;
    private kakaoOAuthRedirect: string;
    private kakaoApiDomain: string;

    constructor(
        @Inject(authConfig.KEY) private config: ConfigType<typeof authConfig>,
        private readonly httpService: HttpService,
    ){
        this.kakaoApiDomain = config.kakaoApiDomain;
        this.kakaoOAuthDomain = config.kakaoOAuthDomain;
        this.kakaoOAuthKey = config.kakaoOAuthKey;
        this.kakaoOAuthRedirect = config.kakaoOAuthRedirect;
    }

    async authorize(code:string){
        const accessToken = await this.getAuthorizationToken(code);

        const userInfo: KakaoAuthDto = await this.getUserInfo(accessToken);
        
        return userInfo;
    }

    async getUserInfo(accessToken: string): Promise<KakaoAuthDto>{

        const uri = this.kakaoApiDomain.concat("/user/me");


        const response = await this.httpService.axiosRef.get(uri, 
            {
            
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                params: {
                    property_keys: ["kakao_account.email"]
                }
            }
        );

        return response.data;
    }

    async getAuthorizationToken(code: string) : Promise<any>{ 

        const uri = this.kakaoOAuthDomain.concat("/oauth/token");

        const client_id = this.kakaoOAuthKey;
        const redirect_uri = this.kakaoOAuthRedirect;
        const grant_type = "authorization_code";
        
        const param = {
            grant_type,
            client_id,
            redirect_uri,
            code: code,
        }

        const response = await this.httpService.axiosRef.post(uri, param, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            }
        });

        const { access_token: accessToken } = response.data;

        return accessToken;
    }


    
}