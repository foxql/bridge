async function listener(socket, host)
{
    const key = service.push(host)
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