import { Logger, Module } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { HttpExceptionFilter } from "src/filter/http-exception.filter";
import { LoggingInterceptor } from "src/interceptor/logging.interceptor";

@Module({

    // imports: [LoggerModule],
    
    providers: [
        Logger,
        {
            provide: APP_FILTER, 
            useClass: HttpExceptionFilter
        },
        {
            provide: APP_INTERCEPTOR,
            useClass: LoggingInterceptor
        }
    ]
})
export class CoreModule {}