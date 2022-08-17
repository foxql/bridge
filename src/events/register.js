async function listener(socket, host)
{
    if(typeof host !== 'string') return false

    if(host.indexOf('localhost') > -1 || host.indexOf('127.0.0.1') > -1) return false

    const key = service.push(host)
    socket.connectionKey = key
    socket.join('signall-area')
}

module.exports = {
    name: 'register',
    listener: listener
}