const {ApolloServer} = require('@apollo/server')
import {User} from './user'
async function createApolloGraphqlServer() {
    // create graphQl server
    const gqlServer = new ApolloServer({
        resolvers: {
            Query: {
                ...User.resolvers.queries
            },
            Mutation: {
                ...User.resolvers.mutations
            }
        },
        typeDefs: `
            ${User.typeDefs}
            type Query {
                ${User.queries}
            }
            type Mutation {
                ${User.mutations}
            }
            
        `,
    })

     // start gql server 
     await gqlServer.start()
     return gqlServer;

}

export default createApolloGraphqlServer;
