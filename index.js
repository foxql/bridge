require('dotenv').config()

const server = require('./src/server')
service = new server() // global instance

service.open()
service.initSocketConnection()