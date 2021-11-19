require('dotenv').config()

const server = require('./src/server')
const service = new server()

service.open()
service.initSocketConnection()