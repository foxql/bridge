const sha256 = require("crypto-js/sha256")
module.exports = class {

    constructor()
    {
        this.dapps = {}
        this.dappCount = 0
    }

    disconnect(hash)
    {
        const dapp = this.dapps[hash] || false
        if(!dapp) return false

        const {webNodeCount} = dapp

        if(webNodeCount - 1 <= 0){
            delete this.dapps[hash]
            this.dappCount--
            return true
        }
        
        this.dapps[hash].webNodeCount--


    }

    connect(hash, host, alias)
    {
        const hashedHost = sha256(host).toString()
        if(this.dapps[hash] == undefined){
            this.dapps[hash] = {
                webNodeCount: 0,
                origins: {},
                alias: alias
            }
            this.dappCount++
        }
        if(this.dapps[hash]['origins'][hashedHost] === undefined) {
            this.dapps[hash]['origins'][hashedHost] = {
                nodeCount: 1,
                host: host
            }
        }else{
            this.dapps[hash]['origins'][hashedHost].nodeCount +=1
        }
        this.dapps[hash].webNodeCount +=1
    }

    getAll()
    {
        return this.dapps
    }

}