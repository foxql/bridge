require('dotenv').config()

const server = require('./src/server')
service = new server() // global instance

service.open()
service.initSocketConnection()

require('./src/utils/poolingMap') // Bridge Pooling Listener Map Global Instance 