const signallingServers = require('../../signallingServers')
const sha256 = require("crypto-js/sha256");
module.exports = class {

    constructor()
    {
        this.connections = {}
        this.connectionsLength = 0
        this.connectionKeysOneDimensionalArray = []
        this.lastReturnedSignallingServer = '_NONE_'

        this.start()
    }

    start()
    {
        signallingServers.forEach( host => {
            this.push(host)
        })
    }

    encrypt(data)
    {
        return sha256(data).toString()
    }

    changeOnlineStatus(host)
    {
        if(typeof host != 'string') return false
        const key = this.encrypt(host)
        if(this.exists(key)) return false

        this.connections[key].online = true 
        return key       
    }

    push(host)
    {
        if(typeof host != 'string') return false
        const key = this.encrypt(host)
        if(this.exists(key)) return false

        this.connections[key] = {
            host: host,
            create_time: new Date(),
            online: false
        }
        this.connectionsLength++
        this.connectionKeysOneDimensionalArray.push(key)
        return key
    }

    remove(key)
    {
        delete this.connections[key]
        this.connectionsLength--
    }

    exists(key)
    {
        return this.connections[key] || false
    }

    findAvailableServer()
    {
        const currentConnectionKeys = this.connectionKeysOneDimensionalArray
        if(currentConnectionKeys.length == 1) {
            return this.connections[currentConnectionKeys[0]]
        }

        const lastServerKey = this.lastReturnedSignallingServer

        const [targettingServerKey] = currentConnectionKeys.filter(key => {
            if(lastServerKey != key){
                return true
            }
        })
        const signallingServer = this.connections[targettingServerKey] || false

        if(signallingServer) {
            this.lastReturnedSignallingServer = targettingServerKey
            return signallingServer
        }

        return false
    }


}