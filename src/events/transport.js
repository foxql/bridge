function livingTimeControl(time)
{
    if(typeof time !== 'number') return false

    if(time > 2000) return false // 2 second

    return true
}

async function listener(socket, {livingTime, temporaryListener, powQuestion, ...eventPackage})
{
    if(!livingTimeControl(livingTime)) return false
    const {id, appKey} = socket
    const bridgePoolingListenerName = transportResultPool.generate(id, temporaryListener)
    service.io.to('signall-area').emit('transport', {
        eventPackage: eventPackage,
        bridgeBuyer: id,
        bridgePoolingListener: bridgePoolingListenerName,
        appKey: appKey,
        powQuestion: powQuestion
    })
    setTimeout(()=> {
        transportResultPool.destroy(bridgePoolingListenerName)
    }, livingTime)


}

module.exports = {
    name: 'transport',
    listener: listener  
}