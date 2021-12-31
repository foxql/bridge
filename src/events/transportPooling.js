async function listener(socket, {bridgePoolingListener, nodeId})
{
    const targetPool = transportResultPool.get(bridgePoolingListener)
    if(!targetPool) return false // pool not found or destroyed

    const {owner, temporaryListener} = targetPool

    service.io.to(owner).emit(temporaryListener, nodeId)

    // todo send result...
}

module.exports = {
    name: 'transport-pooling',
    listener: listener
}