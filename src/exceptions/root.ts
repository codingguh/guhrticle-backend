//Message , Status code, error code
export class HTTPException extends Error{
    message!: string;
    errorCode:any;
    statusCode!: number;
    errors:ErrorCode;

    constructor(message:string,errorCode:ErrorCode,statusCode:number,error:any){
        super(message)
        this.message = message
        this.errorCode = errorCode
        this.statusCode =statusCode
        this.errors=error
    
    }
}

export enum ErrorCode{
    USER_NOT_FOUND= 404,
    USER_ALREADY_EXISTS= 402,
    INCORRECT_PASSWORD=403
}