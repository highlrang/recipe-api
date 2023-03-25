import { HttpService } from "@nestjs/axios";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { AxiosResponse } from "axios";
import { catchError, firstValueFrom, lastValueFrom, map, Observable } from "rxjs";
import { ApiException } from "src/common/dto/ApiException";
import { OAuthProvider } from "src/common/enum/oauth-provider.enum";
import authConfig from "src/config/authConfig";

export interface OAuthService{

    authorize(code:string);

    getAuthorizationToken(code: string);
    
    getUserInfo(accessToken: string);

}