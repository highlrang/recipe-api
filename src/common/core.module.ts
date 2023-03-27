import { Module } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { HttpExceptionFilter } from "src/filter/http-exception.filter";

@Module({

    // imports: [LoggerModule],

    // providers에 Logger 추가 필요 ??
    providers: [
        {
            provide: APP_FILTER, 
            useClass: HttpExceptionFilter
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: ExceptionInterceptor ??
        }
    ]
})
export class CoreModule {}