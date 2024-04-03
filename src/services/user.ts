import { prismaClient } from "../lib/db";
import {createHmac, randomBytes} from 'node:crypto'
import JWT from 'jsonwebtoken';

const JWT_SECRET = '$superm@n@123'
export interface CreateUserPayload {
    firstName: string,
    lastName?: string,
    email: string,
    password: string

}

export interface getUserTokenPayload {
    email: string,
    password: string

}



class UserService {
    private static generateHash(salt: string, password: string) {
        return createHmac('sha256', salt).update(password).digest('hex')
    }

    public static createUser(payload: CreateUserPayload){
        const {firstName, lastName, email, password} = payload;
        const salt = randomBytes(32).toString('hex')
        const hashedPassword = UserService.generateHash(salt, password)

        return prismaClient.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashedPassword,
                salt
            }
        })
    }

    private static getUserByEmail(email: string) {
        return prismaClient.user.findUnique({where: {email}})
    }
    public static async getUserToken(payload: getUserTokenPayload) {
        const {email, password} = payload;
        const user = await UserService.getUserByEmail(email)
        if(!user) throw new Error('user not found')

        const userSalt = user.salt;
        const currentHashedPassword = UserService.generateHash(userSalt, password)

        if(user.password !== currentHashedPassword) throw new Error('incorrect Password')

        // generate token 
        const token = JWT.sign({id: user.id, email: user.email}, JWT_SECRET)
        return token;
    }
}

export default UserService;