const sha256 = require("crypto-js/sha256")
module.exports = class extends require('./utils/signalingServers'){

    constructor()
    {
        super()
        this.app = require('express')()
        this.io = null
        this.server = null
        this.events = require('./events')

        this.serverOptions = {
            port: process.env.PORT,
            host: '0.0.0.0'
        }
    }

    open()
    {
        const {port} = this.serverOptions
        this.server = require('http').createServer(this.app)
        this.io = require('socket.io')(this.server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"]
            }
        })

        this.server.listen(port, ()=> {
            console.log('Bridge server is running...', port)
        })
    }

    initSocketConnection()
    {
        this.io.on('connection', socket => {
            const {origin} = socket.request.headers;

            this.loadEvents(socket);

            if(origin === undefined) return false

            socket.appKey = sha256(
                origin.split('://')[1]
            ).toString();
        })
    }

    loadEvents(socket)
    {
        this.events.forEach(event => {   
            socket.on(event.name, data => {event.listener(socket, data)});
        });
    }
}