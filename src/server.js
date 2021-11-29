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
        this.io = require('socket.io')(this.server)

        this.server.listen(port, ()=> {
            console.log('Bridge server is running...', port)
        })
    }

    initSocketConnection()
    {
        this.io.on('connection', socket => {
            const {id} = socket
            this.loadEvents(socket);
        })
    }

    loadEvents(socket)
    {
        this.events.forEach(event => {   
            socket.on(event.name, data => {event.listener(socket, data)});
        });
    }
}