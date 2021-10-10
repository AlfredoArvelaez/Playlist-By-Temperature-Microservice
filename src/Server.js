const express = require('express')
const cors = require('cors')

const controllers = require('./controllers')

class Server {
  constructor() {
    this.app = express()
    this.middlewares()
    this.routes()
  }


  middlewares() {
    this.app.use(cors())
  }

  routes() {
    this.app.get('/', controllers.getMusic)
  }

  listen() {
    this.app.listen(process.env.PORT, () => console.log('listening at port ' + process.env.PORT))
  }
}

module.exports = Server