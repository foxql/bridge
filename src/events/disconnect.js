async function listener(socket)
{
    const {connectionKey} = socket

    if(connectionKey !== undefined) {
        service.remove(connectionKey || '')
    }

    
}

module.exports = {
    name: 'disconnect',
    listener: listener
}