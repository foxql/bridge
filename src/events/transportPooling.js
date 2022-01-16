async function listener(socket, {bridgePoolingListener, nodeAddress, candidateSignature})
{
    const targetPool = transportResultPool.get(bridgePoolingListener)
    if(!targetPool) return false // pool not found or destroyed

    const {owner, temporaryListener} = targetPool
    service.io.to(owner).emit(temporaryListener, {
        nodeAddress,
        candidateSignature
    })

    // todo send result...
}

module.exports = {
    name: 'transport-pooling',
    listener: listener
}