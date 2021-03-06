async function listener(socket, {bridgePoolingListener, nodeAddress, powQuestionAnswer})
{
    const targetPool = transportResultPool.get(bridgePoolingListener)
    if(!targetPool) return false // pool not found or destroyed

    const {owner, temporaryListener} = targetPool
    service.io.to(owner).emit(temporaryListener, {
        nodeAddress,
        powQuestionAnswer
    })
}

module.exports = {
    name: 'transport-pooling',
    listener: listener
}