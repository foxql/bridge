async function listener(socket, {protocol, port})
{
    const clientIpAddress = socket.conn.remoteAddress.split(':')[3]
    const nodeIpAddress = `${protocol}://${clientIpAddress}:${port}`
    const key = service.push(nodeIpAddress)
    if(typeof key !== 'string') {
        return false
    }
    socket.connectionKey = key
    socket.join('signall-area')
}

module.exports = {
    name: 'register',
    listener: listener
}