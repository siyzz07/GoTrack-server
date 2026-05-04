
export interface IHashService {

    convertToHash (password:string):Promise<string>
    comparePassword (hashedPassword:string, password:string) :Promise<boolean>

}