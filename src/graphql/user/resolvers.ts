import { prismaClient } from '../../lib/db'
import UserService, { CreateUserPayload, getUserTokenPayload } from '../../services/user';

const queries = {
    getUserToken: async (_:any, payload: getUserTokenPayload) => {
        const token = UserService.getUserToken(payload)
        return token;
    },
    getCurrentLoggedInUser: async (_:any, parameters:any, context: any ) => {
        // console.log({context})
        if(context && context.user) {
            const id = context.user.id
            const user = await UserService.getUserByID(id)
            return user
        }
    }
}
const mutations = {
    createUser: async (_: any,payload: CreateUserPayload) => {
        const user = await UserService.createUser(payload)
        return user.id;
    },
}


export const resolvers = {queries, mutations}