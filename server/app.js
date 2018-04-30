const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

//allow cross-origin requests
app.use(cors())

// connect to mlab data base
mongoose.connect('mongodb://silvestrevivo:silvestrevivo@ds163119.mlab.com:63119/myfirstgraphql')
mongoose.connection.once('open', () => {
  console.log('connected to the data base')
})

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    graphiql: true
  })
)

app.listen(4000, () => {
  console.log('listening for request on port 4000')
})
