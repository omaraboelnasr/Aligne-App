

export class HttpError extends Error{
    statusCode:number
    errCode:string
    constructor(params:{message:string,statusCode:number,errCode:string}){
        const {message,statusCode,errCode} = params
        super(message);
        this.statusCode = statusCode;
        this.errCode = errCode;
    }
}

export class NotFoundError extends HttpError{
    constructor(entity:string,id:string){
        super({message:`${entity} with id ${id} not found`,statusCode:404,errCode:`${entity.toUpperCase()}.NOT_FOUND`});
    }
}

export class NotAuthorized extends HttpError{
    constructor(entity:string,action:string){
        super({message:`You are not authorized to ${action} the ${entity}`,statusCode:401,errCode:`${entity.toUpperCase()}.NOT_AUTHORIZED`});
    }
}

export class NotFoundDataError extends HttpError{
    constructor(entity:string){
        super({message:`${entity} data not found`,statusCode:404,errCode:`${entity.toUpperCase()}.NOT_FOUND`});
    }
}
