require('dotenv').config()
const Server = require('./Server')

const webServer = new Server()
webServer.listen()

