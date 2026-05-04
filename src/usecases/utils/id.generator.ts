import { customAlphabet, nanoid } from "nanoid";


export const createId = ()=>{

    const nanoid = customAlphabet('1234567890',5)

    const id = nanoid()
    return id

}


