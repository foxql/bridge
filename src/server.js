const sha256 = require("crypto-js/sha256")
const dappMap = require('./dappMap')
module.exports = class extends require('./utils/signalingServers'){

    constructor()
    {
        super()
        this.app = require('express')()
        this.io = null
        this.server = null
        this.events = require('./events')
        this.dapps = new dappMap()
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

            socket.on('upgrade-dapp', ()=>{
                socket.appKey = sha256(
                    origin.split('://')[1]
                ).toString();
                this.dapps.connect(socket.appKey, origin)
            })

            socket.on('upgrade-explorer-connection', ()=> {
                socket.join('explorer-connections')
            })

            socket.on('registered-signall-node-count', ()=> {
                const signallNodes = this.io.sockets.adapter.rooms.get('signall-area') || false
                if(!signallNodes) return false

                this.io.to('explorer-connections').emit('registered-signall-node-count', signallNodes.size)
            })

            socket.on('disconnect', ()=>{
                if(socket.appKey){
                    this.dapps.disconnect(socket.appKey)
                }
            })

            socket.on('active-dapps-stats', ()=>{
                this.io.to('explorer-connections').emit('active-dapps-stats', this.dapps.getAll())
            })
        })
    }

    loadEvents(socket)
    {
        this.events.forEach(event => {   
            socket.on(event.name, data => {event.listener(socket, data)});
        });
    }
}