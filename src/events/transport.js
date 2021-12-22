const { v4: uuidv4 } = require('uuid')

async function listener(socket, {livingTime, ...eventPackage})
{
    const {id, appName} = socket
    const poolingListenerName = uuidv4()
    service.io.to('signall-area').emit('transport', {
        package: eventPackage,
        bridgeBuyer: id,
        poolingListenerName: poolingListenerName,
        appName: appName
    })

    socket.on(poolingListenerName, (data)=> {
        console.log(data)
    })

    setTimeout(()=> {
        socket.off(poolingListenerName, (close)=> {
            console.log(close)
        })
    }, livingTime)


}

module.exports = {
    name: 'transport',
    listener: listener  
}