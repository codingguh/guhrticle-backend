import { Request,Response } from "express"
import { prismaClient } from "../src";
import {hashSync} from "bcrypt";

export const signup = async (req:Request,res:Response) =>{
    const {email,password,name} = req.body;

    let user = await prismaClient.user.findFirst({where:{email}})
    if(user){
        throw Error('User already exists')
    }
    user = await prismaClient.user.create({
        data:{
            name,
            email,
            password:hashSync(password,10)
        }
    })
    res.json(user)
}

export const login = (req:Request,res:Response) =>{
    res.send('login works')
}