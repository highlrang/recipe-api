import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class LoggingInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
        
        console.log('Before...');

        const now = Date.now();

        return next.handle()
                    .pipe(
                        tap(() => console.log(`After... ${Date.now() - now}ms`))
                        // map(data => return {data}) 등 가공도 가능
                        // catchError() 도 가능하지만 exception filter에서 다루는 것이 일관적
                    )
    }
}