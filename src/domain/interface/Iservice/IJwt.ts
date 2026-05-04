


export interface IJwtService{
    createAccessJWT:(data:{id:string,role:string},)=>Promise<string>
    createRefreshJWT:(data:{id:string,role:string},)=>Promise<string>
    verifyJWT:(token:string,secretKey:string)=>Promise<any>
}