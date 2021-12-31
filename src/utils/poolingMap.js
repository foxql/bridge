class poolingMap{
    constructor()
    {
        this.listeners = {}
        this.livingCount = 0
        this.destroyedCount = 0
        this.lastPoolingTime = '_NOT_FOUND_'
    }

    generate(ownerId, temporaryListener)
    {
        const key = service.io.engine.generateId()
        this.listeners[key] = {
            owner: ownerId,
            temporaryListener: temporaryListener
        }
        this.livingCount += 1
        this.lastPoolingTime = new Date()
        return key
    }

    destroy(key)
    {
        delete this.listeners[key]
        this.livingCount -= 1
        this.destroyedCount += 1
    }

    get(key)
    {
        return this.listeners[key] || false
    }

    find(key)
    {
        return this.listeners[key] ? true : false
    }
}

transportResultPool = new poolingMap()