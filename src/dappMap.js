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

    connect(hash, host)
    {
        if(this.dapps[hash] == undefined){
            this.dapps[hash] = {
                host: host,
                webNodeCount: 0
            }
            this.dappCount++
        }

        this.dapps[hash].webNodeCount +=1
    }

    getAll()
    {
        return this.dapps
    }

}