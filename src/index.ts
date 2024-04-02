import express from 'express'
import { prismaClient } from './lib/db'
const {ApolloServer} = require('@apollo/server')
const {expressMiddleware} = require('@apollo/server/express4')
const bodyParser = require('body-parser')
const cors = require('cors')

async function startServer() {
    const app = express()
    const PORT = process.env.PORT || 8000

    app.use(express.json())
    app.use(bodyParser.json())
    app.use(cors())

    // create graphQl server
    const gqlServer = new ApolloServer({
        resolvers: {
            Query: {
                hello: () => "Hii from sk",
                say: (_: any, {name}: {name: string} ) => `hello ${name}, How r u?`
            },
            Mutation: {
                createUser: async (_: any,{firstName, lastName, email, password}: {
                    firstName: string;
                    lastName: string;
                    email: string;
                    password: string;
                }) => {
                    await prismaClient.user.create({
                        data: {
                            email,
                            firstName,
                            lastName,
                            password,
                            salt: 'random_salt'
                        }
                    })
                    return true;
                },
            }
        },
        typeDefs: `
            type Query {
                hello: String,
                say(name:String): String
            }
            type Mutation {
                createUser(firstName: String!, lastName: String!, email: String!, password: String!): Boolean,
            }
        `,
    })

    // start gql server 
    await gqlServer.start()

    app.use('/graphql', expressMiddleware(gqlServer));

    app.get('/', (req, res) => {
        res.json({message: "server is up and running"})
    })

    app.listen(PORT, () => console.log(`server is up and running on port : ${PORT}`))
}

startServer()
