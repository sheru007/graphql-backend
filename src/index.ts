import express from 'express'
const {expressMiddleware} = require('@apollo/server/express4')
const bodyParser = require('body-parser')
const cors = require('cors')
import createApolloGraphqlServer from './graphql'

async function startServer() {
    const app = express()
    const PORT = process.env.PORT || 8000

    app.use(express.json())
    app.use(bodyParser.json())
    app.use(cors())

    app.use('/graphql', expressMiddleware(await createApolloGraphqlServer()));

    app.get('/', (req, res) => {
        res.json({message: "server is up and running"})
    })

    app.listen(PORT, () => console.log(`server is up and running on port : ${PORT}`))
}

startServer()
