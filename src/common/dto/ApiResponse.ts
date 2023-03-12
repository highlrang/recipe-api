import { HttpStatus } from "@nestjs/common";

export class ApiResponse{
    status: number;
    message: string;
    data?: any;

    constructor(status: number, message: string, data?: any){
        this.status = status;
        this.message = message;
        this.data = data;
    }

    static success(data? : any) : ApiResponse{
        return new ApiResponse(HttpStatus.OK, "success", data);
    }

    static fail(status: HttpStatus) : ApiResponse{
        return new ApiResponse(status, "fail");
    }
}