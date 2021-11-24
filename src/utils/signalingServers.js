const sha256 = require("crypto-js/sha256");
module.exports = class {

    constructor()
    {
        this.connections = {}
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
            create_time: new Date()
        }

        return key
    }

    remove(key)
    {
        return delete this.connections[key]
    }

    exists(key)
    {
        return this.connections[key] || false
    }



}