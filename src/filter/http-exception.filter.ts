import { ArgumentsHost, Catch, ExceptionFilter, HttpException, InternalServerErrorException, Logger } from "@nestjs/common";
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {

    constructor(private logger: Logger){}

    catch(exception: any, host: ArgumentsHost) {
        
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const req = ctx.getRequest<Request>();

        // HttpException만 다룸
        if(!(exception instanceof HttpException))
            exception = new InternalServerErrorException();
        
        const response = (exception as HttpException).getResponse();

        const errLog = {
            timestamp: new Date(),
            url: req.url,
            response,
            stack: exception.stack,
        }
        this.logger.error(errLog);

        res
            .status((exception as HttpException).getStatus())
            .json(res);
    }

    
}