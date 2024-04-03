import express from 'express'
const {expressMiddleware} = require('@apollo/server/express4')
const bodyParser = require('body-parser')
const cors = require('cors')
import createApolloGraphqlServer from './graphql'
import UserService from './services/user'

async function startServer() {
    const app = express()
    const PORT = process.env.PORT || 8000

    app.use(express.json())
    app.use(bodyParser.json())
    app.use(cors())

    app.use('/graphql', expressMiddleware(await createApolloGraphqlServer(), {
        context: async ({req}:{req: any}) => {
            const authHeader = req.headers['authorization']
            const token = authHeader.split(' ')[1]
            // console.log({authHeader: req.headers, token})
            try {
                const user = UserService.decodeJWTToken(token)
                return {user}
            } catch (error) {
                return {}
            }
        }
    }));

    app.get('/', (req, res) => {
        res.json({message: "server is up and running"})
    })

    app.listen(PORT, () => console.log(`server is up and running on port : ${PORT}`))
}

startServer()
