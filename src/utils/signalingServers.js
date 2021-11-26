const sha256 = require("crypto-js/sha256");
module.exports = class {

    constructor()
    {
        this.connections = {}
        this.connectionsLength = 0
    }

    encrypt(data)
    {
        return sha256(data).toString()
    }

    push(host)
    {
        const key = this.encrypt(host)
        if(this.exists(key)) return false

        this.connections[key] = {
            host: host,
            create_time: new Date(),
            connection_count: 0
        }
        this.connectionsLength++
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
        return this.connections
    }


}