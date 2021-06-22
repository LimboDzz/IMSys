const express = require('express')
// Parse incoming request bodies in a middleware before your handlers
const bodyParser = require('body-parser')
// CORS(Cross - Origin Resource Sharing) middleware
const cors = require('cors')
// HTTP request logger middleware for node.js
const morgan = require('morgan')

const app = express();
app.use(morgan('combined'))
    .use(bodyParser.json())
    .use(cors())


    .get('/status', (req, res) => {
        res.send({
            message: 'helloworld'
        })
    })

    .listen(process.env.PORT || 8081)